const express = require('express');
const router = express.Router();
const {
  createUser,
  getSpotifyToken,
  searchSpotify,
  addSearch,
} = require('./controllers/userController');

router.post('/', createUser);
router.get('/spotify-token', getSpotifyToken);
router.get('/spotify-search/:mood/:activity', searchSpotify);
router.post('/add-search', addSearch);

module.exports = router;
