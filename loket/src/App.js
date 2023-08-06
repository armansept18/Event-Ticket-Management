import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { SimpleCard } from "./pages/login";
import { useEffect, useState } from "react";
import Register from "./pages/register";

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  console.log("location", location);
  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar search={search} setSearch={setSearch} />
      )}

      <Routes>
        <Route path="login" element={<SimpleCard />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
