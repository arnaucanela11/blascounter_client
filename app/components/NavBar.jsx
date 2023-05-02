import "./NavBar.css";
// import Image from "next/image"
import Logo from "../../assets/Title.png";
import Link from "next/link";
import Image from "next/image";
import iconInfo from "../../assets/icon-info.svg";
import Add from "../../assets/user-add.svg";
import { advent, inter } from "../fonts";
import Log from "./Log";

const NavBar = () => {
  return (
    <>
      <nav className="nav__1">
        <Link href="/" className="logo__link">
          <Image src={Logo} width="250" alt="logo"/>
        </Link>
        <Link
          className="nav__mid"
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
      <hr className="first__line" />
    </>
  );
};

export default NavBar;
