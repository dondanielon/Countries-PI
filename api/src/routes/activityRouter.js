const { Router } = require("express");
const { Activity } = require("../db");

const activityRouter = Router();

activityRouter.get("/", async (req, res) => {
  try {
    const response = await Activity.findAll({
      attributes: ["name"],
    });
    const list = await response.map((item) => item.name);
    const activities = [...new Set(list)];
    return res.send(activities);
  } catch (err) {
    return res.send(err);
  }
});

activityRouter.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countryId } = req.body;
  try {
    const [act, created] = await Activity.findOrCreate({
      where: {
        name: name,
        difficulty: difficulty,
        duration: parseInt(duration),
        season: season,
      },
    });
    await act.setCountries(countryId);
    return res.send(act);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = activityRouter;
