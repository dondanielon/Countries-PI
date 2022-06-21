import React from "react";
import Countries from "../countries/Countries";
import Nav from "../navbar/Nav";

import style from "./Home.module.css";

function Home() {
  return (
    <div style={style.container}>
      <Nav />
      <Countries />
    </div>
  );
}

export default Home;
