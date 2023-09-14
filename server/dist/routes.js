"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const router = express_1.default.Router();
exports.router = router;
// router.post("/", createUser);
router.get('/spotify-search/:mood/:activity', userController_1.searchSpotify);
// router.post('/add-search', addSearch);
router.post('/login', userController_1.login);
router.post('/refresh', userController_1.refresh);
