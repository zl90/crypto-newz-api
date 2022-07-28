const User = require("../models/user");
const Article = require("../models/article");
const Comment = require("../models/comment");
const passport = require("passport");

//////////////////// Article List (all articles) //////////////////////////////
// Public
exports.articles_get = function (req, res, next) {
  // Gets the article list
  Article.find().exec((err, articleList) => {
    if (err) {
      return next(err);
    }

    // Success, respond with the article list
    return res.json(articleList);
  });
};

// Admin only
// Adds a new article to the list
exports.articles_post = function (req, res, next) {
  // Authenticate request
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Bad auth: Admin only",
        user,
      });
    }

    // Admin authenticated: proceed to add new article to the list
    const newArticle = new Article({
      title: req.body.title,
      published_at: Date.parse(req.body.published_at),
      url: req.body.url,
      source: req.body.source,
      comments: req.body.comments,
    });

    // Check for duplicate article names in the db
    Article.findOne({ title: newArticle.title }).exec((err, foundDuplicate) => {
      if (err) {
        return next(err);
      }

      if (foundDuplicate) {
        // Article is already in the list, don't add it
        return res
          .status(403)
          .json({ message: "Article already exists in the database" });
      } else {
        // Add the article to the db
        newArticle.save((err) => {
          if (err) {
            return next(err);
          }

          return res.json({
            message: "Successfully added the article to the database",
          });
        });
      }
    });
  })(req, res);
};
// Admin only
exports.articles_delete = function (req, res, next) {
  // Deletes all articles
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Bad auth: Admin only",
        user,
      });
    }

    // Admin authenticated: proceed to delete article list
    Article.deleteMany()
      .then(() => {
        return res.json({
          message: "Successfully deleted all articles",
          user: user,
        });
      })
      .catch((err) => {
        return next(err);
      });
  })(req, res);
};

//////////////////////////// Individual Articles //////////////////////////////
// Public
exports.article_get = function (req, res, next) {
  // Gets an individual article
  Article.findOne({ _id: req.params.articleId }).exec((err, articleFound) => {
    if (err) {
      return next(err);
    }

    if (!articleFound) {
      // Article doesn't exist, report error to user
      return res.status(404).json({ message: "Article not found" });
    } else {
      // Success, respond with the article
      return res.json(articleFound);
    }
  });
};

// Admin only
exports.article_put = function (req, res, next) {
  // Updates the specified article with a new one
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Bad auth: Admin only",
        user,
      });
    }

    // Admin authenticated: proceed to update the article
    Article.findOne({ _id: req.params.articleId }).exec((err, articleFound) => {
      if (err) {
        return next(err);
      }

      if (!articleFound) {
        // Article doesn't exist, report error to user
        return res.status(404).json({ message: "Article not found" });
      } else {
        // Success, update the new article with the one in the request body:
        const newArticle = new Article({
          title: req.body.title,
          published_at: Date.parse(req.body.published_at),
          url: req.body.url,
          source: req.body.source,
          comments: req.body.comments,
          _id: req.params.articleId,
        });

        Article.findByIdAndUpdate(
          req.params.articleId,
          newArticle,
          {},
          (update_errors, updated_article) => {
            if (update_errors) {
              return next(update_errors);
            }

            res.json({ message: "Successfully updated the article" });
          }
        );
      }
    });
  })(req, res);
};
// Admin only
exports.article_delete = function (req, res, next) {
  // Deletes the specified article
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Bad auth: Admin only",
        user,
      });
    }

    // Admin authenticated: proceed to delete the article
    Article.findOne({ _id: req.params.articleId }).exec((err, articleFound) => {
      if (err) {
        return next(err);
      }

      if (!articleFound) {
        // Article doesn't exist, report error to user
        return res.status(404).json({ message: "Article not found" });
      } else {
        // Found the article, delete it
        Article.findByIdAndRemove(req.params.articleId, (err) => {
          if (err) {
            return next(err);
          }

          res.json({ message: "Successfully deleted the article" });
        });
      }
    });
  })(req, res);
};

///////////// Comment list (all comments on a particular article) /////////////
// Public
exports.comments_get = function (req, res, next) {
  // Gets all comments on the specified article
  Article.findOne({ _id: req.params.articleId })
    .populate("comments")
    .exec((err, articleFound) => {
      if (err) {
        return next(err);
      }

      if (!articleFound) {
        // Article doesn't exist, report error to user
        return res.status(404).json({ message: "Article not found" });
      } else {
        // Success, respond with the article's comment list:
        return res.json(articleFound.comments);
      }
    });
};
// Public
exports.comments_post = function (req, res, next) {
  // Adds a new comment to the specified article
  res.json({ message: "NOT IMPLEMENTED: comment list POST" });
};

// Admin only
exports.comments_put = function (req, res, next) {
  // Updates all comments on the specified article
  res.json({ message: "NOT IMPLEMENTED: comment list PUT" });
};
// Admin only
exports.comments_delete = function (req, res, next) {
  // Deletes all comments on the specified article
  res.json({ message: "NOT IMPLEMENTED: comment list DELETE" });
};

/////////////////////////////// Individual comment ////////////////////////////
// Public
exports.comment_get = function (req, res, next) {
  // Gets the specified comment on the specified article
  res.json({ message: "NOT IMPLEMENTED: comment id GET" });
};

// Admin only
exports.comment_put = function (req, res, next) {
  // Updates the specified comment on the specified article with a new one
  res.json({ message: "NOT IMPLEMENTED: comment id PUT" });
};
// Admin only
exports.comment_delete = function (req, res, next) {
  // Deletes the specified comment on the specified article
  res.json({ message: "NOT IMPLEMENTED: comment id DELETE" });
};
