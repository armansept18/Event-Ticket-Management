import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import Redirect from "./pages/redirect";
import { EventDetail } from "./pages/eventDetail";
import "./css/style.css";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="home" element={<Dashboard />} />
        <Route path="event-detail/:eventId" element={<EventDetail />} />
        <Route path="" element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
