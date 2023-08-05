import logo from "./logo.svg";
import "./App.css";
import LargeWithLogoLeft from "./components/footer";
import { useState } from "react";
import { EventListPage } from "./pages/eventPage";
import { Navbar } from "./components/navbar";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
    <Navbar search={search} setSearch={setSearch}/>
      <EventListPage search={search} />
      <div>
        <LargeWithLogoLeft />
      </div>
    </>
  );
}

export default App;
