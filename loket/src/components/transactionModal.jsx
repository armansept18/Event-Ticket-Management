import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Image,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";
import { api } from "../api/axios";

export const TransactionModal = ({
  isOpen,
  onClose,
  eventDetails,
  userProfile,
  updateUserProfile,
  handleOpenModal,
}) => {
  const userDataFromLocalStorage = JSON.parse(localStorage.getItem("auth"));
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const handleIncreaseTicket = () => {
    setTicketQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseTicket = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const selectedTicketCategory =
    eventDetails &&
    eventDetails["ticket-category"] &&
    eventDetails["ticket-category"].length > 0
      ? eventDetails["ticket-category"][0]
      : null;

  const handleBuyTickets = async () => {
    const price = userDataFromLocalStorage?.referralCodeFromFriend
      ? eventDetails?.price - (10 / 100) * eventDetails?.price
      : eventDetails?.price;
    console.log("price", price);
    const totalPrice = price * ticketQuantity;
    console.log("userDataFromLocalStorage", userDataFromLocalStorage);
    console.log("totalPrice", totalPrice);
    console.log("eventDetails", eventDetails);
    console.log(
      "userDataFromLocalStorage.credit >= totalPrice",
      Number(userDataFromLocalStorage.credit) >= totalPrice
    );
    console.log(
      "eventDetails.stock >= ticketQuantity",
      eventDetails.stock >= ticketQuantity
    );

    if (
      Number(userDataFromLocalStorage.credit) >= totalPrice &&
      eventDetails.stock >= ticketQuantity
    ) {
      try {
        const updatedUserProfile = {
          ...userDataFromLocalStorage,
          credit: Number(userDataFromLocalStorage.credit) - totalPrice,
        };

        const updatedEventDetails = {
          ...eventDetails,
          stock: eventDetails.stock - ticketQuantity,
        };

        updateUserProfile(updatedUserProfile);
        console.log("updatedEventDetails", updatedEventDetails);

        await api.put(`/events/${eventDetails.id}`, updatedEventDetails);
        handleOpenModal();
        onClose();
      } catch (error) {
        alert("Error purchasing tickets:", error);
      }
    } else {
      alert("Insufficient credit or stock");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">
          {eventDetails?.eventName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" alignItems="center">
            <Image
              boxSize="100%"
              objectFit="contain"
              src={eventDetails?.imageUrl}
              alt={eventDetails?.eventName}
            />
            <Text fontWeight={600} color="gray.500" mt={4}>
              {eventDetails?.category}
            </Text>
            <Stack mt={4} spacing={2}>
              <Box
                className={`${
                  userDataFromLocalStorage?.referralCodeFromFriend
                    ? "line-through"
                    : ""
                }`}
              >
                <Text fontWeight="bold" display="inline">
                  Presale:
                </Text>{" "}
                Rp {eventDetails?.price.toLocaleString("id-ID")}
              </Box>
              {userDataFromLocalStorage?.referralCodeFromFriend && (
                <Box>
                  <Text fontWeight="bold" display="inline">
                    Presale:
                  </Text>{" "}
                  Rp{" "}
                  {(
                    eventDetails?.price -
                    (10 / 100) * eventDetails?.price
                  ).toLocaleString("id-ID")}
                </Box>
              )}
              <Box>
                <Text fontWeight="bold" display="inline">
                  Stock:
                </Text>{" "}
                {eventDetails?.stock}
              </Box>
            </Stack>
            <Flex mt={4}>
              <Button onClick={handleDecreaseTicket}>-</Button>
              <Text mx={4}>{ticketQuantity}</Text>
              <Button onClick={handleIncreaseTicket}>+</Button>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Tutup
          </Button>
          <Button colorScheme="blue" onClick={handleBuyTickets}>
            Beli
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
