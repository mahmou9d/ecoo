import "./Home.css";
import { useEffect, useState } from "react";
import { LinearProgress, Pagination, Rating, Stack } from "@mui/material";
import axios from "axios";
// import Between from "./Between";
import About from "../../component/about/About";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const images = [
  
  "/shop2.jpg",
  "/shop.jpg",
  "/shop3.jpg",
];
// @ts-ignore
const Home = () => {
  const [data, setData] = useState([]);
  const [filter1, setFilter1] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
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
        categoryFilter === "all"
          ? data
          : data.filter((e) => e.category === categoryFilter);
      setFilter1(result);
      setCurrentPage(0)
    }
  }, [categoryFilter, data]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    <>
      <Header />
      {/* <Between /> */}
      {/* Between */}
      <div style={{ marginTop: "20px" }}>
        {/* <div style={{height:"50vh"}}>
    <img style={{width:"100%",height:"100%"}} src="../../../public/9704568.jpg" alt="" />
        
    </div> */}
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
        {/*  */}
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
            width: "100%",
          }}
        >
          <div style={{ width: "100%", borderRight: "1px solid #000000" }}>
            <p
              onClick={() => {
                setActive(1);
                setCategoryFilter("all");
              }}
              className={`p  ${active === 1 ? `active` : null}`}
              style={{
                width: "100%",
                background: "#f1f173",
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
                borderBottom: "2px solid",
                paddingBottom: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                color: "#9c9c72",
              }}
            ></div>
          </div>

          <div style={{ width: "100%", borderRight: "1px solid #000000" }}>
            <p
              onClick={() => {
                setActive(2);
                setCategoryFilter("men");
              }}
              className={`p  ${active === 2 ? `active` : null}`}
              style={{
                width: "100%",
                background: "#f1f173",
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
                borderBottom: "2px solid",
                paddingBottom: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                color: "#9c9c72",
              }}
            ></div>
          </div>
          <div style={{ width: "100%", borderRight: "1px solid #000000" }}>
            <p
              onClick={() => {
                setActive(3);
                setCategoryFilter("kids");
              }}
              className={`p  ${active === 3 ? `active` : null}`}
              style={{
                width: "100%",
                background: "#f1f173",
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
                borderBottom: "2px solid",
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
                background: "#f1f173",
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
                borderBottom: "2px solid",
                paddingBottom: "7px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                color: "#9c9c72",
              }}
            ></div>
          </div>
        </div>
        <hr />
      </div>
      {/* Between */}

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
            {currentItems.map((item) => {
              return (
                <div
                  className="product"
                  key={item.title}
                  style={{ width: "20%", margin: "20px", height: "45%" }}
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
                      className="rating"
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
            })}
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
