import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";

function Exchange() {
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1)

  const pages = new Array(6).fill(1)

  const x = `https://api.coingecko.com/api/v3/exchanges?per_page=100&page=${page}`;

  const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(x);
      setExchange(data);
      setLoading(false);
      console.log(exchange);
    } catch {
      setLoading(false);
      setErr(true);
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, [page]);

  const onPageClick = (e) => {
    setPage(e.target.value)
  }

  if (err)
    return (
      <ErrorComponent
        message={"Error While fetching Exchanges"}
      ></ErrorComponent>
    );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-wrap w-[80%] ml-[10%] justify-evenly">
            {exchange.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </div>
          <div className="w-[80%] my-2 ml-[10%]  overflow-x-auto flex justify-center">
      {
        pages.map((item ,index) => {
          return <button key={index} onClick={onPageClick} value={index+1} className="bg-black text-white p-3 m-1 px-4 rounded-lg text-md">{index+1}</button>
        }) 
      }
      </div>
        </>
      )}
    </div>
  );
}

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"} >
    <div className="p-7 m-5 text-center w-44 h-4/5 shadow-md">
      <img className='h-24 w-24 mx-auto' src={img} />
      <h3 className="mt-3 text-lg">{rank}</h3>

      <p>{name}</p>
    </div>
  </a>
);

export default Exchange;
