import React, { useEffect, useState, useCallback } from "react";
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
import { EditModal } from "../components/editModal";
import { UserProfile } from "../components/user-profile";

export const Dashboard = () => {
  const [user, setUser] = useState({});
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
    isOpen: isOpenEdit,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [data, setData] = useState({});
  const nav = useNavigate();

  const fetchEvents = useCallback(async () => {
    if (userSelector && userSelector.id) {
      try {
        const res = await api.get(`/events`);
        setEvents(res.data);
        // setEvents(res.data.filter(item => item.createdBy === userSelector.id));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  }, [userSelector]);

console.log("userSelector.id :>> ", userSelector.id);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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
      console.log("res onEdit data :>> ", res.data);
      setData({ ...res.data });
      setTimeout(() => {
        onOpenEdit();
      }, 200);
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
                  profileId={userSelector.id}
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
      <BasicModal
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        fetchEvents={fetchEvents}
      />
      <EditModal
        onClose={onCloseEdit}
        onOpen={onOpenEdit}
        fetchEvents={fetchEvents}
        isOpen={isOpenEdit}
        editData={data}
      />
    </Container>
  );
};
