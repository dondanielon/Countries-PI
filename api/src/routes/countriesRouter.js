const { Router } = require("express");
const { Country } = require("../db");
const { Activity } = require("../db");
const { Op } = require("sequelize");

const countriesRouter = Router();

countriesRouter.get("/", async (req, res) => {
  const { name, continent, order, page, filter, activity } = req.query;
  try {
    if (continent && activity && name) {
      const countries = await Country.findAll({
        where: {
          continent: continent,
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        limit: 12,
        offset: page * 12,
        order: [[filter, order]],
        include: {
          model: Activity,
          where: {
            name: {
              [Op.iLike]: "%" + activity + "%",
            },
          },
        },
      });
      return res.send(countries);
    }

    if (continent && name) {
      const countries = await Country.findAll({
        where: {
          continent: continent,
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        limit: 12,
        offset: page * 12,
        order: [[filter, order]],
      });
      return res.send(countries);
    }

    if (activity && name) {
      const countries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        limit: 12,
        offset: page * 12,
        order: [[filter, order]],
        include: {
          model: Activity,
          where: {
            name: {
              [Op.iLike]: "%" + activity + "%",
            },
          },
        },
      });
      return res.send(countries);
    }

    if (continent && activity) {
      const countries = await Country.findAll({
        where: {
          continent: continent,
        },
        limit: 12,
        offset: page * 12,
        order: [[filter, order]],
        include: {
          model: Activity,
          where: {
            name: {
              [Op.iLike]: "%" + activity + "%",
            },
          },
        },
      });
      return res.send(countries);
    }

    if (name) {
      const countries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        limit: 12,
        offset: page * 12,
        order: [[filter, order]],
      });
      return res.send(countries);
    }

    if (continent) {
      const countries = await Country.findAll({
        where: {
          continent: continent,
        },
        limit: 12,
        offset: page * 12,
        order: [[filter, order]],
      });
      return res.send(countries);
    }

    if (activity) {
      const countries = await Country.findAll({
        limit: 12,
        offset: page * 12,
        order: [[filter, order]],
        include: {
          model: Activity,
          where: {
            name: {
              [Op.iLike]: "%" + activity + "%",
            },
          },
        },
      });
      return res.send(countries);
    }

    const countries = await Country.findAll({
      limit: 12,
      offset: page * 12,
      order: [[filter, order]],
    });

    return res.send(countries);
  } catch (err) {
    return res.send(err);
  }
});

countriesRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findOne({
      where: {
        id: id.toUpperCase(),
      },
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
      },
    });
    if (!country) return res.status(200).send("Country not found");
    return res.send(country);
  } catch (err) {
    return res.send(err);
  }
});

module.exports = countriesRouter;
