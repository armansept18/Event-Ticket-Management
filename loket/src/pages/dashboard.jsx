import React from "react";
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
} from "@chakra-ui/react";
import UserProfile from "../components/userprofile";
import { UserEvents } from "../components/userevents";

export const Dashboard = () => {
  const userId = 1;

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
                <UserProfile userId={userId} />
              </TabPanel>
              <TabPanel>
                <UserEvents userId={userId} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};
