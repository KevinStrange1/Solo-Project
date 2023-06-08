const User = require('../models/User');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

let spotifyToken = '';

const refreshSpotifyToken = async () => {
  try {
    const url = 'https://accounts.spotify.com/api/token';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
        ).toString('base64'),
    };

    const data = qs.stringify({
      grant_type: 'client_credentials',
    });

    const response = await axios.post(url, data, { headers });
    spotifyToken = response.data.access_token;

    setTimeout(refreshSpotifyToken, (response.data.expires_in - 300) * 1000);
  } catch (error) {
    console.error(error);
    setTimeout(refreshSpotifyToken, 60 * 1000);
  }
};

refreshSpotifyToken();

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

exports.getSpotifyToken = async (req, res) => {
  res.json({ access_token: spotifyToken });
};
