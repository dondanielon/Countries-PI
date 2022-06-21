import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.container}>
      <p className={style.title}>Countries by Daniel Valencia</p>
      <NavLink exact to="/home">
        <button className={style.go}>Go to home page</button>
      </NavLink>
    </div>
  );
}

export default Landing;
