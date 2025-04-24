import express from "express";
import { requestFriend } from "../resolvers/friends/request-friend";
import { acceptFriend } from "../resolvers/friends/accept-friend";
import { removeFriend } from "../resolvers/friends/remove-friend";
import { listFriends } from "../resolvers/friends/list-friends";

const router = express.Router();

router.post("/request/:id", requestFriend);
router.post("/accept/:id", acceptFriend);
router.delete("/:id", removeFriend);
router.get("/", listFriends);

export { router as friendsRoute };
