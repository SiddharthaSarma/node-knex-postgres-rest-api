const express = require('express');
const router = express.Router();
const {
  getAllStickers,
  createSticker,
  getStickerDetails,
  updateStickerDetails,
  deleteSticker
} = require('../controllers');

router
  .route('/')
  .get(getAllStickers)
  .post(createSticker);

router
  .route('/:stickerId')
  .get(getStickerDetails)
  .put(updateStickerDetails)
  .delete(deleteSticker);

module.exports = router;
