"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    searches: [
        {
            mood: {
                type: String,
                required: true,
            },
            activity: {
                type: String,
                required: true,
            },
        },
    ],
});
const User = mongoose_1.default.model('User', UserSchema);
exports.User = User;
