var express = require("express");
var router = express.Router();
const articleController = require("../controllers/articleController");

////////////////////////////// Article List ///////////////////////////////////
router.get("/", articleController.articles_get);
router.post("/", articleController.articles_post);
router.put("/", articleController.articles_put);
router.delete("/", articleController.articles_delete);

/////////////////////////// Individual Article ////////////////////////////////
router.get("/:articleId", articleController.article_get);
router.put("/:articleId", articleController.article_put);
router.delete("/:articleId", articleController.article_delete);

////////////////////////////// Comment List ///////////////////////////////////
router.get("/:articleId/comments", articleController.comments_get);
router.post("/:articleId/comments", articleController.comments_post);
router.put("/:articleId/comments", articleController.comments_put);
router.delete("/:articleId/comments", articleController.comments_delete);

/////////////////////////// Individual Comments ///////////////////////////////
router.get("/:articleId/comments/:commentId", articleController.comment_get);
router.put("/:articleId/comments/:commentId", articleController.comment_put);
router.delete(
  "/:articleId/comments/:commentId",
  articleController.comment_delete
);

module.exports = router;
