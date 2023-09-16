import React from "react";

import img from "../assets/img.png";
import "../styles/animation.css";

function Home() {
  return (
    <div className="bg-black h-[80vh] w-[100%] text-white flex-col my-0">
      <img className="h-96 w-80 mx-auto pt-16 image" src={img} alt="" />
      <h1 className="text-4xl  my-24 text-center font-semibold">X-Crypto</h1>
    </div>
  );
}

export default Home;
