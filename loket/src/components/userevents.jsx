import React from "react";
import { Button } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserEvents = ({
  events,
  fetchEvents,
  onDelete,
  onEdit,
  profileId,
}) => {
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

      {events
        .filter((i) => i.createdBy === profileId)
        .map((event, index) => (
          <div key={event.id} className="py-2">
            <div className="flex">
              <div>
                <p>{event?.eventName}</p>
                <p>{event?.date}</p>
                <p>{event?.location}</p>
                <p>{`Participant: ${event?.participants?.length}/${event?.stock}`}</p>
              </div>
              <div className="w-32">
                <Pie
                  data={{
                    datasets: [
                      {
                        label: "# pax",
                        data: [event?.participants?.length, event?.stock],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            </div>
            {/* Edit and Delete buttons */}
            <Button onClick={() => handleEdit(event.id)}>Edit</Button>
            <Button onClick={() => handleDelete(event.id)}>Delete</Button>
          </div>
        ))}
    </div>
  );
};
