import { useState } from 'react';
import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import Edit from './Editform';

const Addstd = () => {
  const [activity, setActivity] = useState({
    name: '',
    age: '',
    sex: '',
    phone: '',
  });

  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  
  //This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/user/`);
      if (!response.ok) {
        const message = `An error occoured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setListData(records);
    }
    getRecords();
    return;
  }, [listData.length]);

  const [update, setUpdate] = useState(-1);
  const [error, showError] = useState('');


  // event handler for input change
  function handleChange(e) {
    const { name, value } = e.target;
    setActivity((prevData) => ({ ...prevData, [name]: value }));
  }

  // Function to add data
  async function addData(e) {
    e.preventDefault();
    const newUser = { ...activity };
    await fetch('http://localhost:5050/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setActivity({ name: '', age: '', sex: '', phone: '' });
    navigate('/createstd');

    // show error when user presses enter without entering all data
    if (Object.values(activity).some((value) => value === '')) {
      alert('Please fill in all fields');
      return;
    }

    const { name, value } = activity; // extracting name and values from activity state
    if (name === 'age' && value < 1) {
      showError('Age must be greater than 1');
      return;
    } else {
      showError('');
      setListData((pre) => {
        const updatedList = [...pre, activity];
        return updatedList;
      });
    }

    setActivity({
      name: '',
      age: '',
      sex: '',
      phone: '',
    });
  }

  // This method will delte a record
  // handles deleteActivity
  async function deleteActivity(id) {
    await fetch(`http://localhost:5050/user/${id}`, {
      method: 'DELETE',
    });

    const afterDelete = listData.filter((data) => data._id !== id);
    console.log(afterDelete);
    setListData(afterDelete);
  }


  // handles removeAll
  async function removeAll() {
    await fetch(`http://localhost:5050/user/`, {
      method: "DELETE"
    });

    const newData =setListData([]);
    return newData;
  }

  // handles edit
  function handleEdit(i) {
    setUpdate(i);
  }

function navigateHome() {
  navigate('/')
}

  // const [select, setSelect]  = useState();
  return (
    <>
      <form className="container d-flex justify-content-center m-5">
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => handleChange(e)}
          value={activity.name}
          name="name"
          // ref={nameRef}
        />
        <input
          type="number"
          placeholder="Enter Age"
          onChange={(e) => handleChange(e)}
          value={activity.age}
          name="age"
          // ref={ageRef}
        />
        <select
          placeholder="Choose Gender"
          onChange={(e) => handleChange(e)}
          value={activity.sex}
          name="sex"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          placeholder="Enter Phone Number"
          onChange={(e) => handleChange(e)}
          value={activity.phone}
          name="phone"
          // ref={ageRef}
        />
        {/* Show Error message when age < 1 */}
        {error && <p className="error">{error}</p>}
        <button type="submit" onClick={addData}>
          Add
        </button>
      </form>
      {/* Show filled Form Data in table */}
      {listData.length !== 0 && (
        <p className="d-flex justify-content-center m-3"> Here is Your List</p>
      )}

      <div className="container m-3 ">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Sex</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((data, index) =>
              update === data._id ? (
                <Edit
                key={index}
            id ={data._id}
                setUpdate={setUpdate}
                  current={{ ...data, index }}
                  listData={listData}
                  setListData={setListData}
                />
              ) : (
                <tr key={index}>
                  <th scope="row">{data.name}</th>
                  <td>{data.age}</td>
                  <td>{data.sex}</td>
                  <td>{data.phone}</td>
                  <td className="d-flex flex-row">
                    <button
                      type="button"
                      className="btn btn-sm m-1 btn-warning"
                      onClick={() => handleEdit(data._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm m-1 btn-danger"
                      onClick={() => deleteActivity(data._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {listData.length !== 0 && (
          <button className="btn btn-md btn-danger m-3" onClick={removeAll}>
            Delete All
          </button>
        )}
        <button className="btn btn-md btn-outline-info" onClick={navigateHome} >
          Home Page
        </button>
      </div>
    </>
  );
};

export default Addstd;