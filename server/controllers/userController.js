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
  } catch (error) {
    console.error(`Error refreshing Spotify token: ${error.message}`);
  }
};

refreshSpotifyToken();

setInterval(refreshSpotifyToken, 1000 * 60 * 60);

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
  try {
    res.json({ access_token: spotifyToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
