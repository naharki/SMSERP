import { useState, useRef } from 'react';

const Addstd = () => {
  const [activity, setActivity] = useState({
    name: '',
    age: '',
    sex:'',
    phone:''
  });

  const [listData, setListData] = useState([]);
  const [update, setUpdate] = useState(-1);
  const [error, showError] = useState('');
  
  const nameRef = useRef();
  const ageRef = useRef();
  const sexRef = useRef();
  const phoneRef = useRef(); 


  // event handler for input change
  function handleChange(e) {
    const { name, value } = e.target;
    setActivity((prevData) => ({ ...prevData, [name]: value }));
  }

  // Function to add data
  function addData(e) {
    e.preventDefault();
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
      sex:'',
      phone:''
    });

    
  }

  // handles deleteActivity
  function deleteActivity(index) {
    const afterDelete = listData.filter((data, i) => i !== index);
    setListData(afterDelete);
  }

  // handles removeAll
  function removeAll() {
    setListData([]);
  }

  // handles edit
  function handleEdit(i) {
    setUpdate(i);
  }

  // render the component
  function Edit({ current, listData, setListData }) {
    const [editedData, setEditedData] = useState({ ...current });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = () => {
      const newList = listData.map((li, index) =>
        index === current.index? editedData : li
      );
      setListData(newList);
      setUpdate(-1); // Exit the edit mode
    };

    return (
      <tr>
        <td>
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
            ref={nameRef}
          />
        </td>
        <td>
          <input
            type="text"
            name="age"
            value={editedData.age}
            onChange={handleChange}
            ref={ageRef}
          />
        </td>
        <td>
        <select
          placeholder="Choose Gender"
          onChange={handleChange}
          value={editedData.sex}
          ref={sexRef}
          name="sex"
        >
          <option value="">Select Gender</option>
          <option value='male' >Male</option>
          <option value='female'>Female</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            name="phone"
            value={editedData.phone}
            onChange={handleChange}
            ref={phoneRef}
          />
        </td>
        <td>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </td>
      </tr>
    );
  }

  // const [select, setSelect]  = useState();
  return (
    <>
      <form className="container d-flex justify-content-center m-5" >
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
          <option value='male' >Male</option>
          <option value='female'>Female</option>
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
      {listData.length !== 0 && <p className="d-flex justify-content-center m-3"> Here is Your List</p>}

      <div className="container m-3 ">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope='col'>Sex</th>
              <th scope='col'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((data, index) =>
              update === index ? (
                <Edit current={{ ...data, index }} listData={listData} setListData={setListData} />
              ) : (
                <tr key={index}>
                  <th scope='row'>{data.name}</th>
                  <td>{data.age}</td>
                  <td>{data.sex}</td>
                  <td>{data.phone}</td>
                  <td className="d-flex flex-row">
                    <button
                      type="button"
                      className="btn btn-sm m-1 btn-warning"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    
                    <button
                      className="btn btn-sm m-1 btn-danger"
                      onClick={() => deleteActivity(index)}
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
          <button className="btn btn-md btn-danger" onClick={removeAll}>
            Delete All
          </button>
        )}
      </div>
    </>
  );
};

export default Addstd;
