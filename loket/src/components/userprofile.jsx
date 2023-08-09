import React, { useEffect, useState } from "react";
import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import { api } from "../api/axios"; // Make sure to adjust the import path
import LoadingPage from "./loading";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/", {
          params: {
            email: userData.email,
            password: userData.password,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <LoadingPage/>;
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Flex align="center">
        <Avatar size="lg" name={userData.name} src={userData.avatarUrl} />
        <Box ml={3}>
          <Text fontWeight="bold">{userData.name}</Text>
          <Text>{userData.email}</Text>
        </Box>
      </Flex>
      <Text mt={3}>Credit: Rp {userData.credit.toLocaleString("id-ID")}</Text>
    </Box>
  );
};

export default UserProfile;
