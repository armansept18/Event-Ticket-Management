import React, { useState } from "react";
import {
  Box,
  Flex,
  Container,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
// import UserProfile from "../components/userprofile";
import { UserEvents } from "../components/userevents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../api/axios";
import defaultImage from "../assets/loket.png";
import { BasicModal } from "../components/modal";
import { UserProfile } from "../components/user-profile";

export const Dashboard = () => {
  const [user, setUser] = useState({});
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [data, setData] = useState({});
  const nav = useNavigate();

  const fetchEvents = async () => {
    if (userSelector.id) {
      try {
        const res = await api.get("/events", {
          params: {
            userid: userSelector.id,
          },
        });
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  };

const del = async (id) => {
  const msg = "Are You Sure Want To Delete Event?";
  if (window.confirm(msg)) {
    try {
      await api.delete(`events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
};

const update = async (id) => {
  try {
    const res = await api.get(`/events/${id}`);
    setData({
      ...res.data,
    });
  } catch (error) {
    console.error("Error fetching event for update:", error);
  }
};



  return (
    <Container maxW="3xl" py={8}>
      <Flex>
        <Divider orientation="vertical" />
        <Box flex="1" p={8}>
          <Tabs>
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Events</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserProfile user={userSelector} />
              </TabPanel>
              <TabPanel>
                <UserEvents
                  events={events}
                  fetchEvents={fetchEvents}
                  onDelete={del}
                  onEdit={update}
                />
                <Button onClick={onOpen}>Create Event</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity></Collapse>
      <BasicModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
    </Container>
  );
};
