import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Projects/Login";
import Msignin from "./components/Projects/msignin";
import Bookinghistory from "./components/pages/BookingHistory";
import Bookingstatus from "./components/pages/Bookingstatus";
import Slotbooking from "./components/pages/SlotBooking";
import Payment from "./components/pages/Payments";
import Houseownerservices from "./components/Projects/Houseownerservices";
// import Corporation from "./components/Municipalitypages/Municipalityservices";
// import Register from "./components/Projects/Register";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Projects/Register";
import Slotbooked from "./components/pages/Slotbooked";
import Municipalitylogin from "./components/Municipalitypages/Municipalitylogin"

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Msignin" element={<Msignin />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/register" element={<Register />} />
          <Route path="/houseownerservices" element={<Houseownerservices />} />
          {/* <Route path="/houseownerservices" element={<Municipalityservices/>} /> */}
          <Route path="/bookinghistory" element={<Bookinghistory />} />
          <Route path="/bookingstatus" element={<Bookingstatus />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/slotbook" element={<Slotbooking />} />
          <Route path="/slotbooked" element={<Slotbooked />} />
          <Route path="/municipalitylogin" element={<Municipalitylogin />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
