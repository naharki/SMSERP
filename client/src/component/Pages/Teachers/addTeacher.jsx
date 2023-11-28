import { useState } from 'react';
import axios from 'axios';

const AddTeacher = () => {
  const [activity, setActivity] = useState({
    name: '',
    age: '',
    emergency_number: '',
    email: '',
    gender: '',
    subject: '',
    birthdate: '',
    address: '',
    education: '',
    password: '',
    confirm_password: '',
    other_detail: '',
  });

  //states
  const [message, showMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setActivity((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const new_teacher = { ...activity };
    try {
      const result = await axios.post(
        'http://localhost:5050/api/user/add_teacher',
        new_teacher
      );
      // console.log(result);
      // console.log(result.data.message);
      if (result.status === 200) {
        showMessage(result.data.message);
      }
    } catch (error) {
      // console.log(error.response.data.message);
      showMessage(error.response.data.message);
    }
  }

  // console.log(activity)
  return (
    <div className="container-fluid bg-info py-5 ">
      <div className="container rounded bg-light row-justify-content-center p-4  ">
        {/* <div className="row-justify-content-center mt-5 mx-3 mb-5  "> */}
        <div className="col-md-8  mx-auto vertical-scrollable">
          <form action="" className="col">
            <div className="row mb-2">
              <h3 className="text-center"> Add Teacher </h3>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label ">
                  Name
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="Full Name"
                  type="text"
                  name="name"
                  value={activity.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Age
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="Age"
                  type="text"
                  name="age"
                  value={activity.age}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Emergency Number
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="98********"
                  type="text"
                  name="emergency_number"
                  value={activity.emergency_number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Email
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="abc@gmail.com"
                  type="email"
                  name="email"
                  value={activity.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Gender
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="Choose Gender"
                  type="text"
                  name="gender"
                  value={activity.gender}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Subject
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="Select Subject"
                  type="text"
                  name="subject"
                  value={activity.subject}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Birthdate
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="Day-Month-Year"
                  type="text"
                  name="birthdate"
                  value={activity.birthdate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Address
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="Address"
                  type="text"
                  name="address"
                  value={activity.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Education
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="E.g: Bsc.CSIT"
                  type="text"
                  name="education"
                  value={activity.education}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Other Details
                </label>
              </div>
              <div className="col-md-8">
                <textarea
                  className="form-control"
                  placeholder="Extra Info"
                  type="text"
                  name="other_detail"
                  value={activity.other_detail}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Password
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  value={activity.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="" className="form-label">
                  Confirm Password
                </label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  name="confirm_password"
                  value={activity.confirm_password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {message === 'Registration Success' ? (
              <p className="text-success text-center">{message}</p>
            ) : (
              <p className="text-danger text-center">{message}</p>
            )}
            <button
              className="btn btn-md btn-outline-info d-block mx-auto "
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </button>
          </form>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default AddTeacher;
