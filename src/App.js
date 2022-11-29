
import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Projects/Login";
import AuthContext from './components/Projects/auth-context';
import { useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Msignin from "./components/Municipalitypages/Municipalitylogin";
// import Bookinghistory from "./components/pages/BookingHistory";
// import Bookingstatus from "./components/pages/Bookingstatus";
import Slotbooking from "./components/pages/SlotBooking";
import Payments from "./components/Projects/Payments";
import Houseownerservices from "./components/Projects/Houseownerservices";
import Municipalityservices from "./components/Municipalitypages/Municipalityservices";
import Bookingstatusreport from "./components/Municipalitypages/Bookingstatusreport";
// import Register from "./components/Projects/Register";
import Footer from "./components/Footer";
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
import BookingHistory from "./components/Projects/BookingHistory";
import Slotbooked from "./components/pages/Slotbooked";
import Municipalitylogin from "./components/Municipalitypages/Municipalitylogin"
import Bookingstatus from "./components/Projects/Bookingstatus";
import { CgLayoutGrid } from "react-icons/cg";
// import Payments from "./components/pages/Payments";

function App() {
  const authCtx = useContext(AuthContext);
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
      <Navbar /> 
        <ScrollToTop />
        <Routes>
        <Route path="/slotbook" element={<Slotbooking />} />
          <Route path="/slotbooked" element={<Slotbooked />} />
          <Route path="/municipalitylogin" element={<Municipalitylogin />} />
          <Route path="/bookingstatusreport" element={<Bookingstatusreport />} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
          <Route path="/bookingstatus" element={<Bookingstatus />} />
          <Route path="/payments" element={<Payments />} />
        
          <Route path="/login" element={<Login />} />
          <Route path="/Msignin" element={<Msignin />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/houseownerservices" element={<Houseownerservices />} />
          <Route path="/municipalityservices" element={<Municipalityservices/>} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
          <Route path="/bookingstatus" element={<Bookingstatus />} />
          {/* <Route path="/payment" element={<Payment />} /> */}
          
          {/* <Route path="*" element={<Navigate to="/"/>} />
          {authCtx.isLoggedIn && (
          <Route path="/houseownerservices" element={<Navigate to="/houseownerservices"/>}    exact>
          </Route> */}

        {/* {!authCtx.isLoggedIn && (
        <Route path='/' exact>
          <Houseownerservices />
        </Route>
        )} */}
          
        </Routes>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
