"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/reducers/types";

const Register = ({ users = [], setUsers }) => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    referralCode: "",
    referralCodeFromFriend: "",
    credit: 0,
  });

  const InputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  // Fungsi untuk mengenerate referral code
  const generateReferralCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 6;
    let referralCode = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }

    setUser({ ...user, referralCode });
  };

  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  useEffect(() => {
    if (userSelector.id) nav("/login");
  }, []);

  const register = async (e) => {
    e.preventDefault();

    const auth = await api.get("/users", {
      params: {
        fullname: "",
        email: "",
        password: "",
        referralCode: "",
        credit: 0,
      },
    });

    const check = await api.get("/users", {
      params: {
        email: user.email,
        password: user.password,
        referralCode: user.referralCode,
        credit: user.credit,
      },
    });

    const checkReferralCode = await api.get(
      `/users?q=${user.referralCodeFromFriend}`
    );

    if (check.data.length) return alert("email sudah terdaftar");
    if (checkReferralCode.data.length === 0)
      return alert("referral code salah");

    if (user.password) {
      const tmp = { ...user };
      delete tmp.confirmPassword;

      await api.post("/users", tmp);
      nav("/login");
    } else {
      alert("password dan confirm password tidak sesuai");
    }
    dispatch({
      type: types.logout,
      payload: { ...auth.data },
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up to your account</Heading>
        </Stack>
        <form onSubmit={register}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="fullname">
                <FormLabel>Fullname</FormLabel>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={user.fullname}
                  onChange={(e) => InputHandler("fullname", e.target.value)}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => InputHandler("email", e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => InputHandler("password", e.target.value)}
                />
              </FormControl>
              <FormControl id="referralCodeFromFriend">
                <FormLabel>Referral Code</FormLabel>
                <Input
                  type="text"
                  placeholder="Referral Code"
                  value={user.referralCodeFromFriend}
                  onChange={(e) =>
                    InputHandler("referralCodeFromFriend", e.target.value)
                  }
                />
              </FormControl>

              <Stack spacing={10}>
                <Button
                  onClick={generateReferralCode}
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Daftar
                </Button>
                <center>
                  <p style={{ fontSize: "15px" }}>
                    Sudah punya Akun ?
                    <span style={{ paddingLeft: "5px", color: "blue" }}>
                      <a href="/login">
                        <b>Masuk</b>
                      </a>
                    </span>
                  </p>
                </center>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};
export default Register;