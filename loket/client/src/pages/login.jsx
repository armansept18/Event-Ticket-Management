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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { api } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/reducers/types";
import { userLogin } from "../redux/middleware/user-middleware";

export const SimpleCard = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await dispatch(userLogin(values));
        if (result === types.succes) {
          nav("/home");
        }
      } catch (error) {
        console.error("error dkit:", error.message);
        toast({
          title: "Login Gagal",
          description: error.message, // cek error
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });
  // const InputHandler = (key, value) => {
  //   setUser({ ...user, [key]: value });
  // };

  // const userSelector = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (userSelector.id) nav("/home");
  // }, []);

  // const login = async () => {
  //   const auth = await api.get(`/users/v2`, {
  //     params: {
  //       ...user,
  //     },
  //   });

  //   if (!auth.data) return alert("email/password salah");
  //   console.log("auth.data login", auth.data);
  //   delete auth.data[0].password;
  //   dispatch({
  //     type: types.login,
  //     payload: { ...auth.data[0] },
  //   });
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   localStorage.setItem("auth", JSON.stringify(auth.data[0]));
  //   alert(`Hello`);
  //   nav("/home");
  // };
  useEffect(() => {}, []);

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
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                required
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
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
                onClick={formik.handleSubmit}
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
