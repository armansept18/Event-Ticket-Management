import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../api/axios";
import jwt_decode from "jwt-decode";

export const UserProfile = () => {
  const userProfile = useSelector((state) => state.auth);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [user, setUser] = useState([]);
  const [events, setEvents] = useState([]);
  const fetchUser = () => {
    api
      .get(`/users/:id${userProfile.id}`, userProfile.id)
      .then((res) => {
        setUser(res.data);
        fetchUserEvent(res.data.id);
      })
      .catch((err) => console.log(err));
  };
  const fetchUserEvent = () => {
    api
      .get(`/events/user/${userProfile.id}`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  };
  const localStorageData = localStorage.getItem("auth");

  const token = localStorageData?.auth;
  console.log(token);

  const decodedToken = token ? jwt_decode(token) : null;

  const userId = decodedToken?.user_id;

  const [user, setUser] = useState({});

  const fetchUser = () => {
    if (userId) {
      api
        .get(`/users/:id${userId}`)
        .then((res) => {
          setUser(res.data);
          console.log(res.data, "res.data");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  // const handleTopUp = async () => {
  //   if (topUpAmount) {
  //     const amount = parseInt(topUpAmount);
  //     if (!isNaN(amount) && amount > 0) {
  //       const updatedUserProfile = {
  //         ...userProfileString,
  //         credit: userProfileString.credit + amount,
  //       };

  //       localStorage.setItem("auth", JSON.stringify(updatedUserProfile));

  //       setTopUpAmount(updatedUserProfile);
  //     }
  //   }
  // };

  return (
    <>
      <Box p={4} borderWidth="1px" borderRadius="md">
        <Text fontWeight="bold">User Profile</Text>
        <Text>Name: {user.fullname}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Referral Code: {user.referralCode}</Text>
        {user.credit !== null && <Text>Credit: Rp {user.credit}</Text>}
      </Box>
      {/* <Box marginTop={"20px"} p={4} borderWidth="1px" borderRadius="md">
        <Text fontWeight="bold">Top Up Credit</Text>
        <Input
          placeholder="top up dlu tod"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(e.target.value)}
          type="number"
        />
        <Button colorScheme="blue" mt={2} onClick={handleTopUp}>
          Top Up
        </Button> */}
      {/* </Box> */}
    </>
  );
};
