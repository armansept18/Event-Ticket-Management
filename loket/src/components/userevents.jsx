import React from "react";
import { Button } from "@chakra-ui/react";

export const UserEvents = ({ events, fetchEvents, onDelete, onEdit }) => {
  const handleDelete = async (id) => {
    await onDelete(id);
    fetchEvents();
  };

  const handleEdit = async (id) => {
    await onEdit(id);
    fetchEvents();
  };
  return (
    <div>
      <h2>Your Events</h2>
      {events.map((event) => (
        <div key={event.id}>
          <p>{event.eventName}</p>
          <p>{event.date}</p>
          <p>{event.location}</p>

          {/* Edit and Delete buttons */}
          <Button onClick={() => handleEdit(event.id)}>Edit</Button>
          <Button onClick={() => handleDelete(event.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};
