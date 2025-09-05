import About from "../about/About";
import Footer from "../footer/Footer";
import "../main/Home.css";
import { useContext, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import Product from "../main/Product";
import { CartContext } from "../../_context/CartContext";

// @ts-ignore
const Search = () => {
  const { carts, setCarts } = useContext(CartContext);
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
      setCarts([...cart, product]);
    }
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  console.log(cart);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!search || search.trim() === "") {
      setSearchProduct(data);
    } else {
      const result = data?.filter((e) =>
        e.title.toUpperCase().includes(search.toUpperCase())
      );
      setSearchProduct(result);
    }
  }, [search, data]);
  console.log(search);
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
              alt="Logo"
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
            <Link style={{ width: "90%" }} to={`/Search?query=${search}`}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                value={search}
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
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  padding: "2.5px 5px",
                  position: "absolute",
                  top: "-5px",
                  right: "-12px",
                  fontSize: "14px",
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
                return <Product item={item} addToCart={addToCart} />;
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
