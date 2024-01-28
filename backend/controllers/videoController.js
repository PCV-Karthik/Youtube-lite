const User = require("../models/userModel.js");
const Video = require("../models/videoModel.js");
const tryCatch = require("../tryCatch.js");

const addVideo = tryCatch(async (req, res) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  const savedVideo = await newVideo.save();
  res.status(200).json(savedVideo);
});

const updateVideo = tryCatch(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) throw new Error("Video not found!");
  if (req.user.id === video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } else {
    throw new Error("You can update only your video!");
  }
});

const deleteVideo = tryCatch(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) throw new Error("Video not found!");
  if (req.user.id === video.userId) {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("The video has been deleted.");
  } else {
    throw new Error("You can delete only your video!");
  }
});

const getVideo = tryCatch(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.status(200).json(video);
});

const addView = tryCatch(async (req, res, next) => {
  await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  });
  res.status(200).json("The view has been increased.");
});

const random = tryCatch(async (req, res, next) => {
  const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
  res.status(200).json(videos);
});

const trend = tryCatch(async (req, res, next) => {
  const videos = await Video.find().sort({ views: -1 });
  res.status(200).json(videos);
});

const sub = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const subscribedChannels = user.subscribedUsers;

  const list = await Promise.all(
    subscribedChannels.map(async (channelId) => {
      return await Video.find({ userId: channelId });
    })
  );

  res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
});

const getByTag = tryCatch(async (req, res, next) => {
  const tags = req.query.tags.split(",");
  const videoId = req.query.id;
  const videos = await Video.find({
    $and: [{ _id: { $ne: videoId } }, { tags: { $in: tags } }],
  }).limit(20);
  res.status(200).json(videos);
});

const search = tryCatch(async (req, res, next) => {
  const query = req.query.q;
  const videos = await Video.find({
    title: { $regex: query, $options: "i" },
  }).limit(40);
  res.status(200).json(videos);
});

module.exports = {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  random,
  trend,
  sub,
  getByTag,
  search,
};
