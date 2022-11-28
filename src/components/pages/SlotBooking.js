import React, { useEffect, useState , useReducer} from 'react';
import classes from '../Projects/Login.module.css';
import Button from '../Projects/Button';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './SlotBooking.css';
// import { Link } from "react-bootstrap";


const SlotBooking = (props) => {
  

      const emailInitialState = {
        enteredEmail: '',
        emailIsValid: null
      };

      const passwordInitialState = {
        enteredPassword: '',
        passwordIsValid: null
      };


        const emailHandler = (prevState,action)=>{

          if(action.type === 'emailchange'){
            return {enteredEmail: action.payload,
                    emailIsValid: action.payload.includes('@')}
          }
          if(action.type === 'emailvalidity'){
            return{enteredEmail: prevState.enteredEmail,
              emailIsValid: prevState.enteredEmail.includes('@')}
          }
          return{enteredEmail: '',
            emailIsValid: false}
        };

        const passwordHandler = (prevState,action) => {

          if(action.type === 'passwordchange'){
            return {enteredPassword: action.payload,
                    passwordIsValid: action.payload.trim().length > 6}
          }
          if(action.type === 'passwordvalidity'){
            return{enteredPassword: prevState.enteredPassword,
                    passwordIsValid: prevState.enteredPassword.trim().length > 6}
          }
          return{enteredPassword: '',
                  passwordIsValid: false}
        };


  const [emailCurrentState,dispatchEmail] = useReducer(emailHandler,emailInitialState);
  const [passwordCurrentState,dispatchPassword] = useReducer(passwordHandler,passwordInitialState);
  const [formIsValid, setFormIsValid] = useState(false);
  const [wasteData, setWasteData] = useState();


  
  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log("validity check");

    setFormIsValid(
      emailCurrentState.enteredEmail.includes('@') && passwordCurrentState.enteredPassword.trim().length > 6
    );
    },500);
    return()=>{
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
    
  },[emailCurrentState, passwordCurrentState]);

  
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'emailchange',payload: event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'emailvalidity'})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'passwordchange',payload: event.target.value})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'passwordvalidity'})
  };

  const getWasteData = () => {
    fetch("https://wastetype-13932-default-rtdb.firebaseio.com//wastetype.json", 
    {
      method: "GET",
    }).then((response) => {
        console.log("response Waste data: ", response.json());
        return response.json();
      })
      .then(function (data) {
        setWasteData(data);
      })
      .catch(err => {
        console.log(err);
      }); 
    };
  const submitHandler = async (event) => {
    event.preventDefault();
    let email=emailCurrentState.enteredEmail;
    let password=passwordCurrentState.enteredPassword;
    // props.onLogin(emailCurrentState.enteredEmail, passwordCurrentState.enteredPassword)
   
  };

  return (
    <div className={classes.houseowner}>
      <h1>Book your Slot</h1>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailCurrentState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
        {/* <label className="itemm">Waste Type :
       <div className="checkbox"> */}
        {/* <select value="value-2" > */}
          {/* {wasteData?.map(waste => {
              return (
                <div>
                  
                <input type="checkbox"  value={waste.wastetype}/>
                <label key={waste.wastetype} value={waste.wastetype}>{waste.wastetype}</label>
              
              </div>);
          })} */}
        {/* </select> */}
      {/* </div></label> */}
      {/* {wardnoValidationError && <div className="errormessage">{wardnoValidationError}</div>} */}

          <label htmlFor="email">Waste Type</label>
          {/* <input
            type="email"
            id="email"
            value={emailCurrentState.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          /> */}
          
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
              <label for="vehicle1"> Plastic</label>
              <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
              <label for="vehicle2"> FoodWaste</label>
              <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
              <label for="vehicle3"> Glass</label><br></br>
              <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
              <label for="vehicle3"> Metal</label>
              <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
              <label for="vehicle3"> E-waste</label>
        </div>  
        <div
          className={`${classes.control} ${
            passwordCurrentState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Add message</label>
          <input
            type="text"
            id="password"
            value={passwordCurrentState.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className='slotdate'>
        <label htmlFor="password"><b>Select Date:</b></label>
        <input type="date" id="birthday" name="birthday"/>
        </div>
        <div className={classes.actions}>
        <Nav
              as={Link}
              to="/slotbooked"
              >
          <Button type="submit" className={classes.btn} >
           {/* <a href='/welcome'> */}
           
            Submit
            
             {/* </a> */}
          </Button>
          </Nav>
        </div>
        {/* <div className='row2'>
              <p>Don't have an Account? <a href="/register">Register</a></p>
              </div> */}
      </form>
    </div>
  );
};
export default SlotBooking;