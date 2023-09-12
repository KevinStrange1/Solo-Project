// const User = require('../models/User');
import axios, { AxiosError } from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import { Request, Response } from 'express';

let spotifyToken = '';

// export const createUser = async (req, res) => {
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

export const login = async (req: Request, res: Response) => {
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
      console.log(err);
      res.sendStatus(400);
    });
};

export const refresh = async (req: Request, res: Response) => {
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
      spotifyToken = data.body.access_token;
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

export const searchSpotify = async (req: Request, res: Response) => {
  try {
    const { mood, activity } = req.params;
    const query = `${mood} ${activity}`;
    // const url = `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=9`;
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=playlist&limit=9`;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${spotifyToken}`,
    };

    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.headers);
      res
        .status(400)
        .json({ message: error.message, data: error.response.data });
    } else if (error.request) {
      console.error(error.request);
      res.status(400).json({ message: error.message, request: error.request });
    } else {
      console.error('Error', error.message);
      res.status(400).json({ message: error.message });
    }
  }
};

// export const addSearch = async (req, res) => {
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
