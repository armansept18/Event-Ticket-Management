import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

export const UserProfile = () => {
  const userProfile = useSelector((state) => state.auth);
  const [topUpAmount, setTopUpAmount] = useState("");

  const handleTopUp = async () => {
    if (topUpAmount) {
      const amount = parseInt(topUpAmount);
      if (!isNaN(amount) && amount > 0) {
        const updatedUserProfile = {
          ...userProfile,
          credit: userProfile.credit + amount,
        };

        localStorage.setItem("auth", JSON.stringify(updatedUserProfile));

        setTopUpAmount(updatedUserProfile);
      }
    }
  };

  return (
    <>
      <Box p={4} borderWidth="1px" borderRadius="md">
        <Text fontWeight="bold">User Profile</Text>
        <Text>Name: {userProfile.fullname}</Text>
        <Text>Email: {userProfile.email}</Text>
        <Text>Referral Code: {userProfile.referralCode}</Text>
        {userProfile.credit !== null && (
          <Text>Credit: Rp {userProfile.credit.toLocaleString("id-ID")}</Text>
        )}
      </Box>
      <Box marginTop={"20px"} p={4} borderWidth="1px" borderRadius="md">
        <Text fontWeight="bold">Top Up Credit</Text>
        <Input
          placeholder="top up dlu tod"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(e.target.value)}
          type="number"
        />
        <Button colorScheme="blue" mt={2} onClick={handleTopUp}>
          Top Up
        </Button>
      </Box>
    </>
  );
};
