"use client";

import { useEffect, useState } from "react";
import "../main.css";
import "./Pagination.css";
import { getAllAccounts } from "../api/handlers";
import AccountComponent from "./AccountComponent";
import Filter from "./Filter";

const Main = () => {
  const [accounts, setAccounts] = useState([])
  const [msg, setMsg] = useState(null);
  const [totalLength, setTotalLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleAccounts, setVisibleAccounts] = useState([]);
  const [pastContent, setPastContent] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const accountsPerPage = 18;
  const totalPages = Math.ceil(totalLength / accountsPerPage);
  useEffect(() => {
    async function DoFetch() {
      const { accounts, msg } = await getAllAccounts(pastContent, maxPrice);
      if (accounts) {
        setAccounts(accounts)
        const startIndex = (currentPage - 1) * accountsPerPage;
        const endIndex = startIndex + accountsPerPage;
        const visibleItems = accounts.slice(startIndex, endIndex);
        setVisibleAccounts(visibleItems);
        setTotalLength(accounts.length);
      } else {
        setMsg(msg);
      }
    }
    DoFetch();
  }, [pastContent, totalLength, currentPage, maxPrice]);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickBefore = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const HandleFilter = (pastCnt, price) => {
    setPastContent(pastCnt)
    setMaxPrice(price)
  }


  return (<>
  <Filter handleFilter={HandleFilter} accounts={accounts}/>
  <span style={{
        marginLeft: "130px"
      }}>Showing {currentPage * 18} of {totalLength}</span>
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <div className="grid">
        {msg ? (
          <span>{msg}</span>
        ) : (
          visibleAccounts.map((account) => (
            <AccountComponent account={account} key={account._id} />
          ))
        )}
      </div>
      <nav className="pagination__nav" role="navigation" aria-label="pagination">
        <ul className="pagination__list">
          <li>
            <button
              className="pagination__next"
              aria-label="Goto page next"
              onClick={handleClickNext}
              disabled={(() => {
                if (currentPage == 1) {
                    if (totalLength <= 18) {
                        return true
                    } else {
                        return false
                    }
                }
                if (currentPage == 2) {
                    if (totalLength <= 36) {
                        return true
                    } else {
                        return false
                    }
                }
                if (currentPage == 3) {
                    if (totalLength <= 54) {
                        return true
                    } else {
                        return false
                    }
                }
              })()}
            >
              Next
            </button>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <button
              class="pagination-link"
              aria-label="Goto page 1"
              onClick={() => {
                setCurrentPage(1);
              }}
              style={{
                cursor: "pointer",
                borderColor: `#${currentPage == 1 ? "FF0000" : "000"}`,
                color: `#${currentPage == 1 ? "FF0000" : "000"}`,
              }}
              disabled={currentPage == 1}
            >
              1
            </button>
          </li>
          <li>
            <button
              class="pagination-link is-current"
              aria-label="Page 2"
              aria-current="page"
              style={{
                cursor: "pointer",
                borderColor: `#${currentPage == 2 ? "FF0000" : "000"}`,
                color: `#${currentPage == 2 ? "FF0000" : "000"}`,
              }}
              onClick={() => {
                setCurrentPage(2);
              }}
              disabled={currentPage == 2 || totalLength <= 18}
            >
              2
            </button>
          </li>
          <li>
            <button
              class="pagination-link"
              aria-label="Goto page 3"
              onClick={() => {
                setCurrentPage(3);
              }}
              style={{
                cursor: "pointer",
                borderColor: `#${currentPage == 3 ? "FF0000" : "000"}`,
                color: `#${currentPage == 3 ? "FF0000" : "000"}`,
              }}
              disabled={currentPage == 3 || totalLength <= 36}
            >
              3
            </button>
          </li>
          <li>
            <button
              class="pagination-link"
              aria-label="Goto page 4"
              onClick={() => {
                setCurrentPage(4);
              }}
              style={{
                cursor: "pointer",
                borderColor: `#${currentPage == 4 ? "FF0000" : "000"}`,
                color: `#${currentPage == 4 ? "FF0000" : "000"}`,
              }}
              disabled={currentPage == 4 || totalLength <= 54}
            >
              4
            </button>
          </li>
          <li>
            <span class="pagination-ellipsis">{'\u2026'}</span>
          </li>
          <li>
            <button
              class="pagination__next"
              aria-label="Goto page 1"
              onClick={handleClickBefore}
              disabled={currentPage == 1}
            >
              Before
            </button>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default Main;
