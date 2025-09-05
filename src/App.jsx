import Container from "@mui/material/Container";
import Home from "./component/main/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import React, { Suspense } from "react";
const Search = React.lazy(() => import("./component/header/Search"));
const CheckOut = React.lazy(() => import("./component/main/CheckOut"));
import { useState } from "react";
import { CartContext } from "./_context/CartContext";

const App = () => {
  const [carts, setCarts] = useState([]);
  return (
    <BrowserRouter>
      <CartContext.Provider value={{ carts, setCarts }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "#ffeb3b14",
          }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Container
              sx={{
                background: "#ffffffb4",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent:"space-between"
              }}
              maxWidth="lg"
            >

              <div style={{ flex: 1 }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback="loading please wait...">
                        <Home />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/Search"
                    element={
                      <Suspense fallback="loading please wait...">
                        <Search />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/CheckOut"
                    element={
                      <Suspense fallback="loading please wait...">
                        <CheckOut />
                      </Suspense>
                    }
                  />
                </Routes>
              </div>
            </Container>
          </div>
        </div>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default App;
