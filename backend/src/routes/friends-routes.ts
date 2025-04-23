import express from "express";
import { requestFriend } from "../resolvers/friends/request-friend";
import { acceptFriend } from "../resolvers/friends/accept-friend";
import { removeFriend } from "../resolvers/friends/remove-friend";
import { listFriends } from "../resolvers/friends/list-friends";

const router = express.Router();

router.post("/request/:id", async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendId = req.params.id;
    const result = await requestFriend(userId, friendId);
    res.status(201).json(result);
  } catch (err: any) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
});

router.post("/accept/:id", async (req, res) => {
  try {
    const userId = req.body.userId;
    const requesterId = req.params.id;
    await acceptFriend(userId, requesterId);
    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendId = req.params.id;
    await removeFriend(userId, friendId);
    res.status(200).json({ message: "Friend removed" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId as string;
    const friends = await listFriends(userId);
    res.status(200).json(friends);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
});

export { router as friendsRoute };
