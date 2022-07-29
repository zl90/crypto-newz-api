//////////// Pulls the latest 200 articles from Cryptopanic API ///////////////
// API courtesy of Cryptopanic: https://cryptopanic.com/developers/api/

// need a handler function which grabs all posts from cryptopanic.
// saving to database can be done elsewhere (in the article controller).

const fetch = require("node-fetch");

// Grab latest 20 articles:
exports.getLatestArticles = new Promise((resolve, reject) => {
  fetch(
    `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTOPANIC_KEY}`,
    { mode: "cors" }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      resolve(data.results);
    })
    .catch((err) => {
      reject(err);
    });
});
