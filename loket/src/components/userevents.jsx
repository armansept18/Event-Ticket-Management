import React, { useEffect, useState } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import { api } from "../api/axios"; // Adjust the import path

export const UserEvents = ({ userId }) => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await api.get(`/events?userId=${userId}`);
        setUserEvents(response.data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [userId]);

  if (userEvents.length === 0) {
    return <div>No events created yet.</div>;
  }

  return (
    <Stack spacing={4}>
      {userEvents.map((event) => (
        <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">{event.eventName}</Text>
          <Text>{event.date}</Text>
        </Box>
      ))}
    </Stack>
  );
};
