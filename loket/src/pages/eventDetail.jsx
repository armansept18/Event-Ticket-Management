import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/loading";
import { api } from "../api/axios";
import { Navbar } from "../components/navbar";

export const EventDetail = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
  return (
    <>
      <Navbar />
      <div className="justify-center">
        <p>Category: {eventDetails.category}</p>
        <div className="flex justify-center gap-10 flex-wrap">
          <img
            src={eventDetails.imageUrl}
            alt={eventDetails.eventName}
            style={{
              borderRadius: "20px",
              maxWidth: "800px",
              height: "376px",
            }}
          />
          <div
            className="flex flex-col justify-center items-start"
            style={{ border: "1px solid #e5e5e5", borderRadius: "20px" }}
          >
            <span style={{ fontSize: "22px", marginBottom: "25px" }}>
              {eventDetails.eventName}
            </span>
            <div
              className="flex flex-col justify-center gap-5"
              style={{ fontSize: "16px" }}
            >
              <span>
                <img src="#" alt="" />
                <p>{eventDetails.date}</p>
              </span>
              <span>
                <img src="#" alt="" />
                <p>{eventDetails.time}</p>
              </span>
              <span>
                <img src="#" alt="" />
                <p>{eventDetails.location}</p>
              </span>
              <span className=" font-semibold">
                Price: Rp {Number(eventDetails.price).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center" style={{marginTop:"60px", gap:"50px"}}>
          <p style={{ maxWidth: "720px" }}>{eventDetails.description}</p>
          <button
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "20px",
              width: "312px",
              height:"48px",
              backgroundColor: "#0049CC",
              color:"white",
            }}
            onClick={"beliTiket"}
          >
            Beli Tiket
          </button>
        </div>
      </div>
    </>
  );
};
