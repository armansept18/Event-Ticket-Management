import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Logo from "../assets/logo-loket-white.png"

export const Navbar = ({ setSearch }) => {
  return (
    <Box
      className=""
      // position={"absolute"}
      top={0}
      bgColor={"#152955"}
      zIndex={"3"}
      height={"106px"}
    >
      <Center justifyContent={"center"} gap={"250px"}>
        <div style={{ marginLeft: "40px", marginTop: "20px" }}>
          <a href="">
            <img src={Logo} alt="" width={"100px"} />
          </a>
        </div>
        <InputGroup
          maxW={"500px"}
          bgColor={"#E1FAF4"}
          borderRadius={"20px"}
          marginTop={"20px"}
        >
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Cari event seru disini"
            onKeyPress={(e) => {
              if (e.key == "Enter") setSearch(e.target.value);
            }}
          />
        </InputGroup>
        <div style={{ display: "flex", gap: "60px", marginTop: "20px" }}>
          <a href="/buat-event" style={{ color: "white" }}>
            Buat Event
          </a>
          <a href="/register" style={{ color: "white" }}>
            <span>Daftar</span>
          </a>
          <a href="/login" style={{ color: "white" }}>
            <span style={{}}>Masuk</span>
          </a>
        </div>
      </Center>
    </Box>
  );
};
