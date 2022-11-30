import React, { useEffect, useState , useReducer} from 'react';
import classes from '../Projects/Login.module.css';
import Button from '../Projects/Button';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './SlotBooking.css';
// import { Link } from "react-bootstrap";


const SlotBooking = (props) => {
  var validated =false
const [collectionDate, setCollectionDate] = useState('');
const [id, setWasteid] = useState('');
const [wasteData, setWasteData] = useState();
const [message, setMessage] = useState();

const current = new Date();
  const booking_date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  console.log(booking_date);

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

}
  const handleDate = (e) => {
    e.preventDefault();
    setCollectionDate(e.target.value);
    console.log(e.target.value)
 
}


const handleRegister = () => {

    fetch("http://127.0.0.1:8000/zerowaste/houseowner/slotbooking/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      // message: message,
      waste_id:id,
      collection_date:collectionDate,
      booking_date:booking_date,
      jwt:sessionStorage.getItem("jwt"),

     
    })
   
  })

  console.log(sessionStorage.getItem('jwt'))
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
              return (<option key={waste.id} value={waste.id}>{waste.waste_type}</option>);
          })}
        </select>
      </div></label>
      <div className="itemm">
         <label className="dropdownn"><b>Select Date:</b></label>
         <input type="date" id="slotdate" name="collection-date" min="2022-12-01" onChange={(e) =>handleDate(e)}/>
         <div className='buttons'> 
          <Link to="/slotbooked"> 
              <button type="submit" className='butn' id="two" onClick={handleRegister}>
                Submit
              </button>
            </Link>      
          </div>
          </div>
    </div>
  );
}
export default SlotBooking;