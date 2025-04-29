"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const get_user_1 = require("../resolvers/user-profile/get-user");
exports.userRoute = express_1.default.Router();
exports.userRoute.get('/me', get_user_1.getUsers);
