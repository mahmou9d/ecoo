import React from 'react'
import About from '../../component/about/About'
import Footer from '../../component/footer/Footer'
import "../main/Home.css";
import { RxPerson } from "react-icons/rx";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { Link } from "react-router";
import { MdOutlineEmail } from "react-icons/md";
import { PiLockKeyBold } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
const SignUp = () => {
  return (
    <div>
      {/* Header */}
        <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <Link to="/">
                <img className="logo" src="../../../public/Make-6-7-2025.jpg" alt="" style={{width:"250px",}} />
                  
                  </Link>
                <div style={{margin:"20px",display:"flex",justifyContent:"space-between",flexGrow:"1",alignItems:"center"}}>
                  <RiSearch2Line style={{fontSize:"32px"}}/>
                  <Link style={{width:"90%"}} to={"/search"}>
                  <input  type="text" placeholder="Search" style={{width:"89%",padding:"12px",fontSize:"20px",outline:"none",borderRadius:"50px",border:"0.1px solid #838300"}}/>
                </Link>
                </div>
                <div style={{width:"150px",fontSize:"30px",display:"flex"}}>
                <Link to="/login">
                <RxPerson />
                </Link>
                <span style={{position:"relative"}}>
                <LiaShoppingCartSolid style={{fontSize:"35px",marginLeft:"25px"}}/>
                    <span style={{minWidth:"20px",textAlign:"center",backgroundColor:"",padding:"2.5px",position:"absolute",top:"-5px",right:"-12px",fontSize:"17px",lineHeight:"1",borderRadius:"10px",fontWeight:"bold"}}>8</span>
                    </span>
                </div>
            </div>
            <hr className="hrheader" />
        </div>
      {/* Header */}


<div className='image' style={{display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "60vh",
    marginTop: "5%",
    // background: "#ffffb9a3",
    justifyContent: "center",
    borderRadius: "15px"}}>
      <img className='background' src="/public/login.jpg" alt="" />
    <div style={{zIndex:"2",marginLeft:"30%"}}>
      <h1 style={{marginBottom: "4%",
    marginTop: "-16px"
}}>Sign Up</h1>
<div className='input' style={{background:"white",borderRadius:"50px",display:"flex",alignItems:"center",padding:"8px",marginBottom:"15px",border:"1px solid #919100"}}>
<IoPersonSharp style={{paddingLeft:"15px", fontSize: "25px",}}/>
  <input placeholder='Name' type="text" style={{
    height: "6vh",
    marginLeft:"14px",
    fontSize:"18px",
    outline:"none",
    border:"none",
    width:"20vh",
    borderLeft:"3px solid yellow"
    ,paddingLeft:"15px",
            borderBottomRightRadius: "50px",
    borderTopRightRadius: "50px"
    }}/>
</div>

<div className='input' style={{background:"white",borderRadius:"50px",display:"flex",alignItems:"center",padding:"8px",marginBottom:"15px",border:"1px solid #919100"}}>
<MdOutlineEmail style={{paddingLeft:"15px", fontSize: "25px",}}/>
  <input placeholder='Email id' type="text" style={{
    height: "6vh",
    marginLeft:"14px",
    fontSize:"18px",
    outline:"none",
    border:"none",
    width:"20vh",
    borderLeft:"3px solid yellow"
    ,paddingLeft:"15px",
            borderBottomRightRadius: "50px",
    borderTopRightRadius: "50px"
    }}/>
</div>
<div className='input' style={{background:"white",borderRadius:"50px",display:"flex",alignItems:"center",padding:"8px",border:"1px solid #919100"}}>
  <PiLockKeyBold style={{paddingLeft:"15px",fontSize: "25px"}}/>
  <input placeholder='Password' type="text" style={{
    height: "6vh",
    marginLeft:"14px",
    fontSize:"18px",
    outline:"none",
    border:"none",
    width:"20vh",
    borderLeft:"3px solid yellow"
    ,paddingLeft:"15px", 
    borderBottomRightRadius: "50px",
    borderTopRightRadius: "50px"
    }}/>
</div>
{/* <div style={{
    marginTop: "8px"}}>
Lost passeord?
  <Link style={{    paddingLeft: "4px",
    textDecoration: "none",
    outline: "none",
    color: "#78783a",}} to="">Click here!</Link>
</div> */}
<div className='signup' style={{display: "flex ", justifyContent: "space-between", width: "46vh", height: "6vh", marginTop: "20px"}}>
{/* <Link style={{
            width: "40%",
            borderRadius: "50px",
            fontSize: "16px",
            background: "#ffff00a1",
            border: "1px dashed yellow",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }} to="/SignUp">Sign Up</Link> */}
<button style={{width:"40%",
    borderRadius: "50px",
    fontSize: "16px",
    background: "#ffff00a1",
    border: "1px dashed yellow",}}>Login</button>
</div>
    </div>


</div>

      <About/>
      <Footer/>
    </div>
  )
}

export default SignUp
