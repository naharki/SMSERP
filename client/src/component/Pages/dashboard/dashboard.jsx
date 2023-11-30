import { useLocation } from 'react-router-dom';
import logo from '../../../assets/demoLogo.png';
import { useEffect, useState } from 'react';
import Card from './cards';

const DashBoard = (props) => {
  // const navigate = useNavigate();
  const [time, setTime] = useState('');
  const location = useLocation();
  console.log(location.state.name);

  //function to greet user according to time.
  useEffect(() => {
    function greeting() {
      const date = new Date();
      const getHours = date.getHours();
      let greet;
      // console.log(getHours)
      if (getHours < 12) greet = 'morning';
      else if (getHours >= 12 && getHours <= 17) greet = 'Afternoon';
      else if (getHours >= 17 && getHours <= 24) greet = 'Evening';
      return greet;
    }
    //call the above function greeting() and store in a variable date,
    //state value od date into state.
    const date = greeting();
    setTime(date);
  }, []);

//  function addTeacher () {
//   navigate("/addteacher")
//  }
  return (
    <>
      <nav className="container-fluid navbar navbar-expang-lg bg-body-tertiary space-between ">
        {/* <div classNameName="container"> */}
        <a className="navbar-brand" href="/dashboard">
          <img
            src={logo}
            alt="school logo"
            style={{ width: '35px', height: '35px' }}
          />
          Welcome back {location.state.name.toUpperCase()}
        </a>
        <div className="h5 text-success mx-4 ">Good {time}</div>

        {/* </div> */}
      </nav>
     <div className='row container-fluid'>
     <ul className="nav nav-fill flex-column col-2 align-items-start bg-danger">
        <li className='nav-item'><a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a></li>
        <li className='nav-item'> <a className="nav-link active" aria-current="page" href='/addteacher'>Add Teacher</a></li>
        <li className='nav-item'> <a className="nav-link active" aria-current="page" href="/add_student">Add students</a></li>
        <li className='nav-item'> <a className="nav-link active" aria-current="page" href="/dashboard">Add Admin</a></li>
        <li className='nav-item'> <a className="nav-link active" aria-current="page" href="/dashboard">Add Notice</a></li>
        <li className='nav-item'> <a className="nav-link active" aria-current="page" href="/dashboard">Logout</a></li>        
      </ul>
      <div className='col-10 bg-info '>
        This is body of SMS.
        <Card />
      </div>
     </div>
    </>
  );
};
export default DashBoard;
