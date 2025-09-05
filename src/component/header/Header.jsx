import { RxPerson } from "react-icons/rx";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import "../main/Home.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../_context/CartContext";

const Header = () => {
  const { carts, setCarts } = useContext(CartContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart") || "[]";
    setCarts(JSON.parse(storedCart));

    const handleStorageChange = () => {
      const updatedCart = localStorage.getItem("cart") || "[]";
      setCarts(JSON.parse(updatedCart));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setCarts]);

  return (
    <>
      <div>
        <div
          className="header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link to="/">
            <img
              className="logo"
              src="/Make-6-7-2025.jpg"
              alt="Logo"
              style={{ width: "250px" }}
            />
          </Link>

          {/* Search */}
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
                value={search}
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

          {/* Cart */}
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
                {carts?.length || 0}
              </span>
            </span>
          </div>
        </div>
        <hr className="hrheader" />
      </div>
    </>
  );
};

export default Header;
