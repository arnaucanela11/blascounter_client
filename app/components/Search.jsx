"use client";
import { useEffect, useState } from "react";
import "./Search.css";
import { getAllAccounts } from "../api/handlers";
import Link from "next/link";
const algoliasearch = require("algoliasearch");

const client = algoliasearch("HNWOOVTKSN", "a222ff2816ae4d59a1858ed959b47b17");
const index = client.initIndex("test_index");


const Search = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([])
  useEffect(() => {
    
    const NewArr = props.accounts.map((account) => {
        return account = {
          accountName: account.accountName,
          objectID: account._id
        }
    })
    index.saveObjects(
      NewArr,
      { autoGenerateObjectIDIfNotExist: true },
      (err, content) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }, [props.accounts]);

  const performSearch = async (value) => {
    const { hits } = await index.search(value, {
      hitsPerPage: 5,
    });

    const results = hits.map((hit) => {
      const { objectID: key, accountName } = hit;
      return { key, accountName };
    });

    setResults(results);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value)

    value === "" ? setResults(null) : performSearch(value);
  };

  return (
    // <div className="search__div">

    // </div>
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: 'max-content'
    }}>
      <input
        type="search"
        placeholder="Search an account"
        value={query}
        className="search__input"
        onChange={handleChange}
      ></input>
      {/* {showHits ? <Hits hitComponent={Hit} /> : ""} */}
      {results === null
        ? null
        : <div className="ais__Hits">
            <ul className='hits__ul'>
              {results.map(result => {
                const {key, accountName} = result

                return (
                  <li key={key} style={{
                    paddingRight: '32px'
                  }}>
                    <Link href={`/${key}`} style={{
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '10px',
                      alignItems: 'center'
                    }}>
                      <div className="account__image" />
                      <span dangerouslySetInnerHTML={{ __html: accountName}} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
      }
    </form>
  );
};

export default Search;
