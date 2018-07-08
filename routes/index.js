const express = require('express');
const router = express.Router();
const db = require('../db');

const validSticker = sticker => {
  const hasTitle =
    typeof sticker.title == 'string' && sticker.title.trim() != '';
  const hasURL = typeof sticker.url == 'string' && sticker.url.trim() != '';
  const hasDescription =
    typeof sticker.description == 'string' && sticker.description.trim() != '';
  const hasRating = !isNaN(sticker.rating);
  return hasTitle && hasDescription && hasURL && hasRating;
};

router.get('/', (_, res) => {
  db.getAllStickers().then(stickers => res.json(stickers));
});
router.get('/:stickerId', (req, res) => {
  db.getSticker(req.params.stickerId).then(sticker => res.json(sticker));
});
router.delete('/:stickerId', (req, res) => {
  db.deleteSticker(req.params.stickerId).then(sticker => res.json(sticker));
});
router.put('/:stickerId', (req, res, next) => {
  if (validSticker(req.body)) {
    db.updateSticker(req.params.stickerId, req.body).then(stickers => {
      res.json(stickers[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});
router.post('/', (req, res, next) => {
  if (!validSticker(req.body)) {
    next(new Error('Invalid sticker'));
  }
  const { title, description, rating, url } = req.body;
  const data = {
    title,
    description,
    rating,
    url
  };
  db.insertSticker(data).then(sticker => res.json(sticker));
});

module.exports = router;
