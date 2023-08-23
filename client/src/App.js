import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecordList from './component/record';
import Edit from './component/edit';
import Create from './component/create';
import Addstd from './component/Pages/students/Addstd';
import Homepage from './component/Pages/homepage';
import Login from './component/Pages/Login/Login';
import Register from './component/Pages/Login/Registe';
import DashBoard from './component/Pages/dashboard/dashboard';
import ErrorPage from './component/Pages/Error/Error404';
function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/details" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/createstd" element={<Addstd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path= '/dashboard' element = {<DashBoard />} />
        <Route path='/error' element={<ErrorPage />} />
      </Routes>
  );
}

export default App;
