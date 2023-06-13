const User = require('../models/User');
const axios = require('axios');
const qs = require('qs');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

let spotifyToken = '';

exports.createUser = async (req, res) => {
  const { name, mood, activity } = req.body;

  try {
    const newUser = new User({
      name,
      mood,
      activity,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      spotifyToken = data.body.access_token;
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};

exports.refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi.refreshAccessToken();
  spotifyToken = data.body.accessToken
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.searchSpotify = async (req, res) => {
  try {
    const { mood, activity } = req.params;
    const query = `${mood} ${activity}`;
    const url = `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=6`;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifyToken}`,
    };

    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addSearch = async (req, res) => {
  const { name, mood, activity } = req.body;
  try {
    let user = await User.findOne({ name });
    if (!user) {
      user = new User({ name });
    }
    user.searches.push({ mood, activity });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
