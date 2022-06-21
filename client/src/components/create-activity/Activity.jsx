import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNames, createActivity, clearDetail } from "../../redux/actions";
import Nav from "../navbar/Nav";

import style from "./Activity.module.css";
///^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(input.name)
const validate = (input) => {
  const errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(input.name)) {
    errors.name = "cannot contain special characters";
  }
  if (!input.difficulty) {
    errors.difficulty = "difficulty is required";
  }
  if (!input.duration) {
    errors.duration = "duration is required";
  } else if (parseInt(input.duration) < 0) {
    errors.duration = "negative numbers not allowed";
  }
  if (!input.season) {
    errors.season = "season is required";
  }
  if (!input.selection.length) {
    errors.selection = "at least one contry is required";
  }
  return errors;
};

function Activity() {
  const dispatch = useDispatch();
  const names = useSelector((state) => state.names);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    selection: [],
  });
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(false);
  const [checker, setChecker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChecker(true);
    if (!Object.keys(errors).length) {
      dispatch(
        createActivity(
          input.name,
          input.difficulty,
          input.duration,
          input.season,
          input.selection
        )
      );
      setCreated(true);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "selection") {
      if (e.target.value === "") return;
      if (input.selection.includes(e.target.value)) return;
      setInput({
        ...input,
        selection: [...input.selection, e.target.value],
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const removeCountry = (e) => {
    const updatedList = input.selection.filter(
      (item) => item !== e.target.value
    );
    setInput({ ...input, selection: updatedList });
  };

  useEffect(() => {
    dispatch(getNames());
    dispatch(clearDetail());
  }, [dispatch]);

  useEffect(() => {
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input]);

  return (
    <div className={style.container}>
      <Nav />
      <div className={style.box}>
        <h2 className={style.title}>Create activity</h2>

        <form
          className={style.form}
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
        >
          <p>Name of activity</p>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            className={style.selection}
          />
          <p>Select difficulty</p>
          <select
            name="difficulty"
            className={style.selection}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
            <option value="very hard">Very Hard</option>
            <option value="extreme">Extreme</option>
          </select>
          <p>Duration (minutes)</p>
          <input
            type="number"
            name="duration"
            value={input.duration}
            className={style.selection}
            onChange={handleInputChange}
          />
          <p>Select season</p>
          <select
            name="season"
            className={style.selection}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
          </select>
          <p>Select countries</p>
          <select
            name="selection"
            className={style.selection}
            onChange={handleInputChange}
          >
            <option value=""></option>
            {names?.map((item) => {
              const id = item.slice(0, 3);
              const name = item.slice(4);
              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <div className={style.countries}>
            {input.selection?.map((item) => (
              <button
                className={style.option}
                value={item}
                key={item}
                onClick={removeCountry}
              >
                {item} x
              </button>
            ))}
          </div>
          <button className={style.create} type="submit">
            Create
          </button>
        </form>
        {checker && errors.name && (
          <p className={style.errName}>{errors.name}</p>
        )}
        {checker && errors.difficulty && (
          <p className={style.errDifficulty}>{errors.difficulty}</p>
        )}
        {checker && errors.duration && (
          <p className={style.errDuration}>{errors.duration}</p>
        )}
        {checker && errors.season && (
          <p className={style.errSeason}>{errors.season}</p>
        )}
        {checker && errors.selection && (
          <p className={style.errSelection}>{errors.selection}</p>
        )}
      </div>
      {created && (
        <div className={style.created}>
          <p className={style.popTitle}>Activity created</p>
          <button
            className={style.popButton}
            onClick={(e) => {
              window.location.reload(false);
            }}
          >
            Ok
          </button>
        </div>
      )}
    </div>
  );
}

export default Activity;
