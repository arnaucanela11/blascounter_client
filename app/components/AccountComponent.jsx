"use client";
import "./AccountComponent.css";
import Image from "next/image";
import Add from "../../assets/icon-plus-add.png";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/context/GlobalState";
import { PutToCart } from "../api/handlers";
import { GetUserCart } from "../api/handlers";

const AccountComponent = ({ account }) => {
  const { addToCart, cart } = useContext(GlobalState);
  const [user, setUser] = useState();
  const [onCart, setOnCart] = useState(false);
  const [CartArr, setCart] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    const userFromLocal = localStorage.getItem("user");
    const User = JSON.parse(userFromLocal);
    setUser(User);
    const fetchData = async (_id) => {
      if (user) {
        const { cart } = await GetUserCart(user._id);
      setCart(cart);
      localStorage.setItem("cart", cart?.length);
      }
    };
    fetchData();
  }, [cart]);

  const handleCartClick = async () => {
    if (CartArr.length > 0) {
      const accountOfCartArr = CartArr.find((ac) => ac._id == account._id);
      if (accountOfCartArr) {
        setOnCart(true);
      }
    } else {
      addToCart();
      const { newCart } = await PutToCart(account, user);
      setCart(newCart)
    }
  };
  return (
    <Link href={`/${account._id}`} className="account__div">
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
      <span className="price">{account.price}$</span>
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
            <span style={{ fontWeight: "700" }}>{account.followers}</span>
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
              {account.pastContent ==
              "explicit content or no demostrable content"
                ? account.pastContent.slice(0, account.pastContent.indexOf("or"))
                : account.pastContent.slice(
                    0,
                    account.pastContent.indexOf("(")
                  )}
            </span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "full",
            height: "fit-content",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginTop: "8px",
            marginLeft: "-28px",
          }}
        >
          {token == null ? (
            ""
          ) : (
            <>
              {onCart ? (
                ""
              ) : (
                <Link
                href={`/${token ? "cart" : ''}`}
                  onClick={handleCartClick}
                  style={{
                    width: "fit-content",
                  }}
                >
                  <div className="add__to__cart">
                    <Image src={Add} className="add" alt="logo" />
                  </div>
                </Link>
              )}
            </>
          )}
          <Link
            href={account.link}
            onClick={() => {
              console.log(account.link);
            }}
            style={{
              width: "fit-content",
              textDecoration: "none",
              color: "black",
            }}
          >
            <span className="direct__link">Direct Link</span>
          </Link>
        </div>
        <div className="div__decoration" />
      </div>
    </Link>
  );
};

module.exports = AccountComponent;
