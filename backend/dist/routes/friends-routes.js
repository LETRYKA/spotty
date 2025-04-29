"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsRoute = void 0;
const express_1 = __importDefault(require("express"));
const request_friend_1 = require("../resolvers/friends/request-friend");
const accept_friend_1 = require("../resolvers/friends/accept-friend");
const remove_friend_1 = require("../resolvers/friends/remove-friend");
const list_friends_1 = require("../resolvers/friends/list-friends");
const router = express_1.default.Router();
exports.friendsRoute = router;
router.post("/request/:id", async (req, res) => {
    try {
        const userId = req.body.userId;
        const friendId = req.params.id;
        const result = await (0, request_friend_1.requestFriend)(userId, friendId);
        res.status(201).json(result);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        res.status(400).json({ error: errorMessage });
    }
});
router.post("/accept/:id", async (req, res) => {
    try {
        const userId = req.body.userId;
        const requesterId = req.params.id;
        await (0, accept_friend_1.acceptFriend)(userId, requesterId);
        res.status(200).json({ message: "Friend request accepted" });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        res.status(400).json({ error: errorMessage });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const userId = req.body.userId;
        const friendId = req.params.id;
        await (0, remove_friend_1.removeFriend)(userId, friendId);
        res.status(200).json({ message: "Friend removed" });
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        res.status(400).json({ error: errorMessage });
    }
});
router.get("/", async (req, res) => {
    try {
        const userId = req.query.userId;
        const friends = await (0, list_friends_1.listFriends)(userId);
        res.status(200).json(friends);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        res.status(400).json({ error: errorMessage });
    }
});
