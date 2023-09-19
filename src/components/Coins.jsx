import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cuurency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);
  const [err, setErr] = useState(false);

  const pages = new Array(132).fill(1);

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cuurency}&per_page=100&page=${page}`
      );
      setCoins(data);
      setLoading(false);
    } catch {
      setLoading(false);
      setErr(true);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [cuurency, page]);

  const onCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const onPageClick = (e) => {
    setPage(e.target.value);
  };

  if (err)
    return (
      <ErrorComponent message={"Error While fetching Coins"}></ErrorComponent>
    );

  return (
    <>
      <div className="ml-[10%] m-4 text-lg p-2">
        <label className="mr-2 p-1">
          <input
            type="radio"
            value="inr"
            checked={cuurency === "inr"}
            onChange={onCurrencyChange}
          />
          INR
        </label>

        <label className="mr-2 p-1">
          <input
            type="radio"
            value="usd"
            checked={cuurency === "usd"}
            onChange={onCurrencyChange}
          />
          USD
        </label>

        <label className="mr-2 p-1">
          <input
            type="radio"
            value="eur"
            checked={cuurency === "eur"}
            onChange={onCurrencyChange}
          />
          EUR
        </label>
      </div>

      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="w-[80%] ml-[10%] flex flex-wrap justify-evenly">
          {coins.map((c) => {
            return (
              <CoinsCard
                key={c.id}
                id={c.id}
                name={c.name}
                img={c.image}
                symbol={c.symbol}
                price={c.current_price}
                curr={cuurency}
              />
            );
          })}
        </div>
      )}
      <div className="w-[80%] my-2 ml-[10%] overflow-x-auto flex">
        {pages.map((item, index) => {
          return (
            <button
              key={index}
              onClick={onPageClick}
              value={index + 1}
              className="bg-black text-white p-2 m-1 rounded-lg"
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </>
  );
}

const CoinsCard = ({ id, img, name, symbol, price, curr }) => {
  var sym = "₹";

  if (curr === "usd") {
    sym = "$";
  } else if (curr === "eur") {
    sym = "€";
  } else {
    sym = "₹";
  }

  return (
    <Link to={`/coin/${id}`}>
      <div className="p-2 m-4 text-center shadow-md w-44 h-64 transition ease-in-out hover:scale-110 duration-300 ">
        <img src={img} alt="" className="w-28 h-28 mx-auto" />
        <div className="uppercase mt-3 text-lg">{symbol}</div>
        <p className="mt-1 text-slate-500">{name}</p>
        <p className="mt-1">
          {sym}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default Coins;
