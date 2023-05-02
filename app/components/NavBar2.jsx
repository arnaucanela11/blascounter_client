'use client'
import "./NavBar.css";
// import Image from "next/image"
import Logo from "../../assets/Title.png";
import Link from "next/link";
import Image from "next/image";
import iconInfo from "../../assets/icon-info.svg";
import CartIcon from "../../assets/icon-cart.svg";
import Add from "../../assets/user-add.svg";
import { advent, inter } from "../fonts";
import { useEffect, useState } from "react";
import Log from "./Log";

const NavBar2 = () => {
  const [cart, setCart] = useState(0)
  const [user, setUser] = useState()
  useEffect(() => {
    const user = localStorage.getItem('user')
    const User = JSON.parse(user)
    setUser(User)
    if (user) {
    const Cart = localStorage.getItem('cart')
    console.log(Cart)
    if (Cart) {
      setCart(Cart)
    }
    else {
      setCart(0)
    }
  }
  }, [cart])
  return (
    <>
      <nav className="nav__2">
        <Link href="/" className="logo__link">
          <Image src={Logo} width="250" alt="logo"/>
        </Link>
        <Link
          className="nav__mid__2"
          href="/info"
          style={{
            textDecoration: "none",
          }}
        >
          <span className={`things__you__have__to__know ${inter.className}`}>
            Things you have to know
            <Image
              src={iconInfo}
              alt="advertise"
              style={{ marginLeft: "10px", top: "30px", position: "absolute" }}
            />
          </span>
        </Link>
        <div className="nav__right">
            <Link href="/cart" style={{
                textDecoration: "none"
            }}>
          <button className="cart__button__2">
            <Image src={CartIcon} width="25" alt="logo"/>
            <span className="cart__counter__2">{cart}</span>
          </button>
          </Link>
          <div className="setup__div">
            <Link href="/setup" className="setup">
              <Image
                src={Add}
                alt="logo"
                width={20}
                style={{
                  position: "relative",
                  left: -3,
                  color: "red",
                }}
              />{" "}
              Set Up{" "}
            </Link>
          </div>
          <Log />
          <Link href='/sell-account'
            className="sell__button"
            style={{
              fontFamily: advent.style,
              textDecoration: 'none'
            }}
          >
            Sell Account
          </Link>
        </div>
      </nav>
      <hr className="first__line__2" />
    </>
  );
};

export default NavBar2;
