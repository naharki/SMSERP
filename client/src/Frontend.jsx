import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    class: '',
    age: '',
  });
  const [listData, setListData] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target; 
    setFormData((prevData) => ({...prevData, [name]: value}
    ));
    console.log(setFormData)
  }

  function addData(e) {
    e.preventDefault();
    //Checks if any value in the formData object is empty.
    if (Object.values(formData).some((value) => value === '')) {
      alert('Please fill in all fields.');
      return; // Exits the function early if any field is empty.
    }

    const newData = {...formData, roll: listData.length + 1,
    };

    setListData((prevListData) => [...prevListData, newData]);
    setFormData({
      name: '',
      gender: '',
      class: '',
      age: '',
    });
  }

  function deleteActivity(index) {
    setListData((prevListData) =>
      prevListData.filter((data, i) => i !== index)
    );
  }

  function removeAll() {
    setListData([]);
  }


  function handleUpdate(e){
    e.preventDefault();
    setUpdate(-1);
    }

  return (
    <div className="container p-5">
      <form onSubmit={handleUpdate} className="d-flex flex-row flex-wrap">
        <input
          className="m-1"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          name="name"
        />
        <input
          className="m-1"
          type="text"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Enter Gender"
          name="gender"
        />
        <input
          className="m-1"
          type="text"
          value={formData.class}
          onChange={handleChange}
          placeholder="Enter Class"
          name="class"
        />
        <input
          className="m-1"
          type="text"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter Age"
          name="age"
        />
        <button className="btn btn-primary btn-sm" onClick={addData}>
          Add
        </button>
      </form > 

      <div>
        <div className="container m-2">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Roll.</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Class</th>
                <th scope="col">Age</th>
                <th scope="col">Menu</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((data, index) => (
                //if update value === data.roll then show <Edit /> component else as usual

                update === data.roll ? <Edit  current={data} lists= {listData} setList={setFormData}d/>:
                <tr key={index}>
                  <th scope="row">{data.roll}</th>
                  <td>{data.name}</td>
                  <td>{data.gender}</td>
                  <td>{data.class}</td>
                  <td>{data.age}</td>
                  <td className="d-flex flex-row">
                    <button type='button' className="btn btn-sm m-1 btn-warning" onClick={()=>handleEdit(data.roll)}>
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
              ))}
            </tbody>
          </table>
          {listData.length > 0 && (
            <button className="btn btn-md btn-danger" onClick={removeAll}>
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  );

  function handleEdit (roll) {
    setUpdate(roll);
      }

}



function Edit ({current, lists, setList }) {
  function handleInput (e) {
    const newList = lists.map((li) => (
      li.roll === current.roll ? {...li, [e.target.name]: e.target.value} : li
    ))
    setList(newList)
  }
return(
  <tr>
      <td><input type="text" name='name' onChange={handleInput} value={current.name} /></td>
       <td><input type="text" name='gender' onChange={handleInput} value={current.gender}/></td>
       <td><input type="text" name='class' onChange={handleInput} value={current.class}/></td>
       <td><input type="text" name='age' onChange={handleInput} value={current.age}/></td>
       <td><input type="text" name='roll' onChange={handleInput} value={current.roll}/></td>
      <td><button type='submit'>Update</button></td>
  </tr>
)
}

export default App;
