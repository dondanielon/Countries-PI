const { Router } = require("express");
const { Country } = require("../db");

const namesRouter = Router();

namesRouter.get("/", async (req, res) => {
  try {
    const countries = await Country.findAll({
      order: [["name", "ASC"]],
    });
    const names = await countries.map((country) => {
      return `${country.id} ${country.name}`;
    });

    return res.send(names);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = namesRouter;
