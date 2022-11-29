import React, { useEffect, useState , useReducer} from 'react';
import classes from '../Projects/Login.module.css';
import Button from '../Projects/Button';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './SlotBooking.css';
// import { Link } from "react-bootstrap";


const SlotBooking = (props) => {
  var validated =false
const [message, setMessage] = useState('');
const [password, setPassword] = useState('');
const [wasteid, setWasteid] = useState('');
const [redirect, setRedirect] = useState(false);
const [wasteData, setWasteData] = useState();

useEffect(()=>{
  getWasteData();
},[]);

const getWasteData = () => {
  fetch("http://127.0.0.1:8000/zerowaste/wastelist/", 
  {
    method: "GET",
  }).then((response) => {
      // console.log("response Ward data: ", response.json());
      return response.json();
    })
    .then(function (data) {
      setWasteData(data);
    })
    .catch(err => {
      console.log(err);
    }); 
}

const handleMessage = (e) => {
  setMessage(e.target.value);
}
const handleWasteid =(e)=> {
  e.preventDefault();
  setWasteid(e.target.value);
  console.log(e.target.value)
  // console.log(wardno)
}
  const handleDate = (e) => {
    setMessage(e.target.value);
  // console.log(email)
}


const handleRegister = () => {
  this.validateFormValues();
  if(validated) 
  {
    fetch("http://127.0.0.1:8000/zerowaste/houseowner/signup/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      message: message,
      wasteid:wasteid,
      
    })
  })
    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);

    })
    .catch(err => {
      
      console.log(err);
    }); 
  }

  //   console.log(firstnameValidationError,pincode); 
}

  return (
    <div className="register">
      <h2 className="registerhead">Book Your Slot</h2>
      
      <label className="itemm"><b>Add Message : </b>
      <input className="inputarea" type="text" name="message" onChange={() =>handleMessage()}
        /> </label>
      <label className="itemm"><b>Waste Type :</b>
       {/* <input className="inputarea" type="text" name="wardno" onChange={()=>handleWardno()} />  */}
       <div className="dropdown">
        <select className="dropdownn" onChange={(e) => handleWasteid(e)}>
          {wasteData?.map(waste => {
              return (<option key={waste.wasteid} value={waste.wasteid}>{waste.waste_type}</option>);
          })}
        </select>
      </div></label>
      <div className='slotdate'>
         <label htmlFor="password"><b>Select Date:</b></label>
         <input type="date" id="slotdate" name="birthday" onChange={(e) =>handleDate(e)}/>
         </div>
      {/* {wasteidValidationError && <div className="errormessage">{wasteidValidationError}</div>} */}

       <Nav
            as={Link}
            to="/houseownerservices"
            > 
        <Button type="submit" className={classes.btn} >
          Submit
        </Button>
         </Nav> 
    {/*         
      <button className="submit" onClick={this.handleRegister}>Submit</button>
      {redirect && <Nav.Item>
            <Nav.Link
            as={Link}
            to="/welcome"
              // href="https://blogs.soumya-jit.tech/"
              // target="_blank"
              // rel="noreferrer"
            />
          </Nav.Item>} */}
          <div className='row2'>
            <p>Already have an Account? <a href="/login">Register</a></p>
            </div>
    </div>
  );
}
export default SlotBooking;