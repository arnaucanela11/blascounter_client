"use client";
import { useContext, useEffect, useState } from "react";
import NavBar2 from "../components/NavBar2";
import { GetUserCart, PutToCart, getAnAccount } from "../api/handlers";
import "./AccountPage.css";
import Link from "next/link";
import { GlobalState } from "@/context/GlobalState";

const AccountPage = ({ params }) => {
  const { id } = params;
  const { addToCart, cart } = useContext(GlobalState);
  const [onCart, setOnCart] = useState(false);
  const [CartArr, setCart] = useState([]);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [Account, setAccount] = useState();
  const [cartClickedAndNoToken, setCartClickedAndNoToken] = useState(false);
  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    const userFromLocal = localStorage.getItem("user");
    const User = JSON.parse(userFromLocal);
    setUser(User)
    async function doFetch() {
      const { account } = await getAnAccount(id);
      console.log(id);
      setAccount(account);
      const { cart } = await GetUserCart(user._id);
      setCart(cart);
      localStorage.setItem("cart", cart.length);
    }
    doFetch();
    console.log(Account);
  }, [id, cart]);

  const handleClick = async () => {
    if (!token) {
      setCartClickedAndNoToken(!cartClickedAndNoToken);
    } else {
      if (CartArr.length > 0) {
        const accountOfCartArr = CartArr.find((ac) => ac._id == Account._id);
        if (accountOfCartArr) {
          setOnCart(true);
        }
      } else {
        addToCart();
        const { newCart } = await PutToCart(Account, user);
        setCart(newCart);
      }
    }
  };
  return (
    <>
      <NavBar2 />
      <div className="account__container">
        <div className="name__and__img__container">
          <div className="account__image" />
          <span className="account__name">{Account?.accountName}</span>
          <span className="price">{Account?.price} $</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link
            href={`${Account?.link}`}
            className="link__button"
            style={{
              width: "fit-content",
              textDecoration: "none",
              marginLeft: "80px",
              marginRight: "80px",
            }}
          >
            Direct Link
          </Link>
          <div className="info__div">
            <div
              style={{
                position: "relative",
              }}
            >
              <h3>Information</h3>
              <hr
                style={{
                  marginTop: "-10px",
                  width: "80%",
                }}
              />
            </div>
            <ul className="info__ul">
              <li>Followers: {Account?.followers}</li>
              <li>Likes: {Account?.followers}</li>
              <li>
                Name Change:{" "}
                <span
                  style={{
                    color: `#${
                      Account?.nameChange == true ? "227E3C" : "FF0000"
                    }`,
                    fontWeight: "bold",
                  }}
                >
                  {Account?.nameChange == true ? "Available" : "No available"}
                </span>
              </li>
              <li>
                <span className="prevContent">
                  Previous Content:{" "}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#00ACE0",
                    }}
                  >
                    {Account?.pastContent ==
                    "explicit content or no demostrable content"
                      ? Account?.pastContent.slice(
                          0,
                          Account?.pastContent.indexOf("or")
                        )
                      : Account?.pastContent.slice(
                          0,
                          Account.pastContent.indexOf("(")
                        )}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <Link
            href={`/${token ? "cart" : id}`}
            className="add__to__cart"
            onClick={handleClick}
            style={{
              width: "fit-content",
              textDecoration: "none",
            }}
          >
            Add to cart
          </Link>
          {cartClickedAndNoToken ? <span style={{
            marginLeft: '-60px',
            color: '#FF0000'
          }}>Login before</span> : ''}
        </div>
        <div className="div__decoration" />
      </div>
    </>
  );
};

export default AccountPage;
