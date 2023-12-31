import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  updateUserProfile,
  handleOpenModal,
}) => {
  const userSelector = useSelector((state) => state.auth);

  const userDataFromLocalStorage = JSON.parse(localStorage.getItem("auth"));

  const referralCodeUsage = userDataFromLocalStorage?.referralCodeUsage || 0;

  const [updatedEventDetails, setUpdateEventDetails] = useState(eventDetails);

  const [userCredit, setUserCredit] = useState(
    userDataFromLocalStorage?.credit
  );
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const handleIncreaseTicket = () => {
    setTicketQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseTicket = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleBuyTickets = async () => {
    const isReferralCodeValid =
      userDataFromLocalStorage.referralCodeFromFriend && referralCodeUsage < 1;
    const price = userDataFromLocalStorage?.referralCodeFromFriend;
    if (isReferralCodeValid) {
      // Apply the discount
      price = (90 / 100) * eventDetails.price; // Apply a 10% discount
    }

    const totalPrice = price * ticketQuantity;

    if (
      userDataFromLocalStorage.credit >= totalPrice &&
      eventDetails.stock >= ticketQuantity
    ) {
      try {
        const updatedUserProfile = {
          ...userDataFromLocalStorage,
          credit: userDataFromLocalStorage.credit - totalPrice,
        };

        const updatedEventDetails = {
          ...eventDetails,
          stock: eventDetails.stock - ticketQuantity,
        };
        const newParticipant = {
          id: userSelector.id,
          name: userSelector.name,
        };

        updatedEventDetails.participants.push(newParticipant);

        updateUserProfile(updatedUserProfile);
        console.log("updatedEventDetails", updatedEventDetails);
        await api.patch(`/users/${updatedUserProfile.id}`, {
          credit: updatedUserProfile.credit,
        });
        await api.put(`/events/${eventDetails.id}`, updatedEventDetails);
        localStorage.setItem("auth", JSON.stringify(updatedUserProfile));
        setUpdateEventDetails(updatedEventDetails);
        setUserCredit(updatedUserProfile.credit);
        handleOpenModal();
        onClose();
        alert("Sukses Membeli Tiket");
      } catch (error) {
        alert("Error purchasing tickets:", error);
      }
    } else {
      alert("credit anda tidak cukup top up dlu boss");
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
                  Price:
                </Text>{" "}
                Rp {eventDetails?.price.toLocaleString("id-ID")}
              </Box>
              {userDataFromLocalStorage?.referralCodeFromFriend && (
                <Box>
                  <Text fontWeight="bold" display="inline">
                    Price:
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
