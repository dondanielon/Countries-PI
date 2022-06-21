import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Nav.module.css";

function Nav() {
  return (
    <div className={style.navbar}>
      <NavLink exact to="/home">
        <button className={style.option}>Home</button>
      </NavLink>
      <NavLink exact to="/create">
        <button className={style.option}>Create activity</button>
      </NavLink>
    </div>
  );
}

export default Nav;
