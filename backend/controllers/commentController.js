const Comment = require("../models/commentModel.js");
const Video = require("../models/videoModel.js");
const tryCatch = require("../tryCatch.js");

 const addComment = tryCatch(async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
});

 const deleteComment = async (req, res, next) => {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      throw new Error("You can only delete your comment!");
    }
};

 const getComments = tryCatch(async (req, res, next) => {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({createdAt:-1});
    res.status(200).json(comments);
});

module.exports = {addComment,deleteComment,getComments}