const router = require("express").Router();
const { createPost, getPost, deletePost, editPost, getUserPosts, createComment, getComments, deleteComment, likePost, likeComment } = require("../controller/post");
const { protect } = require("../guards/protectroutes");

router.post("/createPost", protect, createPost);
router.get("/post/:id", protect, getPost);
router.get("/userposts/:id", protect, getUserPosts);
router.delete("/deletePost/:id", protect, deletePost);
router.put("/editPost/:id", protect, editPost);
router.post("/createComment/:id", protect, createComment);
router.get("/Comments/:id", protect, getComments);
router.delete("/deleteComment/:id", protect, deleteComment);
router.put("/like/:id", protect, likePost);
router.put("/likeComment/:id", protect, likeComment);

module.exports = router;