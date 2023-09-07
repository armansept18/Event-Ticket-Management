"use client";
import React, { useCallback, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  chakra,
  VisuallyHidden,
  HStack,
  VStack,
  IconButton,
  CloseButton,
  Avatar,
} from "@chakra-ui/react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { Input } from "@chakra-ui/react";
import Loket from "../assets/loket.png";
import { Search2Icon } from "@chakra-ui/icons";
import { CalendarIcon } from "@chakra-ui/icons";
import user from "../assets/user.png";
import { BasicModal } from "./modal";
import debounce from "lodash.debounce";
import { api } from "../api/axios";
import { useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("auth");
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const debouncedFilter = useCallback(
    debounce((query) => setSearch(query), 500)
  );
  const searching = (query) => {
    if (!query) return setSearch("");
    debouncedFilter(query);
  };

  const fetchEvent = () => {
    api
      .get("/events/search", {
        params: {
          search,
        },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchEvent();
  }, [search])

  return (
    <Box>
      <Flex
        width={{ base: "100%", md: "100%" }}
        bg={useColorModeValue("gray.800")}
        minH={"60px"}
        py={{ base: 2 }}
        borderBottom={1}
        borderStyle={"solid"}
        align={"center"}
      >
        <a
          href="/home"
          style={{
            width: "50px",
            height: "50px",
            display: "flex",

            alignItems: "center",
          }}
        >
          <img src={Loket} alt="" />
        </a>
        <InputGroup left={"3"} color={"white"} maxWidth={"55%"}>
          <InputLeftElement pointerEvents="none">
            <Search2Icon />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Cari event seru disini "
            onChange={(e) =>  searching(e.target.value)}
          />
        </InputGroup>
        <Stack
          flex={{ base: 1, md: "flex" }}
          justify={"flex-end"}
          direction={"row"}
          marginLeft={"20px"}
          spacing={4}
        >
          {token && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <CalendarIcon onClick={onOpen} />

              <Stack display={{ base: "none", md: "flex" }}>
                <span
                  onClick={onOpen}
                  style={{ fontSize: "13px", paddingLeft: "5px" }}
                >
                  {" "}
                  Create event
                </span>
              </Stack>
            </div>
          )}
          {token && (
            <>
              <Button
                as={"a"}
                fontWeight={600}
                // href={"/logout"}
                textDecoration={"none"}
                color={"white"}
                bg={"#0049CC"}
                onClick={() => {
                  localStorage.removeItem("auth");
                  window.location.reload();
                }}
              >
                Keluar
              </Button>
              <a href="/dashboard">
                {" "}
                <img
                  src={user}
                  as={Button}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#e5e5e5",
                    borderRadius: "50%",
                  }}
                />
              </a>
            </>
          )}
          {!token && (
            <>
              <Button
                as={"a"}
                fontWeight={600}
                href={"/login"}
                textDecoration={"none"}
                color={"white"}
                bg={"#0049CC"}
              >
                Masuk
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"#0049CC"}
                href={"/register"}
                _hover={{
                  bg: "white",
                }}
              >
                Daftar
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
      <BasicModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
    </Box>
  );
}
