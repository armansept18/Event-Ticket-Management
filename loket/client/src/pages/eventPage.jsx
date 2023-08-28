import { useState, useEffect } from "react";
import { api } from "../api/axios";
import { EventList } from "../components/event";
import { Center } from "@chakra-ui/react";
import LoadingPage from "../components/loading";


export const EventListPage = ({ search }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events", {
        params: { eventName_like: search },
        params2: { location_like: search },
      });
      setEvents([...res.data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [search]);

  return (
    <>
    <h1 style={{fontWeight:"700", fontSize:"30px", textAlign:"center"}}>Event Pilihan</h1>
      {loading ? (
        <LoadingPage />
      ) : (
        <Center alignItems={"flex-start"} marginTop={"35px"}>
          <EventList events={[...events]} fetchEvents={fetchEvents} />
        </Center>
      )}
    </>
  );
};
