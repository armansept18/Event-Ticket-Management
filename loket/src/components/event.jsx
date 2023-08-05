import { Box, useDisclosure } from "@chakra-ui/react";
import { Grid, GridItem, Center, StarIcon } from "@chakra-ui/react";
import { wrap } from "framer-motion";

export const EventCard = ({ event }) => {
  return (
    <>
      <Box
        maxW="286px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={"0 2px 4px rgba(0, 0, 0, 0.2)"}
        fontFamily={"BasierCircle, sans-serif"}
      >
        <img src={event.imageUrl} />
        <Box p="6">
          <Box
            display="flex"
            alignItems="left"
            flexDirection={"column"}
            gap={"10px"}
          >
            <Box
              mt="1"
              fontSize={"16px"}
              fontWeight="400"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {event.eventName}
            </Box>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              alignItems={"left"}
              textTransform="uppercase"
              ml="2"
            >
              {event.date}
            </Box>
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              Rp {Number(event.price)?.toLocaleString("id-ID")}
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};
// };

export const EventList = ({ events = [], fetchEvents }) => {
  return (
    <Grid className="sm:grid-cols-3 gap-6">
      {events?.map((event, idx) => (
        <GridItem key={idx}>
          <a style={{ cursor: "pointer" }}>
            <EventCard event={event} fetchEvent={fetchEvents} />
          </a>
        </GridItem>
      ))}
    </Grid>
  );
};
