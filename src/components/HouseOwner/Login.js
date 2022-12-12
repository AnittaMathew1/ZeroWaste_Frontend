
import { useState, useRef, useContext,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const Login = (props) => {
  const navigate=useNavigate();
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
  const [emailValidationErrorr, setEmailValidationErrorr] = useState('');
  const [loginValidationErrorr, setloginValidationErrorr] = useState('');
  const [phoneNoValidationErrorr, setPhoneNoValidationErrorr] = useState('');
  const [passwordValidationErrorr, setPasswordValidationErrorr] = useState('');
const [redirect, setRedirect] = useState(false);
const [pincodeValidationError, setPincodeValidationError] = useState('');
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  useEffect(()=>{
    getWardData();
  },[]);
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
        })
        .then(response=>{
          console.log("ress",response);
          setIsLoading(false);
          
          return response.json();
        }) 
        .then(res => {
          console.log("responseeee: ", res);
          if(res.status === 1){
            setIsLogin(true);
            setRedirect(true); 
          }
          if(redirect==false){
            setEmailValidationErrorr(res.data.email[0]);
            setPhoneNoValidationErrorr(res.data.phoneno[0]);
          }
        });
        //  .then(resJson => {
        //    console.log("response: ", resJson);
        //  });
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
          setIsLoading(false);
          return response.json();
          
        })
          .then((res) => {
              console.log("responseeee: ", res.detail);
              console.log(res.jwt);
              authCtx.login(res.jwt);
              sessionStorage.setItem("jwt",res.jwt);
              if(res.status === 1){
                setRedirect(true);
                setIsLogin(true);
                navigate('/houseownerservices')    
              }
              if(redirect==false){
                setPasswordValidationErrorr(res.detail);
              }
            setIsLoading(false);
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = 'Authentication failed!';
                alert('errorMessage');
                console.log("responsess: ", res.detail);
                  // if(res.status === 1){
                  //   // setRedirect(true);
                    
                  //   navigate('/houseownerservices')    
                  // }
                  // else if(res.status !== 1){
                  //   console.log("Anitta")
                  //   setuserValidationError('Invalid Username or Password');
                  //   alert(userValidationError);

                  if(res.header.redirect==false){
                    setloginValidationErrorr(res.detail);
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
            <label  htmlFor='name'>First name<i  style= {{ color : "red" }} >*</i></label>
          <input type='name' id='fname' required placeholder="Enter your first name"  ref={firstnameInputRef} />
          <label class="required-field" htmlFor='name'>Last name<i  style= {{ color : "red" }} >*</i></label>
          <input type='name' id='lname' required placeholder="Enter your last name" ref={lastnameInputRef} />
          <label class="required-field" htmlFor='name'>Address<i  style= {{ color : "red" }} >*</i></label>
          <input type='name' id='address' required placeholder="Enter your address" ref={addressInputRef} />
          <label class="required-field" htmlFor='name'>Pincode<i  style= {{ color : "red" }} >*</i></label>
           <input type='tel' id='pincode' placeholder="666666" pattern="[0-9]{6}" minlength="6"
    maxlength="6" required ref={pincodeInputRef} />
           <label class="required-field" htmlFor='name'>Ward<i  style= {{ color : "red" }} >*</i> :
            <div className="dropdown">
              <select required ref={wardInputRef} placeholder="Select Ward Number"
             >
        {wardData?.map(ward => {
            return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
        })}
      </select>
      </div></label> 
          <label class="required-field" htmlFor='name'>Phone Number<i  style= {{ color : "red" }} >*</i></label>
          <input type='tel' pattern="[0-9]{10}" placeholder="9999999999" id='phoneno' minlength="10"
    maxlength="10" required ref={phonenoInputRef} />
    {phoneNoValidationErrorr && <div className="errormessage">{phoneNoValidationErrorr}</div>}
        </div>}
        <div className={classes.control}>
          <label class="required-field" htmlFor='email'>Email<i  style= {{ color : "red" }} >*</i></label>
          <input type='email' id='email' minlength="11" required placeholder="yourname@gmail.com" ref={emailInputRef} />
          {emailValidationErrorr && <div className="errormessage">{emailValidationErrorr}</div>}
        </div>
        <div className={classes.control}>
          <label class="required-field" htmlFor='password'>Password<i  style= {{ color : "red" }} >*</i></label>
          <input type='password' id='password' required ref={passwordInputRef} />
          {passwordValidationErrorr && <div className="errormessage">{passwordValidationErrorr}</div>}
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
          {loginValidationErrorr && <div className="errormessage">{loginValidationErrorr}</div>}
        </div>
      </form>
    </section>
  );
};
export default Login;
