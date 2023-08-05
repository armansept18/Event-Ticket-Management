import { useState, useEffect } from "react";
import { api } from "../api/axios";
import { EventList } from "../components/event";
import { Center } from "@chakra-ui/react";

export const EventListPage = ({ search }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events", {
        params: { eventName_like: search },
        params2: { location_like: search },
      });
      setEvents([...res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [search]);

  return (
    <>
      <Center alignItems={"flex-start"} marginTop={"35px"}>
        <EventList events={[...events]} fetchEvents={fetchEvents} />
      </Center>
    </>
  );
};
