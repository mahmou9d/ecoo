/* eslint-disable no-unused-vars */

import { Link, useNavigate } from "react-router-dom";
import About from "../../component/about/About";
import Footer from "../../component/footer/Footer";
import { useContext, useEffect, useState } from "react";
import { useForm } from "@formspree/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CartContext } from "../../_context/CartContext";
import Productcart from "./Productcart";
import Header from "../../component/header/Header";

const CheckOut = () => {
  const { carts, setCarts } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const [state, handleSubmit] = useForm("xjkrwajl");
  const nav = useNavigate();
  useEffect(() => {
    if (cart.length > 0) {
      setPrice(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    } else {
      setPrice(0);
    }
  }, [cart]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart") || "[]";
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    if (state.succeeded) {
      localStorage.removeItem("cart");
      setCart([]);
      setCarts([])
      setOpen(false);
      const time = setTimeout(() => {
        nav("/");
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [state.succeeded, nav, setCarts]);

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

  const handleRemove = (Remove) => {
    const updatedCart = cart.filter((item) => item.title !== Remove);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div>
      {state.succeeded ? (
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
              style={{ marginTop: "30px", width: "350px", height: "350px" }}
              src="https://lottie.host/9e4f9d0a-8440-4ce4-88dc-678e06504286/7Yt6FhDApX.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Productcart
            loading={loading}
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            setOpen={setOpen}
            handleRemove={handleRemove}
            handleSubmit={handleSubmit}
            price={price}
            state={state}
            open={open}
          />
          <About />
          <Footer />
        </>
      )}
    </div>
  );
};

export default CheckOut;
