import React from 'react'
import { Route, Routes } from "react-router-dom";
// import Navbar from "./component/navBar";
import RecordList from "./component/record";
import Edit from "./component/edit";
import Create from "./component/create";
 
import Addstd from './component/Pages/students/Addstd';
import Homepage from './component/Pages/homepage';
// import Login from './component/Login';
function App() {
  return (
   <div>
    {/* <Login /> */}
  
     {/* <Navbar /> */}
     <Routes>
      <Route exact path="/" element={<Homepage />} /> 
       <Route  path="/details" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path='/createstd' element={ <Addstd /> } />
     </Routes>
   
   </div>
  )
}

export default App