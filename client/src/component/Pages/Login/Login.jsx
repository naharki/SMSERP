import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import Register from './Registe';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css';


//login components
const Login = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    email: '',
    password: '',
  });

  const schoolInfo = {
    name: 'Admin',
    image:
      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp',
  };

  const [account, toogleAccount] = useState('true');
  const [type, setType] = useState('password');

  function toogleSignup() {
    account === 'false' ? toogleAccount('true') : toogleAccount('false');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setActivity((prevData) => ({ ...prevData, [name]: value }));
  }

  //toggle between hide and unhide password
  function handleToggle() {
    setType(type === 'password' ? 'text' : 'password');
    // setIcons(type === 'password' ? faEye : faEyeSlash);
  }

  //handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    const newAccount = { ...activity };
    let result = await fetch('http://localhost:5050/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    });
    result = await result.json();
    if (result.token) {
      localStorage.setItem('user', JSON.stringify(result.userId));
      localStorage.setItem('token', JSON.stringify(result.token));
      navigate('/createstd');
    } 
  }

  return (
    <section className="vh-100">
      <div
        className="container-fluid h-custom "
        style={{ backgroundColor: '#f0f2f5', height: '100vh' }}
      >
        {account === 'true' ? (
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-7 col-sm-4 col-md-5 col-lg-5 col-xl-4 ">
              <img
                src={schoolInfo.image}
                className="img-fluid"
                alt="School Logo"
              />
              <h6 className="text-center fw-bold text-success">
                Welcome back {schoolInfo.name}
              </h6>
            </div>

            <div className="col-12 col-sm-7 col-md-8 col-lg-5 col-xl-7 offset-xl-1">
              <form
                className="d-flex flex-column mx-auto"
                style={{ maxWidth: '300px', height: '300px' }}
              >
                <h4 className=" text-center text-primary">Welcome to ERP</h4>
                <input
                  className="mb-3 form-control email"
                  type="email"
                  name="email"
                  value={activity.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />

                <div className="password-area form-control mb-4 ">
                  <input
                    className="password  mb-2 py-1.3"
                    type={type}
                    name="password"
                    value={activity.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                  <span
                    className="eye flex justify-around items-center"
                    onClick={handleToggle}
                  >
                    <FontAwesomeIcon
                      className=" eye "
                      //conditionally rendereing :
                      // type === 'password' ? faEyeSlash : faEye
                      icon={type === 'password' ? faEyeSlash : faEye}
                      size={20}
                    />
                  </span>
                </div>

                <button
                  className="btn btn-primary btn-sm mb-1"
                  onClick={(e) => handleSubmit(e)}
                  type="button"
                >
                  Login
                </button>
                <Link className="text-primary text-decoration-none text-center">
                  Forget Password?
                </Link>
                <p className="text-center mb-0">OR</p>

                {/* This is section to toogle account */}
                {/* <button
                  onClick={(e) => toogleSignup(e)}
                  type="button"
                  className="btn btn-success btn-sm "
                >
                  Create An Account
                </button> */}

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="link-danger"
                    onClick={(e) => toogleSignup(e)}
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        ) : (
          <Register />
        )}
      </div>
    </section>
  );
};

export default Login;
