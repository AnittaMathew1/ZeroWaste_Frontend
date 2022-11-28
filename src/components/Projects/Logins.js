import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import './Login.css';
class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);

    this.handleUsername = this.handleUsername.bind(this);

    this.handlePassword = this.handlePassword.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin() {
    fetch("https://zerowaste-24024-default-rtdb.firebaseio.com/houseownerlogin.json", {

      headers: { "Content-Type": "application/json", 'Accept':  'application/json','Cache': 'no-cache' },
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      method: "POST"
    })
      .then(response => {response.json(); console.log(response)})
      .then(data => console.log(data));
      // .then(response => {
      //   console.log("json response: ", response);
      //   return response.text();
      // })
      // .then(resJson => {
      //   console.log("json response: ", resJson);
      // })
      // .catch(err => {
      //   console.log(err);
      // });



  }

  render() {
    return (
      <div className="loginform">
       <div className="loginhead"> <h2>Houseowner Login</h2> </div>
        <h4>Username :
           <input className="inputt" type="text" name="username" onChange={this.handleUsername} /></h4>
        <br />
        <h4>Password :
          <input className="inputt" type="text" name="password" onChange={this.handlePassword} /></h4>
        <br /> <br />
        <button onClick={this.handleLogin}>
          {/* <a href="/welcome"> */}
          <Nav.Link
              as={Link}
              to="/welcome"
                // href="https://blogs.soumya-jit.tech/"
                // target="_blank"
                // rel="noreferrer"
              >
            Login
            </Nav.Link>
            {/* </a> */}
            </button>

        <div className='row2'>
              <p>Don't have an Account? <a href="/register">Register</a></p>
              </div>
      </div>
    );
  }
}

export default Login;
