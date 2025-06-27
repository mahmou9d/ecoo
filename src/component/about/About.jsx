import React from "react";
import "../main/Home.css";
import { useForm, ValidationError } from "@formspree/react";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const About = () => {
  const nav = useNavigate();

  const [state, handleSubmit] = useForm("xjkrwajl");
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
          {/* <Link
            style={{
              marginLeft: "85%",
              marginTop: "5%",
              textDecoration: "none",
              color: "red",
            }}
            to="/"
          >
            Close
          </Link> */}
  
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
    <div
      style={{
        marginTop: "90px",
        position: "relative",
        border: "1px solid yellow",
      }}
    >
      <img
        style={{ width: "100%", height: "100%", borderRadius: "5px" }}
        src="/—Pngtree—shopping mall supermarket selection merchandise_1048684 (1).jpg"
        alt=""
      />
      <div
        className="Aboutemail"
        style={{
          position: "absolute",
          left: "46%",
          top: "15%",
          display: "flex",
          flexDirection: "column-reverse",
          width: "40%",
          gap: "40px",
        }}
      >
        <form onSubmit={handleSubmit} action="">
          {/* <input
            className="aboutinput"
            type="email"
            style={{
              widows: "60%",
              height: "15px",
              borderRadius: "50px",
              outline: "none",
              padding: "13px",
              border: "none",
              fontSize: "16px",
            }}
          /> */}
          <input id="email" type="email" name="email"  style={{
             
              height: "3px",
              borderRadius: "50px",
              outline: "none",
              padding: "13px",
              border: "none",
              // fontSize: "16px",
               widows: "-webkit-fill-available !important",
            }} />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <button
            type="submit"
            disabled={state.submitting}
            style={{
              width: "155px",
              height: "30px",
              background: "yellow",
              fontSize: "15px",
              border: "none",
              borderRadius: "15px",
              marginTop:"10px"
            }}
          >
            Submit
          </button>
        </form>

        <h1 className="footer">
          Contact us for more information and Get notified when I publish
          something new.
        </h1>
      </div>
    </div>
  );
};

export default About;
