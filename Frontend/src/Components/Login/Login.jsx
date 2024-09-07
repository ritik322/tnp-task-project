import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const context = useOutletContext()
    const [isLogin,setIsLogin] = context;

    const handleSubmit = async(e) => {
      e.preventDefault();

      if(!username.length || !password.length){
        return;
      }

      const csrfToken = await axios
      .get("api/csrf-token")
      .then((res) => res.data.csrf_token);

      const response = await axios.post('api/login',{
        'username': username,
        'password': password,
        '_token': csrfToken
      })
      setUserName('')
      setPassword('')
      localStorage.setItem('isLogin',true)
      setIsLogin(true);
      navigate('/home')
    }

  return (
    <div id="login-container">
    <i className="fa-solid fa-user"></i>
      <form action="" id='form-container' onSubmit={handleSubmit}>
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
