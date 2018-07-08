const knex = require('knex');
const config = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connection = knex(config[environment]);

const getAllStickers = () => {
  return connection('sticker');
};

const getSticker = id => {
  return connection('sticker').where('id', id);
};

const deleteSticker = id => {
  return connection('sticker')
    .where('id', id)
    .del();
};

const insertSticker = sticker => {
  return connection('sticker').insert(sticker, '*');
};

const updateSticker = (id, sticker) => {
  return connection('sticker')
    .where('id', id)
    .update(sticker, '*');
};

module.exports = {
  getAllStickers,
  getSticker,
  insertSticker,
  updateSticker,
  deleteSticker
};
