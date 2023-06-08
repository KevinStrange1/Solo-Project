const express = require('express');
const router = express.Router();
const { createUser, getSpotifyToken } = require('./controllers/userController');

router.post('/', createUser);
router.get('/spotify-token', getSpotifyToken);

module.exports = router;
