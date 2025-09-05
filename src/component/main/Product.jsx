import { Rating } from '@mui/material';
import React from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md';
import "./Home.css";
const Product = ({ item, addToCart }) => {
  return (
    <div
      className="product"
      key={item.price}
      style={{
        width: "250px",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        height: "100%",
        background: "#f2f2f2",
      }}
      onClick={() => addToCart(item)}
    >
      <img
        src={item.image}
        alt=""
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "10px",
        }}
        loading="lazy"
      />
      <p
        className="productTitle"
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontSize: "18px",
          padding: "10px",
        }}
      >
        {item.title}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <p
          className="price"
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: "20px",
            color: "#9c9c72",
          }}
        >
          {item.price}$
        </p>{" "}
        <p
          className="rating "
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
      </div>
      <button
        style={{
          background: "#ecec04",
          width: "100%",
          height: "45px",
          marginTop: "5px",
          border: "none",
          borderRadius: "10px",
          fontSize: "15px",
        }}
        onClick={() => addToCart(item)}
      >
        <MdOutlineShoppingCart style={{ paddingRight: "5px" }} />
        <span>Add To Cart</span>
      </button>
    </div>
  );
};

export default Product
