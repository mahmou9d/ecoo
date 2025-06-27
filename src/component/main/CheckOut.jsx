import { Link, useNavigate } from "react-router-dom";
import About from "../../component/about/About";
import Footer from "../../component/footer/Footer";
import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../header/firebase";
import { LinearProgress, Rating } from "@mui/material";
import { useForm } from "@formspree/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// @ts-ignore
// import { DotLottieReact } from '@lottiefiles/react-lottie-player';
const CheckOut = () => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState(null);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);

  const [state, handleSubmit] = useForm("xjkrwajl");
  const nav = useNavigate();
  useEffect(() => {
    if (cart.length > 0) {
      setPrice(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }
  });
  const increaseQuantity = (title) => {
    const updatedCart = cart.map((item) =>
      item.title === title ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (title) => {
    const updatedCart = cart.map((item) =>
      item.title === title && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "[]";
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCart = localStorage.getItem("cart") || "[]";
    console.log(storedCart, "vvvvvvvvvvvvvvvv");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setLoading(false);
  }, []);
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isGmail =
        user.email.endsWith("@gmail.com") ||
        user.email.endsWith("@googlemail.com");
      const isVerified = user.emailVerified;
      if (isGmail && isVerified) {
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else if (!isVerified) {
        alert("هذا الحساب لم يتم التحقق من البريد الإلكتروني الخاص به.");
      } else {
        alert("يجب استخدام بريد Gmail.");
      }
    } catch (error) {
      alert("حدث خطأ أثناء تسجيل الدخول.");
      console.error(error);
    }
  };
  console.log(user);
  const handleRemove = (Remove) => {
    // const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.title !== Remove);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  const [loading, setLoading] = useState(true);
  if (state.succeeded) {
    const time = setTimeout(() => {
      nav("/");
      return () => clearTimeout(time);
    }, 5000);

    return (
      <div
        style={{
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Link
          style={{
            marginLeft: "85%",
            marginTop: "5%",
            textDecoration: "none",
            color: "red",
          }}
          to="/"
        >
          Close
        </Link>

        <div
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Submited</p>
          <DotLottieReact
            style={{ marginTop: "30px" }}
            src="https://lottie.host/9e4f9d0a-8440-4ce4-88dc-678e06504286/7Yt6FhDApX.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* header */}
      <div>
        <div
          className="header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <img
              className="logo"
              src="/Make-6-7-2025.jpg"
              alt=""
              style={{ width: "250px" }}
            />
          </Link>
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexGrow: "1",
              alignItems: "center",
            }}
          >
            <RiSearch2Line style={{ fontSize: "32px" }} />
            <Link style={{ width: "90%" }} to={"/Search"}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                style={{
                  width: "89%",
                  padding: "12px",
                  fontSize: "20px",
                  outline: "none",
                  borderRadius: "50px",
                  border: "0.1px solid #838300",
                }}
              />
            </Link>
          </div>
          <div
            style={{
              width: "150px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {user ? (
              <img
                style={{ width: "50px", borderRadius: "50px" }}
                src={user.photo}
                alt="User"
              />
            ) : (
              <Link onClick={handleGoogleLogin} to={""}>
                <RxPerson />
              </Link>
            )}
            <span style={{ position: "relative" }}>
              <LiaShoppingCartSolid
                style={{ fontSize: "35px", marginLeft: "25px" }}
              />

              <span
                style={{
                  minWidth: "20px",
                  textAlign: "center",
                  backgroundColor: "",
                  padding: "2.5px",
                  position: "absolute",
                  top: "-5px",
                  right: "-12px",
                  fontSize: "17px",
                  lineHeight: "1",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                {cart?.length}
              </span>
            </span>
          </div>
        </div>
        <hr className="hrheader" />
      </div>
      {/* header */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",flexDirection:"column",alignItems:"center" }}
      >

        {loading ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "50px",
                fontSize: "32px",
              }}
            >
              Loading...
            </div>
            <LinearProgress
              sx={{
                width: "100%",
                height: "10px",
                backgroundColor: "white",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "yellow",
                },
              }}
            />
          </>
        ) : Array.isArray(cart) && cart.length > 0 ? (
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>

{                    cart.map((item) => {
            return (
              <div
                className="product"
                key={item.title}
                style={{ width: "20%", margin: "20px" }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{ width: "100%", height: "200px" }}
                />
                <p
                  className="rating"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={item.rating}
                    precision={0.5}
                    readOnly
                  />
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    className="productTitle"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      fontSize: "18px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="price"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      fontSize: "32px",
                      color: "#9c9c72",
                    }}
                  >
                    {item.price}$
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      increaseQuantity(item.title);
                    }}
                    style={{
                      width: "70px",
                      height: "35px",
                      background: "yellow",
                      fontSize: "15px",
                      border: "none",
                      borderRadius: "15px",
                    }}
                  >
                    +
                  </button>
                  <p style={{ fontSize: "18px" }}>{item.quantity}</p>
                  <button
                    onClick={() => {
                      decreaseQuantity(item.title);
                    }}
                    style={{
                      width: "70px",
                      height: "35px",
                      background: "yellow",
                      fontSize: "15px",
                      border: "none",
                      borderRadius: "15px",
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => {
                    handleRemove(item.title);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "10px",
                    background: "#ff0000b0",
                    height: "12%",
                    borderRadius: "50px",
                    width: "92%",
                    border: "none",
                    fontSize: "24px",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: "32px",
              height: "27vh",
              alignItems: "center",
            }}
          >
            Not Found
          </div>
        )}
        {cart.length > 0 ? (
          <button
            onClick={() => {
              setOpen(true);
            }}
            style={{
              width: "115px",
              height: "50px",
              background: "yellow",
              fontSize: "15px",
              border: "none",
              borderRadius: "15px",
              marginTop: "10%",
            }}
          >
            Check Out
          </button>
        ) : null}

        {open && (
          <>
          {/* <form
            onSubmit={handleSubmit}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
              zIndex: 9999,
              width: "500px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => {
                setOpen(false);
              }}
              style={{
                border: "none",
                background: "none",
                marginRight: "-467px",
                fontSize: "18px",
              }}
            >
              close
            </button>
            <label style={{ margin: "10px", fontSize: "16px" }} htmlFor="">
              Your Name
            </label>
            <input
              required
              style={{
                margin: "10px",
                fontSize: "16px",
                width: "300px",
                height: "30px",
                padding: "10px",
                border: "1px solid yellow",
                outline: "none",
              }}
              placeholder="Name"
              type="name"
              id="name"
              name="name"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <label style={{ margin: "10px", fontSize: "16px" }} htmlFor="">
              Phone Number
            </label>
            <input
              required
              style={{
                margin: "10x",
                fontSize: "16px",
                width: "300px",
                height: "30px",
                padding: "10px",
                border: "1px solid yellow",
                outline: "none",
              }}
              placeholder="Phone Number"
              type="number"
              id="number"
              name="number"
            />
            <ValidationError
              prefix="Number"
              field="number"
              errors={state.errors}
            />
            <label style={{ margin: "10px", fontSize: "16px" }} htmlFor="">
              Address
            </label>

            <input
              required
              style={{
                margin: "10px",
                fontSize: "16px",
                width: "300px",
                height: "30px",
                padding: "10px",
                border: "1px solid yellow",
                outline: "none",
              }}
              placeholder="Address"
              type="address"
              id="address"
              name="address"
            />
            <ValidationError
              prefix="Address"
              field="address"
              errors={state.errors}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "65%",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  height: "50px",
                  justifyContent: "space-between",
                  width: "33%",
                  background: "yellow",
                  border: "none",
                  borderRadius: "15px",
                  alignItems: "center",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <span
                  style={{ paddingRight: "10px", borderRight: "3px solid" }}
                >
                  Total
                </span>
                {price}
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                style={{
                  width: "130px",
                  height: "50px",
                  background: "yellow",
                  fontSize: "15px",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                Submit
              </button>
            </div>
          </form>
<form action="https://formspree.io/f/xjkrwajl" method="POST">
      {cart.map((product, index) => {
         return (
          <>
                  <input
          type="hidden"
          name={`product_${index + 1}`}
          value={product.title}
          key={index}
        />
          <ValidationError
              prefix="Title"
              field="title"
              errors={state.errors}
            />
          </>

        )
      })}
      <button type="submit">إرسال</button>
    </form> */}
          <form
  onSubmit={handleSubmit}
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    zIndex: 9999,
    width: "500px",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // overflowY: "scroll"
  }}
>
  <button
    onClick={() => {
      setOpen(false);
    }}
    style={{
      border: "none",
      background: "none",
      marginRight: "-467px",
      fontSize: "18px",
    }}
  >
    close
  </button>


  <label style={{ margin: "10px", fontSize: "16px" }} >Your Name</label>
  <input style={{
                margin: "10px",
                fontSize: "16px",
                width: "300px",
                height: "30px",
                padding: "10px",
                border: "1px solid yellow",
                outline: "none",
              }} required name="name" placeholder="Name" />
  <label style={{ margin: "10px", fontSize: "16px" }} >Phone Number</label>
  <input style={{
                margin: "10px",
                fontSize: "16px",
                width: "300px",
                height: "30px",
                padding: "10px",
                border: "1px solid yellow",
                outline: "none",
              }} required name="number" placeholder="Phone Number" />
  <label style={{ margin: "10px", fontSize: "16px" }} >Address</label>
  <input style={{
                margin: "10px",
                fontSize: "16px",
                width: "300px",
                height: "30px",
                padding: "10px",
                border: "1px solid yellow",
                outline: "none",
              }} required name="address" placeholder="Address" />

  <input type="hidden" name="total" value={price} />

  {cart.map((item, index) => (
    <div key={index}>
      <input type="hidden" name={`product_${index + 1}`} value={`${item.title} x ${item.quantity} price ${item.price * item.quantity}`} />
    </div>
  ))}

  <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "65%",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  height: "50px",
                  justifyContent: "space-between",
                  width: "33%",
                  background: "yellow",
                  border: "none",
                  borderRadius: "15px",
                  alignItems: "center",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <span
                  style={{ paddingRight: "10px", borderRight: "3px solid" }}
                >
                  Total
                </span>
                {price}
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                style={{
                  width: "130px",
                  height: "50px",
                  background: "yellow",
                  fontSize: "15px",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                Submit
              </button>
            </div>
</form>
          </>
          
        )}
      </div>

      <About />
      <Footer />
    </div>
  );
};

export default CheckOut;
