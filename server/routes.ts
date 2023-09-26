const express = require('express');
import {
  // createUser,
  searchSpotify,
  // addSearch,
  login,
  refresh,
} from './controllers/userController';

const router = express.Router();

// router.post("/", createUser);
router.get('/spotify-search/:mood/:activity', searchSpotify);
// router.post('/add-search', addSearch);
router.post('/login', login);
router.post('/refresh', refresh);

module.exports = router;
