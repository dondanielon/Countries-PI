import React from "react";

import style from "./ActivityCard.module.css";

function ActivityCard({ name, difficulty, duration, season }) {
  return (
    <div className={style.container}>
      <h3 className={style.title}>{name}</h3>
      <p>Difficulty: {difficulty}</p>
      <p>Duration: {duration} minutes</p>
      <p>Season: {season}</p>
    </div>
  );
}

export default ActivityCard;
