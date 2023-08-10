import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/loading";
import { api } from "../api/axios";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { TransactionModal } from "../components/transactionModal";

export const EventDetail = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        setEventDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return <LoadingPage />;
  }
  if (!eventDetails) {
    return <div>Event not found</div>;
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "1440px" }}
        height={{ sm: "476px", md: "45rem" }}
        direction={{ base: "column", md: "row" }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="gray.200">
          <Image
            objectFit="contain"
            boxSize="100%"
            src={eventDetails.imageUrl}
            alt={eventDetails.eventName}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"BasierCircle"}>
            {eventDetails.eventName}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {eventDetails.category}
          </Text>
          <Text textAlign={"justify"} color={("gray.700", "gray.400")} px={3}>
            {eventDetails.description}
          </Text>
          <Text className=" font-medium">
            Price: Rp {Number(eventDetails.price).toLocaleString("id-ID")}
          </Text>
          <Stack
            align={"center"}
            justify={"center"}
            direction={"column"}
            mt={6}
          >
            <Badge
              px={2}
              py={1}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              {eventDetails.date}
            </Badge>
            <Badge
              px={2}
              py={1}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              {eventDetails.time}
            </Badge>
            <Badge
              px={2}
              py={1}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              {eventDetails.location}
            </Badge>
          </Stack>

          <Stack
            width={"50%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "#0049CC",
              }}
              onClick={handleOpenModal}
            >
              Beli Tiket
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventDetails={eventDetails}
      />
    </Center>
  );
};
