import { LinearProgress, Rating } from '@mui/material';
const Productcart = ({
  loading,
  cart,
  increaseQuantity,
  decreaseQuantity,
  setOpen,
  handleRemove,
  handleSubmit,
  price,
  state,
  open,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
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
      ) : Array.isArray(cart) && cart.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginTop: "30px",
            gap: "10px",
          }}
        >
          {cart.map((item) => {
            return (
              <div
                className="product"
                key={item.title}
                style={{
                  width: "250px",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  height: "100%",
                  background: "#f2f2f2",
                }}
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      increaseQuantity(item.title);
                    }}
                    style={{
                      width: "70px",
                      height: "35px",
                      background: "yellow",
                      fontSize: "15px",
                      border: "none",
                      borderRadius: "15px",
                    }}
                  >
                    +
                  </button>
                  <p style={{ fontSize: "18px" }}>{item.quantity}</p>
                  <button
                    onClick={() => {
                      decreaseQuantity(item.title);
                    }}
                    style={{
                      width: "70px",
                      height: "35px",
                      background: "yellow",
                      fontSize: "15px",
                      border: "none",
                      borderRadius: "15px",
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => {
                    handleRemove(item.title);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "10px",
                    background: "#ff0000b0",
                    height: "12%",
                    borderRadius: "50px",
                    width: "92%",
                    border: "none",
                    fontSize: "24px",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "32px",
            height: "27vh",
            alignItems: "center",
          }}
        >
          Not Found
        </div>
      )}
      {cart.length > 0 ? (
        <button
          onClick={() => {
            setOpen(true);
          }}
          style={{
            width: "115px",
            height: "50px",
            background: "yellow",
            fontSize: "15px",
            border: "none",
            borderRadius: "15px",
            marginTop: "10%",
          }}
        >
          Check Out
        </button>
      ) : null}

      {open && (
        <form
          onSubmit={handleSubmit}
          style={{
            position: "fixed",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            zIndex: 9999,
            width: "500px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              border: "none",
              background: "none",
              marginRight: "-467px",
              fontSize: "18px",
            }}
          >
            close
          </button>

          <label style={{ margin: "10px", fontSize: "16px" }}>Your Name</label>
          <input
            style={{
              margin: "10px",
              fontSize: "16px",
              width: "300px",
              height: "30px",
              padding: "10px",
              border: "1px solid yellow",
              outline: "none",
            }}
            required
            name="name"
            placeholder="Name"
          />
          <label style={{ margin: "10px", fontSize: "16px" }}>
            Phone Number
          </label>
          <input
            style={{
              margin: "10px",
              fontSize: "16px",
              width: "300px",
              height: "30px",
              padding: "10px",
              border: "1px solid yellow",
              outline: "none",
            }}
            required
            name="number"
            placeholder="Phone Number"
          />
          <label style={{ margin: "10px", fontSize: "16px" }}>Address</label>
          <input
            style={{
              margin: "10px",
              fontSize: "16px",
              width: "300px",
              height: "30px",
              padding: "10px",
              border: "1px solid yellow",
              outline: "none",
            }}
            required
            name="address"
            placeholder="Address"
          />

          <input type="hidden" name="total" value={price} />
          {cart.map((item, index) => (
            <div key={index}>
              <input
                type="hidden"
                name={`product_${index + 1}`}
                value={`${item.title} x ${item.quantity} price ${
                  item.price * item.quantity
                }`}
              />
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "65%",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                display: "flex",
                height: "50px",
                justifyContent: "space-between",
                width: "33%",
                background: "yellow",
                border: "none",
                borderRadius: "15px",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <span style={{ paddingRight: "10px", borderRight: "3px solid" }}>
                Total
              </span>
              {price.toFixed(2)}
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              style={{
                width: "130px",
                height: "50px",
                background: "yellow",
                fontSize: "15px",
                border: "none",
                borderRadius: "15px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Productcart
