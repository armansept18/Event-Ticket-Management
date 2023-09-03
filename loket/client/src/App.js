import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import Redirect from "./pages/redirect";
import { EventDetail } from "./pages/eventDetail";
import Register from "./pages/register";
import { SimpleCard } from "./pages/login";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { Dashboard } from "./pages/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { types } from "./redux/reducers/types";

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const local = JSON.parse(localStorage.getItem("auth"));
  //   // setUsers(local ? JSON.parse(local) : users);
  //   console.log(local);
  //   if (local) {
  //     dispatch({
  //       type: types.login,
  //       payload: { ...local },
  //     });
  //   } else if (local) {
  //     dispatch({
  //       type: types.logout,
  //       payload: { ...local },
  //     });
  //   }

  //   console.log(userSelector);
  // }, []);
  // setTimeout(() => {
  //   setIsLoading(false);
  // }, 2000);

  // console.log("search :>> ", search);

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar search={search} setSearch={setSearch} />
      )}
      <Routes>
        <Route path="home" element={<Homepage search={search} />} />
        <Route path="event-detail/:eventId" element={<EventDetail />} />
        <Route path="" element={<Redirect />} />
        <Route path="login" element={<SimpleCard />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
export default App;
