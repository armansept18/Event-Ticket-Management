import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/homepage";
import Redirect from "./pages/redirect";
import { EventDetail } from "./pages/eventDetail";
import Register from "./pages/register";
import { SimpleCard } from "./pages/login";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  console.log("search :>> ", search);

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar search={search} setSearch={setSearch} />
      )}
      <Routes>
        <Route path="home" element={<Dashboard search={search} />} />
        <Route path="event-detail/:eventId" element={<EventDetail />} />
        <Route path="" element={<Redirect />} />
        <Route path="login" element={<SimpleCard />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}
export default App;
