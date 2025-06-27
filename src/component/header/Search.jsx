import About from "../about/About";
import Footer from "../footer/Footer";
import Header from "./Header";
import "../main/Home.css";
import { useEffect, useState } from "react";
import { LinearProgress, Pagination, Rating, Stack } from "@mui/material";
import axios from "axios";
import { RxPerson } from "react-icons/rx";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../header/firebase";

// @ts-ignore
const Search = () => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  useEffect(() => {
    axios
      .get("/data.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const addToCart = (product) => {
    const exists = cart.find((item) => item.title === product.title);
    if (!exists) {
      setCart([...cart, product]);
      //   setCheck([...cart, product])
    }
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  console.log(cart);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const result =
      searchProduct.length === 0
        ? data
        : data?.filter((e) => e.category.toLowerCase().startsWith(search));
    setSearchProduct(result);
  }, [search, data]);
  const [user, setUser] = useState(null);
  console.log(search);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
  if (loading)
    return (
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
    );
  if (error) return <div>Error: {error}</div>;

  // if (searchProduct.length === 0) {
  //     return <div>Not Found</div>
  // }
  return (
    <div>
      {/* Header */}
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
              <Link to="/CheckOut">
                <LiaShoppingCartSolid
                  style={{ fontSize: "35px", marginLeft: "25px" }}
                />
              </Link>
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
      {/* Header */}

      <div style={{ height: "100px" }}>
        <div style={{ paddingTop: "15px" }}>
          <h1>All Item</h1>
          <hr style={{ width: "140px", height: "1px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1px",
              marginTop: "10px",
            }}
          >
            {searchProduct.length === 0 ? (
              <div>Not Found</div>
            ) : (
              searchProduct.map((item) => {
                return (
                  <div
                    className="product"
                    key={item.title}
                    style={{ width: "20%", margin: "20px" }}
                    onClick={() => addToCart(item)}
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
                    <button
                      style={{
                        background: "yellow",
                        width: "100px",
                        height: "35px",
                        marginTop: "5px",
                        border: "none",
                        borderRadius: "50px",
                        fontSize: "15px",
                      }}
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                );
              })
            )}
          </div>
          {/* <Stack
                spacing={2}
                sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
                marginTop: "85px",
                }}
            >
                <Pagination count={10} />
            </Stack> */}
        </div>
        <About />
        <Footer />
      </div>
    </div>
  );
};

export default Search;
