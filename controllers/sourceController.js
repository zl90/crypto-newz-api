const cryptopanic = require("../sources/cryptopanic");
const Article = require("../models/article");
const Comment = require("../models/comment");
const passport = require("passport");
const article = require("../models/article");

// Twice a minute, pull news from sources and save it to the db
const REQUEST_INTERVAL = 30000; // in milliseconds

const getNews = () => {
  // pull from cryptopanic API
  cryptopanic.getLatestArticles
    .then((results) => {
      // save to the db without duplicates
      results.map((element, index) => {
        // look for duplicate articles
        Article.findOne({ title: element.title }).exec((err, articleFound) => {
          if (err) {
            return console.log(err);
          }

          if (!articleFound) {
            // no duplicates found, save the article to the db
            const newArticle = new Article({
              title: element.title,
              published_at: Date.parse(element.published_at),
              url: `https://cryptopanic.com/news/${element.id.toString()}/click/`,
              source: element.source.domain,
              comments: [],
            });
            newArticle.save((err) => {
              if (err) {
                return console.log(err);
              }
              console.log(`New article saved: "${element.title}"`);
            });
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Repeat again after the timing interval
  setTimeout(getNews, REQUEST_INTERVAL);
};

getNews();
