import { useState, useRef } from 'react';
//  import {useNavigate} from 'react-router'

// const navigate = useNavigate();

// render the component

function Edit({ current, listData, setListData, setUpdate }) {
  const nameRef = useRef();
  const ageRef = useRef();
  const sexRef = useRef();
  const phoneRef = useRef();
  const [editedData, setEditedData] = useState({ ...current });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    const newList = listData.map((li, index) =>
      index === current.index ? editedData : li
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
