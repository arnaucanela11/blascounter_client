"use client";
import "./cart.css";
import Image from "next/image";
import Cart from "../../assets/icon-cart.svg";
import Arrow from '../../assets/Arrow 1.svg'
import NavBar2 from "../components/NavBar2";
import { advent } from "../fonts";
import { GetUserCart, getAnAccount, kickToCart } from "../api/handlers";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/context/GlobalState";
// import { token, user } from "../store/slices/mainSlice";

const CartPage = () => {
  const {removeFromCart} = useContext(GlobalState)
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    const User = localStorage.getItem("user");
    const JSONUser = JSON.parse(User);
    setUser(JSONUser);

    const fetchData = async () => {
      if (token) {
        const _id = user._id;
        const { cart } = await GetUserCart(_id);
        setCart(cart);
        localStorage.setItem('cart', cart.length)
      }
    };
    fetchData();
  }, [token, cart]);

  const removeFromCartHandler = async (account) => {
    removeFromCart()
    const {newCart} = await kickToCart(account, user._id)
    console.log(newCart)
    setCart(newCart)
  }
  return (
    <>
      <NavBar2 />
      {token == null ? (
        <div className="no__account__alert">
          <h4>You have to login before get your cart</h4>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h1 className="cart__title">
              This is your cart: <Image src={Cart} alt="cart" />
            </h1>
            <hr
              style={{
                marginTop: "-8px",
                width: "75%",
              }}
            />
          </div>
          <div className="main__container">
            {cart.length <= 0 ? (
              <span>Aún no hay objetos en tu carrito</span>
            ) : (
              cart.map((account, index) => (
                <div className="account__div" key={index}>
                  <div className="account__name">
                    <div className="account__image" />
                    <span
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      {"@" + account.accountName}
                    </span>
                  </div>
                  <span className="price">{account.price}</span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div className="main__content">
                      <span className="followers">
                        Followers:{" "}
                        <span style={{ fontWeight: "700" }}>
                          {account.followers}
                        </span>
                      </span>
                      <span className="likes">
                        Likes:{" "}
                        <span
                          style={{
                            fontWeight: "700",
                          }}
                        >
                          {account.likes}
                        </span>
                      </span>
                      <span className="nameChange">
                        Name Change:{" "}
                        <span
                          style={{
                            color: "#227E3C",
                            fontWeight: "600",
                          }}
                        >
                          Available
                        </span>
                      </span>
                      <span className="prevContent">
                        Previous Content:{" "}
                        <span
                          style={{
                            fontWeight: "700",
                            color: "#00ACE0",
                          }}
                        >
                          {account.pastContent.slice(
                            0,
                            account.pastContent.indexOf("(")
                          )}
                        </span>
                      </span>
                    </div>
                    <button
                      className="remove__button"
                      style={{
                        fontFamily: advent.style,
                        textDecoration: "none",
                      }}
                      onClick={() => removeFromCartHandler(account)}
                    >
                      Remove from cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="buy__button"
            style={{
              fontFamily: advent.style,
              textDecoration: "none",
            }}
          >
            Buy
          </button>
        </div>
      )}
    </>
  );
};

export default CartPage;
