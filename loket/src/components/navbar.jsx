import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export const Navbar = ({ setSearch }) => {
  return (
    <Box className="" position={"sticky"} top={0} bgColor={"#152955"}>
      <Center justifyContent={"space-between"}>
        <div style={{color:"white"}}>
            Ini Logo Bos
        </div>
        <InputGroup maxW={"500px"} bgColor={"#E1FAF4"} borderRadius={"20px"}>
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
        <div style={{ display: "flex", gap: "100px" }}>
          <a href="#" style={{ color: "white" }}>Create Event</a>
          <a href="#" style={{ color: "white" }}>Sign In</a>
          <a href="#" style={{ color: "white" }}>Sign Out</a>
        </div>
      </Center>
    </Box>
  );
};
