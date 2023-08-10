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
  Badge,
  Flex,
  Image,
  Text,
  useColorModeValue,
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
    const totalPrice = selectedTicketCategory?.presale * ticketQuantity;

    if (
      userProfile.credit >= totalPrice &&
      selectedTicketCategory.stock >= ticketQuantity
    ) {
      try {
      const updatedUserProfile = {
        ...userProfile,
        credit: userProfile.credit - totalPrice,
      };

      const updatedEventDetails = {
        ...eventDetails,
        "ticket-category": eventDetails["ticket-category"].map((category) => {
          if (category.presale === selectedTicketCategory.presale) {
            return {
              ...category,
              stock: category.stock - ticketQuantity,
            };
          }
          return category;
        }),
      };

      updateUserProfile(updatedUserProfile);

      await api.put(`/events${eventDetails.id}`, updatedEventDetails);
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
              <Box>
                <Text fontWeight="bold" display="inline">
                  Presale:
                </Text>{" "}
                Rp {selectedTicketCategory?.presale.toLocaleString("id-ID")}
              </Box>
              <Box>
                <Text fontWeight="bold" display="inline">
                  Stock:
                </Text>{" "}
                {selectedTicketCategory?.stock}
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
