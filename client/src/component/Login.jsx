import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [account, toogleAccount] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  function toogleSignup() {
    account === 'login' ? toogleAccount('signup') : toogleAccount('login');
  }

  function handleSubmit(e){
    e.preventDefault();
    axios.post('', {name, email, password})
    .then(result=> console.log(result))
    .catch(err => console.log(err))
  }

  return (
    <>
      <form className="container  loginInput m-5 d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
        {account === 'login' ? (
          <>
            <input type="text" placeholder="Enter Email"  />
            <input type="password" placeholder="Enter Password" />
            <button className="btn btn-primary btn-sm">Log In</button>
            <p>Or</p>
            <button onClick={() => toogleSignup()}>Create an account</button>
          </>
        ) : (
          <>
            <input type="text" placeholder="Enter  Name"  onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Enter Email"  onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter Password"  onChange={(e)=> setPassword(e.target.value)}/>
            <button className="btn btn-primary btn-sm">Sign In</button>
            <p>Or</p>
            <button onClick={() => toogleSignup()}>
              Already had an account
            </button>
          </>
        )}
        <p>@Copyright {currentYear} sujanNaharki Chhetri</p>
      </form>
    </>
  );
}

export default Login;
