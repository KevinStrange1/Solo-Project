const User = require("../models/User");
const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");

let spotifyToken = "";

// exports.createUser = async (req, res) => {
//   const { name, mood, activity } = req.body;

//   try {
//     const newUser = new User({
//       name,
//       mood,
//       activity,
//     });

//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

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

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      spotifyToken = data.body.accessToken;
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
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=playlist&limit=9`;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${spotifyToken}`,
    };

    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    console.error(error); // Add this line to log the error in your server logs
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      res
        .status(400)
        .json({ message: error.message, data: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      res.status(400).json({ message: error.message, request: error.request });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
      res.status(400).json({ message: error.message });
    }
  }
};

// exports.addSearch = async (req, res) => {
//   const { name, mood, activity } = req.body;
//   try {
//     let user = await User.findOne({ name });
//     if (!user) {
//       user = new User({ name });
//     }
//     user.searches.push({ mood, activity });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
