import { Navbar } from "../components/navbar";
import { EventListPage } from "./eventPage";
import { useState } from "react";
import LargeWithLogoCentered from "../components/footer";
import Carousel from "../components/carousel";

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Carousel />
      <EventListPage search={search} />
      <div>
        <LargeWithLogoCentered />
      </div>
    </>
  );
};
