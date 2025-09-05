import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { LinearProgress, Pagination, Rating, Stack } from "@mui/material";
import axios from "axios";
// import Between from "./Between";
import About from "../../component/about/About";
import Footer from "../../component/footer/Footer";

import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { MdOutlineShoppingCart } from "react-icons/md";
import Product from "./Product";
import { CartContext } from "../../_context/CartContext";
import Header from "../../component/header/Header";


const images = ["/shop2.webp", "/shop.webp", "/shop3.webp"];
// @ts-ignore
const Home = () => {
  const [data, setData] = useState([]);
  const [filter1, setFilter1] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All Item");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filter1.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filter1.slice(startIndex, startIndex + itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // /public
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

const { carts, setCarts } = useContext(CartContext);
  const addToCart = (product) => {
    const exists = carts.find((item) => item.title === product.title);
    if (!exists) {
      setCarts([...carts, product]);
    }
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carts));
  }, [carts]);

  const [active, setActive] = useState(1);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };
  useEffect(() => {
    if (data?.length) {
      const result =
        categoryFilter === "All Item"
          ? data
          : data.filter((e) => e.category === categoryFilter);
      setFilter1(result);
      setCurrentPage(0);
    }
  }, [categoryFilter, data]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            margin: "50px",
            fontSize: "32px",
            paddingTop: "20px",
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
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Header />
        <div
          style={{
            position: "relative",
            width: "100%",
            margin: "0 auto",
            height: "500px",
          }}
        >
          <img
            src={images[current]}
            style={{ width: "100%", height: "500px", borderRadius: "10px" }}
            alt={`Slide ${current}`}
            loading="lazy"
          />
          <h1
            style={{
              position: "absolute",
              left: "6%",
              top: "17%",
              fontSize: "80px",
              color: "yellow",
            }}
          >
            sale 50%
          </h1>

          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              background: "none",
              color: "yellow",
              border: "none",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "50px",
            }}
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              background: "none",
              color: "yellow",
              border: "none",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "50px",
            }}
          >
            ›
          </button>

          <Link to="/Search">
            <button className="shopnow">Shop Now</button>
          </Link>
        </div>
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
            width: "100%",
            gap: "10px",
          }}
        >
          <div style={{ width: "100%" }}>
            <p
              onClick={() => {
                setActive(1);
                setCategoryFilter("All Item");
              }}
              className={`p  ${active === 1 ? `active` : null}`}
              style={{
                width: "100%",
                height: "65px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "bold",
                borderTopLeftRadius: "50px",
                borderBottomLeftRadius: "50px",
              }}
            >
              All Item
            </p>
            <div
              style={{
                width: "100%",
                // borderBottom: "2px solid",
                paddingBottom: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                color: "#9c9c72",
              }}
            ></div>
          </div>

          <div style={{ width: "100%" }}>
            <p
              onClick={() => {
                setActive(2);
                setCategoryFilter("men");
              }}
              className={`p  ${active === 2 ? `active` : null}`}
              style={{
                width: "100%",
                height: "65px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              Men
            </p>
            <div
              style={{
                width: "100%",
                // borderBottom: "2px solid",
                paddingBottom: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                color: "#9c9c72",
              }}
            ></div>
          </div>
          <div style={{ width: "100%" }}>
            <p
              onClick={() => {
                setActive(3);
                setCategoryFilter("kids");
              }}
              className={`p  ${active === 3 ? `active` : null}`}
              style={{
                width: "100%",
                height: "65px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              Kids
            </p>
            <div
              style={{
                width: "100%",
                // borderBottom: "2px solid",
                paddingBottom: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                color: "#9c9c72",
              }}
            ></div>
          </div>
          <div style={{ width: "100%" }}>
            <p
              onClick={() => {
                setActive(4);
                setCategoryFilter("shoes");
              }}
              className={`p  ${active === 4 ? `active` : null}`}
              style={{
                width: "100%",
                height: "65px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "bold",
                borderTopRightRadius: "50px",
                borderBottomRightRadius: "50px",
              }}
            >
              Shoes
            </p>
            <div
              style={{
                width: "100%",
                // borderBottom: "2px solid",
                paddingBottom: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                color: "#9c9c72",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div style={{ height: "100px" }}>
        <div style={{ paddingTop: "15px" }}>
          <h1 style={{ textTransform: "capitalize" }}>{categoryFilter}</h1>
          <hr style={{ width: "140px", height: "1px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            {currentItems.map((item) => {
              return (
                <div key={item.price} style={{ marginBottom: "20px" }}>
                  <Product item={item} addToCart={addToCart} />
                </div>
              );
            })}
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            disabledClassName={"disabled"}
          />
        </div>
        <About />
        <Footer />
      </div>
    </>
  );
};

export default Home;
