import Container from '@mui/material/Container';
import Home from './component/main/Home';
import { BrowserRouter, Route, Routes } from 'react-router';
import Search from './component/header/Search';
import CheckOut from './component/main/CheckOut';
// import { useState } from 'react';
const App = () => {
  
  return (
    <BrowserRouter>

<div style={{background:"#ffeb3b14",height:"100vh"}}>
      <Container sx={{background:"#fff",height:"100vh"}} maxWidth="lg">

        {/* <Header /> */}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Search" element={<Search/>} />
      <Route path="/CheckOut" element={<CheckOut/>} />
    </Routes>
    </Container>
    </div>
    </BrowserRouter>

  )
}

export default App
     {/* <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} /> */}