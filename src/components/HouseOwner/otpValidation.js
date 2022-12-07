import React, {useState , useReducer} from 'react';
import classes from './Login.module.css';
import Button from './Button';
import {  useNavigate } from 'react-router-dom';
// import { Link } from "react-bootstrap";

const otpValidation = (props) => {
  const navigate = useNavigate();
  const otpInitialState = {
    enteredotp: '',
    otpIsValid: null
  };
  const [routePath, setRoutePath] = useState('/');
  const [isNavDisabled, setIsNavDisabled] = useState(true);

  const otpHandler = (prevState,action)=>{
    if(action.type === 'otpchange'){
      return {enteredotp: action.payload,
              otpsValid: action.payload.includes('@')}
    }
    if(action.type === 'otpvalidity'){
      return{enteredotp: prevState.enteredotp,
        otpIsValid: prevState.enteredotp.includes('1-9')}
    }
    return{enteredotp: '',
      otpIsValid: false}
  };

//   const passwordHandler = (prevState,action) => {

//     if(action.type === 'passwordchange'){
//       return {enteredPassword: action.payload,
//               passwordIsValid: action.payload.trim().length > 6}
//     }
//     if(action.type === 'passwordvalidity'){
//       return{enteredPassword: prevState.enteredPassword,
//               passwordIsValid: prevState.enteredPassword.trim().length > 6}
//     }
//     return{enteredPassword: '',
//             passwordIsValid: false}
//   };


  const [otpCurrentState,dispatchotp] = useReducer(otpHandler,otpInitialState);
//   const [passwordCurrentState,dispatchPassword] = useReducer(passwordHandler,passwordInitialState);

//   const [formIsValid, setFormIsValid] = useState(false);
  
//   useEffect(()=>{
//     const identifier = setTimeout(()=>{
//       console.log("validity check");

//     setFormIsValid(
//        otpCurrentState.enteredotp.trim().length < 7 
//     );
//     },500);
//     return()=>{
//       console.log('CLEANUP');
//       clearTimeout(identifier);
//     };
    
//   },[otpCurrentState]);

  
  const otpChangeHandler = (event) => {
    dispatchotp({type:'otpchange',payload: event.target.value})
  };

  const validateotpHandler = () => {
    dispatchotp({type:'otpvalidity'})
  };

//   const passwordChangeHandler = (event) => {
//     dispatchPassword({type:'passwordchange',payload: event.target.value})
//   };

//   const validatePasswordHandler = () => {
//     dispatchPassword({type:'passwordvalidity'})
//   };

  const submitHandler = async (event) => {
    debugger
    navigate('/houseownerservices');
    event.preventDefault();
    let otp=otpCurrentState.enteredotp;
    // let password=passwordCurrentState.enteredPassword;
    props.onLogin(otpCurrentState.enteredotp)
    fetch('http://127.0.0.1:8000/zerowaste/houseowner/signup/', {
      method: 'POST',
      body:JSON.stringify({otp,
        returnSecureToken: true,
      })
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
    .then(response => {
      console.log("request: ", response);
    })
    .then(resJson => {
      console.log("response: ", resJson);

    })
    .catch(err => {
      
      console.log(err);
    }); 
    // console.log(JSON.stringify({email}));
    
    setIsNavDisabled(false);
    
   
  };

  return (
    <div className={classes.houseowner}>
      <h1>Enter Your OTP</h1>
      <h3>Check Your Messages for OTP</h3>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            otpCurrentState.otpIsValid === false ? classes.invalid : ''
          }`}
        >
          <input
            type="text"
            id="email"
            value={otpCurrentState.enteredotp}
            onChange={otpChangeHandler}
            onBlur={validateotpHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" 
            className={classes.btn} 
            // disabled={!formIsValid}
            onClick={(e) => submitHandler(e)}
          >
           {/* <a href='/welcome'> */}
           
            Login
            
             {/* </a> */}
          </Button>
          {/* </Nav> */}
        </div>
      </form>
    </div>
  );
};

export default otpValidation;
