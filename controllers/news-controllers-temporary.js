const { ctrlWrapper } = require("../utils");
const { News } = require("../models/news-temporary");
// const { HttpError } = require("../helpers");

const allNews = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const hits = await News.find({}, null, {
    skip,
    limit,
  }).sort({ date: -1 });

  const totalHits = await News.count();
  res.json({ totalHits, hits });
};

module.exports = {
  allNews: ctrlWrapper(allNews),
};
