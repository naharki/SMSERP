import React, { useState } from 'react';
import axios from 'axios';
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
const [error, showError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const newAccount = { ...activity };
    try {
      const result = await axios.post(
        'http://localhost:5050/api/user/login',
        newAccount
      );
      // .then((pushData)=> )
      // body: JSON.stringify(newAccount),;
      // console.log(result.status)
      // const res = await result.json();
      console.log(result.data.token);
      if (result.status !== 200) {
        // console.log('error while fetching data');
alert("Some thing went wrong")
        return;
      }

      let fetchUserDetails = await axios.get(
        'http://localhost:5050/api/user/loggeduser',
        {
          headers: {
            Authorization: `Bearer ${result.data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log(fetchUserDetails.data)
      const resData = await fetchUserDetails.data;
      // console.log(details)
      navigate('/dashboard', { state: resData });

    } catch (error) {
      // alert('error', error);
      // console.log(error.response.data.message)
      //set backend error response on the front4nd
      showError(error.response.data.message)

    }
  }
  // console.log(details);

  //useEffect hook

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
  //this block first send login credential to the backend and
  //if everything it calls second api otherwise it doesnot call second api

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
              <div></div>
            </div>

            <div className="col-12 col-sm-7 col-md-8 col-lg-5 col-xl-7 offset-xl-1">
              <form
                className="d-flex flex-column mx-auto"
                style={{ maxWidth: '300px', height: '300px' }}
                // onSubmit={(e) => handleSubmit(e)}
              >
                <h4 className=" text-center text-primary">Welcome to ERP</h4>
                <input
                  className="mb-3 form-control email"
                  type="email"
                  name="email"
                  value={activity.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  autoComplete='on'
                />

                <div className="password-area form-control mb-4 ">
                  <input
                    className="password  mb-2 py-1.3"
                    type={type}
                    name="password"
                    value={activity.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    autoComplete='off'
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
                      size="lg"
                    />
                  </span>
                </div>
                <button
                  className="btn btn-primary btn-sm mb-1"
                  onClick={(e) => handleSubmit(e)}
                >
                  Login
                </button>
              {error && <p className='text-italic text-center text-danger '>{error}</p>}
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
