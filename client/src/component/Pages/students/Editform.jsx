import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// render the component

function Edit({ current, listData, setListData, setUpdate , id }) {
  const nameRef = useRef();
  const ageRef = useRef();
  const sexRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();

  const [editedData, setEditedData] = useState({ ...current });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/user/${id}`);
   
      if(!response.ok) {
        const message = `An error has occour :${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      // console.log(record)
      if(!record) {
        window.alert(`Record with id ${id} not found`);
        navigate('/createstd')
      }
      setEditedData(record);
      // console.log(editedData)
    }
    fetchData();
    return;
  }, [id, navigate]);

  //This method will update the state properties:
  const handleChange = (e) => {
    const { name, value } = e.target;
   setEditedData((prevData) => ({ ...prevData, [name]: value }));
    
  };
  // console.log(editedData)
 

  const handleUpdate = async() => {
    const updatedValue = {
      name: editedData.name,
      age: editedData.age,
      sex: editedData.sex, 
      phone: editedData.phone
    };
// console.log(updatedValue);
 //This will send a post request to update the data in the database:
 await fetch(`http://localhost:5050/user/${id}`, {
    method:"PATCH",
    body: JSON.stringify(updatedValue),
    headers: {
      'Content-Type' : 'application/json'
    },
});
    const newList = listData.map((li, index) =>
      index === current.index ? editedData : li
    );
    setListData(newList);
    console.log(listData)
    setUpdate(-1); // Exit the edit mode
    navigate('/createstd');
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
          <option value="male">Male</option>
          <option value="female">Female</option>
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

export default Edit;