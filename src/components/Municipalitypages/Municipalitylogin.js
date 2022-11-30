import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Municipalitylogin.module.css';

const MunicipalityLogin = () => {
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch("http://127.0.0.1:8000/zerowaste/corporation/login", {

      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username :enteredName,
        password:enteredPassword,
 
      })
 
    })
 
      .then(response => {
        console.log("hello");
        console.log("request: ", response);
        return response.json();
      })
      .then(resJson => {
        console.log("response: ", resJson);
        if(resJson.status === 1){
          // setRedirect(true);
          navigate('/municipalityservices');    
 
        }
     })
  };
  return(
   <div className={classes.MunicipalityLogin}>
    <h1>Corporation Login</h1>
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='password'>UserName</label>
          <input
            type='text'
            id='username'
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