const router = require("express").Router();
const postController = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer();

//CRUD POST
router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

//LIKE
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

module.exports = router;
