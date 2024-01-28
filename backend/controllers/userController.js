const User = require("../models/userModel.js");
const Video = require("../models/videoModel.js");
const tryCatch = require("../tryCatch.js");

const update = tryCatch(async (req, res) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    throw new Error("You can update only your account!");
  }
});

const deleteUser = tryCatch(async (req, res) => {
  if (req.params.id === req.user.id) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } else {
    throw new Error("You can delete only your account!");
  }
});

const getUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

const subscribe = tryCatch(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: 1 },
  });
  res.status(200).json("Subscription successfull.");
});

const unsubscribe = tryCatch(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: -1 },
  });
  res.status(200).json("Unsubscription successfull.");
});

const like = tryCatch(async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { likes: id },
    $pull: { dislikes: id },
  });
  res.status(200).json("The video has been liked.");
});

const dislike = tryCatch(async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: id },
    $pull: { likes: id },
  });
  res.status(200).json("The video has been disliked.");
});

module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
