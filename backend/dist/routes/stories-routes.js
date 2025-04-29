"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storiesRoute = void 0;
const express_1 = __importDefault(require("express"));
// import { getUsername } from "../resolvers/user-profile/get-username"; example import
exports.storiesRoute = express_1.default.Router();
// storiesRoute.get("/stories", getUsername); Example route
