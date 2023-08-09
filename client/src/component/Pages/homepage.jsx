import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  function navigateStudent() {
    navigate('/createstd');
  }

  function navigateTeacher() {
    navigate('/create');
  }

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-6 my-5 " >
          <h2 className="text-center ">Who are You?</h2>
          <div className="d-flex btn btn-md justify-content-center flex-column align-items-center">
            <button
              className="btn btn-outline-success btn-lg mx-2 mb-2 outline-0"
              onClick={navigateStudent}
            >
              Students
            </button>
            <button
              className="btn btn-outline-info btn-lg mx-2"
              onClick={navigateTeacher}
            >
              Teachers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
