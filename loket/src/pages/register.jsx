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
} from "@chakra-ui/react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/reducers/types";

const Register = ({ users = [], setUsers }) => {
  const nav = useNavigate();
  const [referralCode, setReferralCode] = useState();
  const [generatedReferralCode, setGeneratedReferralCode] = useState();

  const generateRandomReferralCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };
  const handleReferralCodeChange = (event) => {
    setReferralCode(event);
  };

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    refferalCode: "",
  });

  const InputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  useEffect(() => {
    if (userSelector.id) nav("/login");
  }, []);
  const register = async (e) => {
    e.preventDefault();
    const auth = await api.get("/users", {
      params: { fullname: "", email: "", password: "", referralCode: "" },
    });
    console.log(user);

    const check = await api.get("/users", {
      params: {
        email: user.email,
        password: user.password,
        refferalCode: user.refferalCode,
      },
    });

    if (check.data.length) return alert("email sudah terdaftar");
    const tmp = { ...user };
    console.log(tmp);
    if (user.password) {
      const tmp = { ...user };
      console.log(tmp);
      delete tmp.confirmPassword;
      await api.post("/users", tmp);
      // alert("berhasil register");
      nav("/login");
    } else {
      alert("password dan confirm password tidak sesuai");
    }
    dispatch({
      type: types.logout,
      payload: { ...auth.data },
    });
  };

  useEffect(() => {
    setGeneratedReferralCode(generateRandomReferralCode());
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={register}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign up to your account</Heading>
          </Stack>
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
                  required
                  onChange={(e) => InputHandler("fullname", e.target.value)}
                />
              </FormControl>
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
              <FormControl id="refferalCode">
                <FormLabel>Refferal Code</FormLabel>
                <Input
                  type="text"
                  id="reffralCode"
                  onChange={(event) =>
                    handleReferralCodeChange("refferalCode", event.target.value)
                  }
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
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
        </Stack>
      </form>
    </Flex>
  );
};

export default Register;
