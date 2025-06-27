// import React, { useEffect, useState } from 'react'
// import './Home.css'
// import { Link } from 'react-router-dom';



// const images = [
//   "/public/pexels-olly-845434.jpg",
//   "/public/glamorous-girl-with-shopping-bags-studio.jpg",
//   "/public/domino-studio-164_6wVEHfI-unsplash.jpg"
// ];
// const Between = () => {
//   // fetch('data.json').then(res => res.json).then(data=>console.log(data))
//         const [active,setActive]=useState(1)
//     const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const prevSlide = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };
//   return (
// <div style={{marginTop:"20px"}}>
//     {/* <div style={{height:"50vh"}}>
//     <img style={{width:"100%",height:"100%"}} src="../../../public/9704568.jpg" alt="" />
        
//     </div> */}
//     <div style={{ position: 'relative', width: '100%',  margin: '0 auto' ,height:"500px"}}>
//       <img
//         src={images[current]}
//         style={{ width: '100%', height: '500px', borderRadius: '10px' }}
//         alt={`Slide ${current}`}
        
//       />
//       <h1 style={{position:"absolute",left:"6%",top:"17%",fontSize:"80px",color:"yellow"}}>sale 50%</h1>
      
//       <button
//         onClick={prevSlide}
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '10px',
//           transform: 'translateY(-50%)',
//           background: 'none',
//           color: 'yellow',
//           border: 'none',
//           padding: '10px',
//           borderRadius: '50%',
//           cursor: 'pointer',
//           fontSize:"50px"
//         }}
//       >
//         ‹
//       </button>

      
//       <button
//         onClick={nextSlide}
//         style={{
//           position: 'absolute',
//           top: '50%',
//           right: '10px',
//           transform: 'translateY(-50%)',
//           background: 'none',
//           color: 'yellow',
//           border: 'none',
//           padding: '10px',
//           borderRadius: '50%',
//           cursor: 'pointer',
//           fontSize:"50px"
//         }}
//       >
//         ›
//       </button>
//       <Link to="/Search">
//       <button className='shopnow'>Shop Now</button>
//       </Link>
//     </div>
//     <div className='' style={{display:"flex",justifyContent:"space-between",paddingTop:"20px",width:"100%"}}>
//           <div style={{width:"100%",borderRight:"1px solid #000000"}}>
//               <p onClick={()=>setActive(1)} className={`p  ${active===1?`active`:null}`} style={{width:"100%",background:"#f1f173",height:"65px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",fontWeight:"bold",borderTopLeftRadius:"50px",borderBottomLeftRadius:"50px"}}>All Item</p>
//               <div style={{width:"100%",borderBottom:"2px solid",paddingBottom:"7px",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px", color:"#9c9c72"}}></div>
//           </div>
        
//           <div style={{width:"100%",borderRight:"1px solid #000000"}}>
//               <p onClick={()=>setActive(2)} className={`p  ${active===2?`active`:null}`}  style={{width:"100%",background:"#f1f173",height:"65px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",fontWeight:"bold"}}>Men</p>
//               <div style={{width:"100%",borderBottom:"2px solid",paddingBottom:"7px",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px", color:"#9c9c72"}}></div>
//           </div>
//           <div style={{width:"100%",borderRight:"1px solid #000000"}}>
//               <p onClick={()=>setActive(3)} className={`p  ${active===3?`active`:null}`}  style={{width:"100%",background:"#f1f173",height:"65px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",fontWeight:"bold"}}>Kids</p>
//               <div style={{width:"100%",borderBottom:"2px solid",paddingBottom:"7px",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px", color:"#9c9c72"}}></div>
//           </div>
//           <div style={{width:"100%"}}>
//               <p onClick={()=>setActive(4)} className={`p  ${active===4?`active`:null}`}  style={{width:"100%",background:"#f1f173",height:"65px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",fontWeight:"bold",borderTopRightRadius:"50px",borderBottomRightRadius:"50px"}}>Shoes</p>
//               <div style={{width:"100%",borderBottom:"2px solid",paddingBottom:"7px",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px", color:"#9c9c72"}}></div>
//           </div>
//     </div>
//         <hr/>
        
//     </div>
//   )
// }

// export default Between
