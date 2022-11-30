// import React, { useEffect, useState , useReducer} from 'react';
// import classes from './Login.module.css';
// import Button from './Button';
// import { Nav } from "react-bootstrap";
// import { Link, useNavigate } from 'react-router-dom';
// // import { Link } from "react-bootstrap";
  import { useState, useRef, useContext,useEffect } from 'react';
  import { useHistory } from 'react-router-dom';
  import { Link,useNavigate } from "react-router-dom";
  import AuthContext from './auth-context';
  import classes from './AuthForm.module.css';
  
  const Login = (props) => {
    const navigate=useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [userValidationError, setuserValidationError] = useState('');
    // const history = useHistory();
    const firstnameInputRef = useRef();
    const lastnameInputRef = useRef();
    const addressInputRef = useRef();
    const pincodeInputRef = useRef();
    const wardInputRef = useRef();
    const phonenoInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const authCtx = useContext(AuthContext);
    // const [issignup,setIssignup]=useState(true)
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [wardData, setWardData] = useState();
    const [wardno, setWardNo] = useState('');
    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };
    // const handleWardno =(e)=> {
    //   e.preventDefault();
    //   setWardNo(e.target.value);
    //   console.log(e.target.value)
    //   // console.log(wardno)
    // }
    useEffect(()=>{
      getWardData();
    },[]);
    // ajay code for signup start***********
    function signuphandler() {
     
      const enteredfirstname = firstnameInputRef.current.value;
      const enteredlastname = lastnameInputRef.current.value;
      const enteredaddress = addressInputRef.current.value;
      const enteredpincode = pincodeInputRef.current.value;
      const enteredward = wardInputRef.current.value;
      const enteredphoneno = phonenoInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      setIsLoading(true);
      let url;
      
      url =
          'http://127.0.0.1:8000/zerowaste/houseowner/signup/';
          // const myJSON = JSON.stringify({
          //   name: enteredName,
          //   email: enteredEmail,
          //   password: enteredPassword,
          //   // returnSecureToken: true,
          // });
          // console.log(myJSON);
         fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              firstname: enteredfirstname,
              lastname: enteredlastname,
              address: enteredaddress,
              pincode: enteredpincode,
              wardno: enteredward,
              phoneno: enteredphoneno,
              email: enteredEmail,
              password: enteredPassword,
              // returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(data=>{
            setIsLoading(false);
            setIsLogin(true);
          });
    }
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
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        }); 
    }
    const submitHandler = (event) => {
      event.preventDefault();
      // const enteredName = nameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
  
      // optional: Add validation
  
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
  
          'http://127.0.0.1:8000/zerowaste/houseowner/login/';
          fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              // name: enteredName,
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            console.log("request: ", response);
            return response.json();
            
          })
            .then((res) => {
                console.log("response: ", res);
                console.log(res.jwt);
                sessionStorage.setItem("jwt",res.jwt);
                if(res.status === 1){
                  setRedirect(true);
                  navigate('/houseownerservices')    
                }
              setIsLoading(false);
              if (res.ok) {
                return res.json();
              } else {
                return res.json().then((data) => {
                  let errorMessage = 'Authentication failed!';
                  alert('errorMessage');
                  console.log("responsess: ", res.detail);
                    if(res.status === 1){
                      // setRedirect(true);
                      
                      navigate('/houseownerservices')    
                    }
                    // else if(res.status !== 1){
                    //   console.log("Anitta")
                    //   setuserValidationError('Invalid Username or Password');
                    //   alert(userValidationError);
                    // }
                    if(redirect==false){
                      setuserValidationError('Invalid Username or Password');
                      console.log(setuserValidationError);
                    }

                  if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                  }
     
                  throw new Error(errorMessage);
                });
              }
            })
            .then((data) => {
              authCtx.login(data.jwt);
              console.log("hiiii",JSON.stringify(data.jwt))
              // authCtx.setUser({userName:data.username})
              // localStorage.setItem('jwt',JSON.stringify(data.jwt))
            })
            .catch((err) => {
            });
      } else {
        signuphandler()
      }
    };
    return (
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
        <form onSubmit={submitHandler}>
        {!isLogin && <div className={classes.control}>
              <label htmlFor='name'>First name</label>
            <input type='name' id='fname' required  ref={firstnameInputRef} />
            <label htmlFor='name'>Last name</label>
            <input type='name' id='lname' required ref={lastnameInputRef} />
            <label htmlFor='name'>Address</label>
            <input type='name' id='address' required ref={addressInputRef} />
            <label htmlFor='name'>Pincode</label>
             <input type='tel' id='pincode' pattern="[0-9]{6}" minlength="6"
      maxlength="6" required ref={pincodeInputRef} />
             <label className="itemm">Ward :
              <div className="dropdown">
                <select required ref={wardInputRef} placeholder="Select Ward Number"
               >
          {wardData?.map(ward => {
              return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
          })}
        </select>
        </div></label> 
            <label htmlFor='name'>Phone Number</label>
            <input type='tel' pattern="[0-9]{10}" placeholder="9999999999" id='phoneno' minlength="10"
      maxlength="10" required ref={phonenoInputRef} />
          </div>}
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' minlength="11" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? 'Login' : 'Create Account'}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
            {userValidationError && <div className="errormessage">{userValidationError}</div>}
          </div>
        </form>
      </section>
    );
  };
export default Login;