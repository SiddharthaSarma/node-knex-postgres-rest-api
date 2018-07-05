const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (_, res) => {
  db.getAllStickers().then(stickers => res.json(stickers));
});
router.get('/:stickerId', (req, res) => {
  db.getSticker(req.params.stickerId).then(sticker => res.json(sticker));
});
router.delete('/:stickerId', (req, res) => {
  db.deleteSticker(req.params.stickerId).then(sticker => res.json(sticker));
});

module.exports = router;
