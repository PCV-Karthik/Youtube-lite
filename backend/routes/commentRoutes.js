const router = require("express").Router();
const { addComment, deleteComment, getComments } = require("../controllers/commentController.js");
const verifyToken = require("../middleware/verifyToken.js");

router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

module.exports = router;