const express = require('express');
const router = express.Router();
const {
  getAllStickers,
  createSticker,
  getStickerDetails,
  updateStickerDetails,
  deleteSticker
} = require('../controllers');

const isValidId = (req, res, next) => {
  if (!isNaN(req.params.stickerId)) {
    return next();
  }
  next(new Error('Invalid id'));
};

router
  .route('/')
  .get(getAllStickers)
  .post(createSticker);

router
  .use('/:stickerId', isValidId)
  .route('/:stickerId')
  .get(getStickerDetails)
  .put(updateStickerDetails)
  .delete(deleteSticker);

module.exports = router;
