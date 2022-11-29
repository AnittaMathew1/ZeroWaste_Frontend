import React, { useState } from 'react';

// let logoutTimer;

const AuthContext = React.createContext({
  user:{},
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  setUser:(user)=>{},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({userName:''})
  const userIsLoggedIn = !!token;
  console.log(userIsLoggedIn = !!token);

  const logoutHandler = () => {
    setToken(null);
  };

  const loginHandler = (token) => {
    setToken(token);
  };
  const userDetailsHandler=(user)=>{
    setUser(user)
  }
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    user: user,
    login: loginHandler,
    setUser: userDetailsHandler,
    logout: logoutHandler,
  };
  // authCtx.isLoggedIn && (navigate('/login'))

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
