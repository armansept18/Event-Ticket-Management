import React from "react";
import { useSelector } from "react-redux";

export const YourTickets = ({ tickets, profileId }) => {
  const userSelector = useSelector((state) => state.auth);

  // Filter tiket yang dibeli oleh pengguna dengan profileId tertentu
  const purchasedTickets = tickets.filter((ticket) =>
    ticket.participants.includes(profileId)
  );
  console.log("Tickets in YourTickets:", tickets);
  console.log("profileId", profileId);
  return (
    <div>
      <h2>Your Tickets</h2>
      {purchasedTickets.map((ticket, index) => (
        <div key={index} className="py-2">
          <div className="flex justify-between">
            <div>
              <p>{ticket?.eventName}</p>
              <p>{ticket?.date}</p>
              <p>{ticket?.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
