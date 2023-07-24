import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/navBar";
import RecordList from "./component/record";
import Edit from "./component/edit";
import Create from "./component/create";
 
// import Addstd from './component/Addstd';
// import Login from './component/Login';
function App() {
  return (
   <div>
    {/* <Login /> */}
    {/* <Addstd /> */}
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   
   </div>
  )
}

export default App