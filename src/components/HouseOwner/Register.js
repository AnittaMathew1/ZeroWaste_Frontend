import React, { Component, useEffect, useState } from "react";
import './Register.css';
import ProjectCards from './ProjectCards.js';
import {Nav} from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import Button from "./Button";
import classes from '../HouseOwner/Login.module.css';

const Register = () => {
var validated =false;
const navigate=useNavigate();
const [firstname, setFirstName] = useState('');
const [lastname, setLastname] = useState('');
const [address, setAddress] = useState('');
const [email, setEmail] = useState('');
const [phoneno, setPhoneNo] = useState('');
const [pincode, setPincode] = useState('');
const [password, setPassword] = useState('');
const [wardno, setWardNo] = useState('');
const [firstnameValidationError, setFirstnameValidationError] = useState('');
const [lastnameValidationError, setLastnameValidationError] = useState('');
const [addressValidationError, setAddressValidationError] = useState('');
const [emailValidationError, setEmailValidationError] = useState('');
const [phonenoValidationError, setPhonenoValidationError] = useState('');
const [passwordValidationError, setPasswordValidationError] = useState('');
const [wardnoValidationError, setWardnoValidationError] = useState('');
const [phoneNoValidationErrorr, setPhoneNoValidationErrorr] = useState('');
const [redirect, setRedirect] = useState(false);
const [pincodeValidationError, setPincodeValidationError] = useState('');
const [emailValidationErrorr, setEmailValidationErrorr] = useState('');
const [wardData, setWardData] = useState();

useEffect(()=>{
  getWardData();
},[]);

const getWardData = () => {
  fetch("http://127.0.0.1:8000/zerowaste/wards/", 
  {
    method: "GET",
  }).then((response) => {
      // console.log("response Ward data: ", response.json());
      return response.json();
    })
    .then(function (data) {
      setWardData(data);
    })
    .catch(err => {
      console.log(err);
    }); 
}

const handleFirstName = (e) => {
  e.preventDefault();
  console.log(firstname);
  setFirstName(e.target.value);
  
}
const handleLastName = (e) => {
  e.preventDefault();
  console.log(lastname)
  setLastname(e.target.value);
  
}
const handleAddress =(e) =>{
  e.preventDefault();
  setAddress(e.target.value);
  // console.log(address)
}

const handleEmail = (e) => {
  e.preventDefault();
  setEmail(e.target.value);
  // console.log(email)
}
const handlePhoneNumber =(e) => {
  e.preventDefault();
  setPhoneNo(e.target.value);
  // console.log(phoneno)
}
const handlePinCode = (e) => {
  e.preventDefault();
  setPincode(e.target.value);
  // console.log(pincode)
}
const handlePassword = (e) => {
  e.preventDefault();
  setPassword(e.target.value);
  // console.log(password)
}

const handleWardno =(e)=> {
  e.preventDefault();
  setWardNo(e.target.value);
  console.log(e.target.value)
  // console.log(wardno)
}

const validateFormValues = () => {
  if((!lastname)&&(!firstname)&&(!address)&&(!email)&&(!phoneno)&&(!pincode)&&(!wardno))
  // if(!firstname)
   {
    setFirstnameValidationError('First Name should not be null');
    setLastnameValidationError('Last Name should not be null');
    setAddressValidationError('Address should not be null');
    setEmailValidationError('Email should not be null');
    setPhonenoValidationError('Phone Number should not be null');
    setPincodeValidationError('Pincode should not be null');
    setWardnoValidationError('Ward Number should not be null');
    setPasswordValidationError('Password should not be null');
  }
  else if(!lastname) {
    setLastnameValidationError('Last Name should not be null');
  }
  else if(!address) {
    setAddressValidationError('Address should not be null');
  }
  else if(!email) {
    setEmailValidationError('Email should not be null');
  }
  else if(!phoneno) {
    setPhonenoValidationError('Phone Number should not be null');
  }
  else if(!pincode) {
    setPincodeValidationError('Pincode should not be null');
  }
  else if(!wardno) {
    setWardnoValidationError('Ward Number should not be null');
  } else if(!firstname) {
    firstnameValidationError('First Name should not be null');
  } else if (!password) {
    setPasswordValidationError('Password should not be null');
  }
  validated = true;
}


const handleRegister = (e) => {
  e.preventDefault();
  validateFormValues();
  if(validated) 
  {
    fetch("http://127.0.0.1:8000/zerowaste/houseowner/signup/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      address: address,
      email: email,
      phoneno: phoneno,
      pincode:pincode,
      password: password,
      wardno:wardno,
      
    })
  })
    .then(response => {
      console.log("request: ", response);
      // if(response.status === 200){
      //   this.setState({
      //     redirect:true,
      //   })      
      // }
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      if(resJson.status === 1){
        setRedirect(true);
        navigate('/login')    
      }
      if(redirect==false){
        setEmailValidationErrorr(resJson.data.email[0]);
        setPhoneNoValidationErrorr(resJson.data.phoneno[0]);
      }

    })
    .catch(err => {
      
      console.log(err);
    }); 
  }
  console.log("Enter Valid Data")

  //   console.log(firstnameValidationError,pincode); 
}

  return (
    <div className="register">
      <h2 className="registerhead">HouseOwner Registration</h2>
     <p> <label className="itemm">First Name :<input className="inputarea" type="text" name="firstName" onChange={(e) =>handleFirstName(e)} /></label>
      {firstnameValidationError && <div className="errormessage">{firstnameValidationError}</div>}
      <label className="itemm">Last Name :<input className="inputarea"  type="text" name="lastname" onChange={(e) =>handleLastName(e)} /></label>
      {lastnameValidationError && <div className="errormessage">{lastnameValidationError}</div>}</p>
      
      <p><label className="itemm">Address : <input  className="inputarea" type="text" name="address" onChange={(e) =>handleAddress(e)} /></label>
      {addressValidationError && <div className="errormessage">{addressValidationError}</div>}
      
      <label className="itemm">Email ID : 
      <input className="inputarea" type="text" name="email" onChange={(e) =>handleEmail(e)}
        /> </label>
      {emailValidationErrorr && <div className="errormessage">{emailValidationErrorr}</div>}
      {emailValidationError && <div className="errormessage">{emailValidationError}</div>}</p>
  
      <p><label className="itemm">Phone Number : <input className="inputarea" type="text" name="phoneno" onChange={(e)=>handlePhoneNumber(e)} /></label>
      {phoneNoValidationErrorr && <div className="errormessage">{phoneNoValidationErrorr}</div>}
      {phonenoValidationError && <div className="errormessage">{phonenoValidationError}</div>}
      
      <label className="itemm">Pincode : <input className="inputarea" type="text" name="pincode" onChange={(e)=>handlePinCode(e)} /></label>
      {pincodeValidationError && <div className="errormessage">{pincodeValidationError}</div>}</p>
      
     <p><label className="itemm">Password : <input className="inputarea" type="text" name="password" onChange={(e)=>handlePassword(e)} /></label>
      {passwordValidationError && <div className="errormessage">{passwordValidationError}</div>}
      
      
      <label className="itemm">Ward Number :
       {/* <input className="inputarea" type="text" name="wardno" onChange={()=>handleWardno()} />  */}
       <div className="dropdown">
        <select onChange={(e) => handleWardno(e)}
          placeholder="Select Ward Number"
        >
          {wardData?.map(ward => {
              return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
          })}
        </select>
      </div></label>
      {wardnoValidationError && <div className="errormessage">{wardnoValidationError}</div>}</p> 

       
        <Button type="submit" 
          className={classes.btn} 
          disabled={validated}
          onClick={(e)=>handleRegister(e)}>
          Submit
        </Button>
                  <div className='row2'>
            <p>Already have an Account? <a href="/login">Register</a></p>
            </div>
    </div>
  );
}

export default Register;
