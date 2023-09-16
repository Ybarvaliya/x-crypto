import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Parser } from "html-to-react";
import Chart from "./Chart";

function CoinDetail() {
  const [coin, setCoin] = useState({});
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const btns = ["24h", "7d", "30d", "200d", "1y", "max"];

  const { id } = useParams();

  const fetchCoinDetail = async () => {
    const { data: coinsData } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setCoin(coinsData);

    const { data: chartData } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    setChartArray(chartData.prices);
  };

  useEffect(() => {
    fetchCoinDetail();
  }, [id, currency, days]);

  const htmlParser = new Parser();
  const x = coin?.description?.en;

  const onCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const onTimeButtonClick = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  return (
    <>
      <div className="w-[80%] ml-[10%]">
        <Chart arr={chartArray} currency={currency} days={days}></Chart>

        <div className="p-4 text-lg">
          <label className="mr-3 p-2">
            <input
              type="radio"
              value="inr"
              checked={currency === "inr"}
              onChange={onCurrencyChange}
            />
            INR
          </label>

          <label className="mr-3 p-2">
            <input
              type="radio"
              value="usd"
              checked={currency === "usd"}
              onChange={onCurrencyChange}
            />
            USD
          </label>

          <label className="mr-3 p-2">
            <input
              type="radio"
              value="eur"
              checked={currency === "eur"}
              onChange={onCurrencyChange}
            />
            EUR
          </label>
        </div>

        <div className="flex mb-4 overflow-x-auto">
          {btns.map((i) => {
            return (
              <button
                className="m-2 p-2 rounded-md bg-black text-white"
                key={i}
                onClick={() => onTimeButtonClick(i)}
              >
                {i}
              </button>
            );
          })}
        </div>

        <div className="flex my-8">
          <img className="w-32 h-232" src={coin?.image?.large} alt="" />
          <div className="ml-4 mt-2">
            <h1 className="text-2xl mt-1">{coin?.name}</h1>
            <h2 className="text-lg text-slate-600">
              {currency === "inr" ? "₹" : currency === "usd" ? "$" : "€"}
              {coin?.market_data?.current_price[currency]}
            </h2>
            <h3>Market Cap rank : <span className="text-2xl">#{coin?.market_cap_rank}</span> </h3>
          </div>
        </div>

        <ul className="text-lg w-[100%] lg:w-[30%]">
          <li className="flex justify-between">
            <div>Max Supply</div>
            <div>{coin?.market_data?.max_supply}</div>
          </li>
          <li className="flex justify-between ">
            <div>Circulating Supply</div>
            <div>{coin?.market_data?.circulating_supply}</div>
          </li>
          <li className="flex justify-between">
            <div>Market Cap</div>
            <div>
              {currency === "inr" ? "₹" : currency === "usd" ? "$" : "€"}
              {coin?.market_data?.market_cap[currency]}
            </div>
          </li>
          <li className="flex justify-between">
            <div>All time low</div>
            <div>
              {currency === "inr" ? "₹" : currency === "usd" ? "$" : "€"}
              {coin?.market_data?.atl[currency]}
            </div>
          </li>
          <li className="flex justify-between">
            <div>All time High</div>
            <div>
              {currency === "inr" ? "₹" : currency === "usd" ? "$" : "€"}
              {coin?.market_data?.ath[currency]}
            </div>
          </li>
        </ul>

        <div className="my-4">{htmlParser.parse(x)}</div>
      </div>
    </>
  );
}

export default CoinDetail;
