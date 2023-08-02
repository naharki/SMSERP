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
    <>
      <div className=" mx-auto d-flex flex-column  " style={{ width: '250px' }}>
        <h2 className="p-4">Who are You?</h2>
        <button
          className="btn btn-outline-success btn-lg"
          onClick={navigateStudent}
        >
          Students
        </button>
        <button
          className="btn btn-outline-info btn-lg mt-3"
          onClick={navigateTeacher}
        >
          Teachers
        </button>
      </div>
    </>
  );
};

export default Homepage;
