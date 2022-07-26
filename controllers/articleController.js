// import models here later

//////////////////// Article List (all articles) //////////////////////////////
// Public
exports.articles_get = function (req, res, next) {
  // Gets the article list
  res.json({ message: "NOT IMPLEMENTED: article list GET" });
};

// Admin only
exports.articles_post = function (req, res, next) {
  // Adds a new article to the list
  res.json({ message: "NOT IMPLEMENTED: article list POST" });
};
// Admin only
exports.articles_put = function (req, res, next) {
  // Updates the article list with a new one
  res.json({ message: "NOT IMPLEMENTED: article list PUT" });
};
// Admin only
exports.articles_delete = function (req, res, next) {
  // Deletes all articles
  res.json({ message: "NOT IMPLEMENTED: article list DELETE" });
};

//////////////////////////// Individual Articles //////////////////////////////
// Public
exports.article_get = function (req, res, next) {
  res.json({ message: "NOT IMPLEMENTED: article id GET" });
};

// Admin only
exports.article_put = function (req, res, next) {
  // Updates the specified article with a new one
  res.json({ message: "NOT IMPLEMENTED: article id PUT" });
};
// Admin only
exports.article_delete = function (req, res, next) {
  // Deletes the specified article
  res.json({ message: "NOT IMPLEMENTED: article id DELETE" });
};

///////////// Comment list (all comments on a particular article) /////////////
// Public
exports.comments_get = function (req, res, next) {
  // Gets all comments on the specified article
  res.json({ message: "NOT IMPLEMENTED: comment list GET" });
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
