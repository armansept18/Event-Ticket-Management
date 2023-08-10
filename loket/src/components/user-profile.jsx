import { Box, Text } from "@chakra-ui/react";

export const UserProfile = ({ user }) => {

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontWeight="bold">User Profile</Text>
      <Text>Name : {user.name}</Text>
      <Text>Email : {user.email}</Text>
      {user.credit !== undefined && (
        <Text>Credit: Rp {user.credit.toLocaleString("id-ID")}</Text>
      )}
      <Text>Referral Code : {user.referralCode} </Text>
    </Box>
  );
};
