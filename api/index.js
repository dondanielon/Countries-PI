//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Country } = require("./src/db.js");
const axios = require("axios");

conn.sync({ force: true }).then(async () => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
  try {
    let response = await axios.get("https://restcountries.com/v3/all");
    response = response.data;
    response.map(async (element) => {
      let cap = "null";
      if (element.capital) {
        cap = element.capital[0];
      }
      const [addCountryToDataBase, created] = await Country.findOrCreate({
        where: {
          id: element.cca3,
        },
        defaults: {
          name: element.name.common,
          image: element.flags[0],
          continent: element.region,
          capital: cap,
          subregion: element.subregion,
          area: element.area,
          population: element.population,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
});
