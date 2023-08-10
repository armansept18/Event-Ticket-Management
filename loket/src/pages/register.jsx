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
  });

  const InputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  // Fungsi untuk mengenerate referral code
  const generateReferralCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 6; // Ubah panjang kode sesuai kebutuhan
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
      params: { fullname: "", email: "", password: "", referralCode: "" },
    });

    const check = await api.get("/users", {
      params: {
        email: user.email,
        password: user.password,
        referralCode: user.referralCode,
      },
    });

    if (check.data.length) return alert("email sudah terdaftar");

    if (user.password) {
      const tmp = { ...user };
      delete tmp.confirmPassword;

      // Kirim data user baru dengan referral code yang di-generate
      await api.post("/users", tmp);

      // const referralDiscount = await api.get("/referral-discount", {
      //   params: { referralCode: user.referralCode },
      // });

      // // Menerapkan potongan harga ke total pembayaran
      // const totalPayment = calculateTotalPayment(); // Implementasikan sesuai bisnis Anda
      // const discountedTotal = totalPayment - referralDiscount.data.amount;

      // // Kirim data pembayaran yang sudah dihitung ke server
      // await api.post("/payment", {
      //   userId: check.data.id, // Ganti dengan id pengguna yang sudah direferensikan
      //   totalAmount: discountedTotal,
      // });
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
              <FormControl id="referralCode">
                <FormLabel>Refferal Code</FormLabel>
                <Input
                  type="text"
                  placeholder="Referral Code"
                  value={user.referralCode}
                  onChange={(e) => InputHandler("referralCode", e.target.value)}
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
