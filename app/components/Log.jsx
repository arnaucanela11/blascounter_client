"use client";
import "./NavBar.css";
import LogOut from "../../assets/icon-logout-leave.svg"

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { inter } from "../fonts";
import { GlobalState } from "@/context/GlobalState";

const Log = () => {
    const {setLogout} = useContext(GlobalState)
  const [token, setToken] = useState();
  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
  }, []);

  const handleClick = () => {
    setLogout()
    window.location.reload()
  }
  return (
    <div>
      {token == null ? (
        <Link href="/login" className="login">
          Login
        </Link>
      ) : (
        <div className="logout__div" style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <button className="logout__button" onClick={handleClick}>Logout <Image
        src={LogOut}
        alt="logo"
        width={25}
        style={{
          position: "absolute",
          right: -8,
          top: 4,
          color: "red",
          fontFamily: inter.style,
        }}
      />{" "}</button>
      </div>
      )}
    </div>
  );
};

export default Log;
