import { RxPerson } from "react-icons/rx";
import { RiSearch2Line } from "react-icons/ri";
import { LiaShoppingCartSolid } from "react-icons/lia";
import "../main/Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
// @ts-ignore


const Header = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  
  const [search, setSearch] = useState(null);
  console.log(search);
useEffect(() => {
  const interval = setInterval(() => {
    const storedCart = localStorage.getItem("cart") || "[]";
    const parsedCart = JSON.parse(storedCart);
    setCart((prevCart) => {
      if (JSON.stringify(prevCart) !== JSON.stringify(parsedCart)) {
        return parsedCart;
      }
      return prevCart;
    });
  }, ); // كل نص ثانية

  return () => clearInterval(interval); // تنظيف عند الخروج
}, []);
    console.log(cart)
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

  return (
    <>
      <div>
        {/* header */}
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
        {/* header */}
        
      </div>
    </>
  );
};

export default Header;
