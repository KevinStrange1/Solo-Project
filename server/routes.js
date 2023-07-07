const express = require("express");
const router = express.Router();
const {
  // createUser,
  searchSpotify,
  // addSearch,
  login,
  refresh,
} = require("./controllers/userController");

// router.post("/", createUser);
router.get("/spotify-search/:mood/:activity", searchSpotify);
// router.post('/add-search', addSearch);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
