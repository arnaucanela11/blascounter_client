"use client";
import "./Filter.css";
import Image from "next/image";
import FilterIcon from "../../assets/icon-filter.svg";
import CartIcon from "../../assets/icon-cart.svg";
import { advent } from "../fonts";
import Link from "next/link";
import Search from "./Search";
import { useEffect, useState } from "react";
import Cross from "../../assets/Cross.svg";
import Slider, {Range} from "rc-slider";
import 'rc-slider/assets/index.css';  

const Filter = (props) => {
  const [cartCounter, setCartCounter] = useState(0);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [pastContent, setPastContent] = useState(null);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
    const User = localStorage.getItem("user");
    const JSONUser = JSON.parse(User);
    setUser(JSONUser);
    if (token) {
      const fetchData = async () => {
        const { cart } = await GetUserCart(user._id);
        setCartCounter(cart.length);
      };
      fetchData();
    }
  }, [pastContent, price]);

  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  const handleSubmit = (e) => {
    if (pastContent && price !== 0) {
      e.preventDefault();
      props.handleFilter(pastContent, price);
    }
    else if (pastContent && price == 0) {
      e.preventDefault();
      props.handleFilter(pastContent, 0);
    }
    else if (price && pastContent == null) {
      e.preventDefault();
      props.handleFilter(null, price);
    }
  };

  const handleChangeSelect = (e) => {
    const { value } = e.target;
    setPastContent(value);
  };

  const handleChangeSlider = (value) => {
    setPrice(value);
  };

  return (
    <>
      <div className="main__box">
        <div className="fiter__box">
          {/* Searcher */}
          <Search accounts={props.accounts} />
          {/* Filter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <button
              className={`filter__button`}
              style={{
                fontFamily: advent.style,
              }}
              onClick={handleClick}
            >
              <Image
                src={FilterIcon}
                alt="logo"
                style={{
                  marginRight: "4px",
                }}
              />
              Filter
            </button>
            {showFilter ? (
              <div className="filter__popup">
                <form onSubmit={handleSubmit} className="form__filter">
                  <label
                    htmlFor="pastContent"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <div>
                      Select a past content:
                      <Image
                        src={Cross}
                        style={{
                          marginLeft: "100px",
                          marginBottom: "10px",
                        }}
                        width={15}
                        onClick={() => {
                          setShowFilter(false);
                        }}
                      />
                    </div>
                    <select
                      value={pastContent}
                      onChange={handleChangeSelect}
                      className="past__content__select"
                    >
                      <option value={null}>--Select--</option>
                      <option value="entreteinment">Entreteinment</option>
                      <option value="knowdlege">Knowdlege</option>
                      <option value="explicit content or no demostrable content">
                        explicit content or no demostrable content
                      </option>
                    </select>
                  </label>
                  <label htmlFor="price" className="price-label">
                    <span style={{
                      fontSize: '16px'
                    }}>Select a maximum price:</span>
                    <Slider
                      value={price}
                      onChange={handleChangeSlider}
                      min={5}
                      max={2500}
                      step={50}
                      className="price-slider"
                    />
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '10px'
                    }}><span style={{
                      fontSize: '16px'
                    }}>Max price:</span><input type="number" placeholder="Max price" value={price} min={price}/></div>
                  </label>
                  <button type="submit" className="search__filter__button">
                    Filter
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>

        <Link href="/cart">
          <button className="cart__button">
            <Image src={CartIcon} width="25" alt="logo" />
            <span className="cart__counter">{cartCounter}</span>
          </button>
        </Link>
      </div>
      <hr className="second__line" />
    </>
  );
};

export default Filter;
