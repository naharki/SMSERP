import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {
    
  const [activity, setActivity] = useState({
    name : '',
    email: '',
    password: ''
  });

 
    function handleChange(e) {
      const { name, value } = e.target;
      setActivity((prevData) => ({ ...prevData, [name]: value }));
    }


  //handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    const newAccount = { ...activity };
    await fetch('http://localhost:5050/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    // setActivity({ name: '', email: '', password: '' });
  }

    return(
        <form
        action=""
        className="d-flex flex-column mx-auto my-5"
        style={{ width: '40%' }}
      >
        <h4 className="text-center text-primary">Create a new Account</h4>
        <input
          type="text"
          className="mb-2"
          name="name"
          value={activity.name}
          onChange={(e) => handleChange(e)}
          placeholder="Enter name"
          autoComplete="current-name" 
          
        />
        <input
          type="email"
          className="mb-2"
          name="email"
          value={activity.email}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Email"
          autoComplete="current-email"
        />
        <input
          type="password"
          name="password"
          className="mb-2"
          value={activity.password}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Password"
          autoComplete="current-password"
        />
        <button className="mb-1 btn btn-primary btn-sm mb-3"  type='button' onClick={(e) => handleSubmit(e)}>
          Sign Up!
        </button>
        <p className="text-center">OR</p>
        {/* <button onClick={toogleSignup}  type='button' className="btn btn-warning">
          Already Have Account
        </button> */}

         <Link  className='small fw-bold mt-2 pt-1 mb-0 text-center link-danger' to="/login"
              >Already have account</Link>
      </form>
    
    )
}
export default Register;