"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSpotify = exports.refresh = exports.login = void 0;
// const User = require('../models/User');
const axios_1 = __importDefault(require("axios"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    const spotifyApi = new spotify_web_api_node_1.default({
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
});
exports.login = login;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new spotify_web_api_node_1.default({
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
});
exports.refresh = refresh;
const searchSpotify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mood, activity } = req.params;
        const query = `${mood} ${activity}`;
        // const url = `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=9`;
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=9`;
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${spotifyToken}`,
        };
        const response = yield axios_1.default.get(url, { headers });
        res.json(response.data);
    }
    catch (err) {
        const error = err;
        console.error(error);
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.headers);
            res
                .status(400)
                .json({ message: error.message, data: error.response.data });
        }
        else if (error.request) {
            console.error(error.request);
            res.status(400).json({ message: error.message, request: error.request });
        }
        else {
            console.error('Error', error.message);
            res.status(400).json({ message: error.message });
        }
    }
});
exports.searchSpotify = searchSpotify;
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
