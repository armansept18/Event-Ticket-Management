"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export const SimpleCard = ({ users = [] }) => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const InputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };
  const login = async () => {
    const auth = await api.get("/users", {
      params: {
        email: user.email,
        password: user.password,
      },
    });

    if (!auth.data) return alert("email/password salah");

    delete auth.data[0].password;

    localStorage.setItem("auth", JSON.stringify(auth.data[0]));
    alert("hello");
    nav("/dashboard");
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
          <Heading fontSize={"4xl"}>Masuk ke akunmu </Heading>
          {/* <P>
            Tidak punya akun loket ? <span>Daftar</span>
          </P> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                required
                onChange={(e) => InputHandler("email", e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                required
                onChange={(e) => InputHandler("password", e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={login}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Masuk
              </Button>
              <center>
                <p style={{ fontSize: "15px" }}>
                  Belum punya Akun ?
                  <span style={{ paddingLeft: "5px", color: "blue" }}>
                    <a href="/register">
                      <b>Daftar</b>
                    </a>
                  </span>
                </p>
              </center>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
