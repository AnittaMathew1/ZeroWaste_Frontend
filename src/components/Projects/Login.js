import React, { useEffect, useState , useReducer} from 'react';
import classes from './Login.module.css';
import Button from './Button';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
// import { Link } from "react-bootstrap";


const Login = (props) => {

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

  const submitHandler = async (event) => {
    event.preventDefault();
    let email=emailCurrentState.enteredEmail;
    let password=passwordCurrentState.enteredPassword;
    // props.onLogin(emailCurrentState.enteredEmail, passwordCurrentState.enteredPassword)
    const response = await fetch('https://houseownerlogin-default-rtdb.firebaseio.com/houseowner.json', {
      method: 'POST',
      body: JSON.stringify({email,password})
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    });
    const data = await response.json();
    console.log(data);
   
  };

  return (
    <div className={classes.houseowner}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailCurrentState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailCurrentState.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordCurrentState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordCurrentState.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
        <Nav
              as={Link}
              to="/houseownerservices"
              >
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
           {/* <a href='/welcome'> */}
           
            Login
            
             {/* </a> */}
          </Button>
          </Nav>
        </div>
        <div className='row2'>
              <p>Don't have an Account? <a href="/register">Register</a></p>
              </div>
      </form>
    </div>
  );
};

export default Login;



// import React, { useEffect, useState , useReducer} from 'react';
// import classes from './Login.module.css';
// import Button from './Button';


// const Login = (props) => {

//   const emailInitialState = {
//     enteredEmail: '',
//     emailIsValid: null
//   };

//   const passwordInitialState = {
//     enteredPassword: '',
//     passwordIsValid: null
//   };


//   const emailHandler = (prevState,action)=>{

//     if(action.type === 'emailchange'){
//       return {enteredEmail: action.payload,
//               emailIsValid: action.payload.includes('@')}
//     }
//     if(action.type === 'emailvalidity'){
//       return{enteredEmail: prevState.enteredEmail,
//         emailIsValid: prevState.enteredEmail.includes('@')}
//     }
//     return{enteredEmail: '',
//       emailIsValid: false}
//   };

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


//   const [emailCurrentState,dispatchEmail] = useReducer(emailHandler,emailInitialState);
//   const [passwordCurrentState,dispatchPassword] = useReducer(passwordHandler,passwordInitialState);

//   const [formIsValid, setFormIsValid] = useState(false);


  
//   useEffect(()=>{
//     const identifier = setTimeout(()=>{
//       console.log("validity check");

//     setFormIsValid(
//       emailCurrentState.enteredEmail.includes('@') && passwordCurrentState.enteredPassword.trim().length > 6
//     );
//     },500);
//     return()=>{
//       console.log('CLEANUP');
//       clearTimeout(identifier);
//     };
    
//   },[emailCurrentState, passwordCurrentState]);

  
//   const emailChangeHandler = (event) => {
//     dispatchEmail({type:'emailchange',payload: event.target.value})
//   };

//   const validateEmailHandler = () => {
//     dispatchEmail({type:'emailvalidity'})
//   };

//   const passwordChangeHandler = (event) => {
//     dispatchPassword({type:'passwordchange',payload: event.target.value})
//   };

//   const validatePasswordHandler = () => {
//     dispatchPassword({type:'passwordvalidity'})
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     let email=emailCurrentState.enteredEmail;
//     let password=passwordCurrentState.enteredPassword;
//     // props.onLogin(emailCurrentState.enteredEmail, passwordCurrentState.enteredPassword)
//     const response = await fetch('https://houseownerlogin-default-rtdb.firebaseio.com/houseowner.json', {
//       method: 'POST',
//       body: JSON.stringify({email,password})
//       // headers: {
//       //   'Content-Type': 'application/json'
//       // }
//     });
//     const data = await response.json();
//     console.log(data);
   
//   };

//   return (
//     <div className={classes.houseowner}>
//       <h1>Login</h1>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailCurrentState.emailIsValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={emailCurrentState.enteredEmail}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordCurrentState.passwordIsValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={passwordCurrentState.enteredPassword}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//           />
//         </div>
//         <div className={classes.actions}>
//           {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//              <a href="/welcome">Login</a> 
//           </Button> */}
//           <button onClick={this.handleLogin}><a href="/welcome">Login</a></button>
//           <div className='row2'>
//               <p>Don't have an Account? <a href="/register">Register</a></p>
//               </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;