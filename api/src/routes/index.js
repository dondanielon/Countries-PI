const { Router } = require("express");
const countriesRouter = require("./countriesRouter");
const activityRouter = require("./activityRouter");
const namesRouter = require("./namesRouter");
const { Country } = require("../db");

const router = Router();
router.use("/countries", countriesRouter);
router.use("/activity", activityRouter);
router.use("/names", namesRouter);
router.get("/all", async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.send(countries);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
