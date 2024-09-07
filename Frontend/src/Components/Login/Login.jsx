import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
  return (
    <div id="login-container">
    <i className="fa-solid fa-user"></i>
      <form action="" id='form-container'>
        <div className="input-div">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
