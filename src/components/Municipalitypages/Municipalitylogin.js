import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Municipalitylogin.module.css';

const MunicipalityLogin = () => {
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch("http://127.0.0.1:8000/zerowaste/corporation/login/", {

      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email :enteredEmail,
        password:enteredPassword,
 
      })
 
    })
 
      .then(response => {
        console.log("request: ", response);
        return response.json();
      })
      .then(resJson => {
        console.log("responsesss: ", resJson);
        console.log("mynameisammu : ",resJson.status)
        sessionStorage.setItem("jwt",resJson.jwt);

        if((resJson.status === 1)&&(resJson.role ==2)){
          navigate('/superadminservices'); 
        }
        else if((resJson.status === 1)&&(resJson.role ==3)){
          navigate('/municipalityservices'); 
        }
        else if((resJson.status === 1)&&(resJson.role ==4)){
          navigate('/supervisorservices'); 
        }
     })
  };
  return(
   <div className={classes.MunicipalityLogin}>
    <h1>Corporation Login</h1>
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            required
            ref={nameInputRef}
          />
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
        <button type='submit' className={classes.button} >Login</button>
        </form>    
     
   </div>
 )
}
export default MunicipalityLogin;