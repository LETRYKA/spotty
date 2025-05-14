import express from "express";
import { requestFriend } from "../resolvers/friends/request-friend";
import { acceptFriend } from "../resolvers/friends/accept-friend";
import { removeFriend } from "../resolvers/friends/remove-friend";
import { listFriends } from "../resolvers/friends/list-friends";
import { listRequestedFriends } from "../resolvers/friends/list-requested-friends";
import { listPendingRequests } from "../resolvers/friends/list-pending-request";

const router = express.Router();

router.get("/:id", listFriends);
router.post("/request/:id", requestFriend);
router.post("/accept/:id", acceptFriend);
router.delete("/:id", removeFriend);
router.get("/requested/:id", listRequestedFriends);
router.get("/pending/:id", listPendingRequests);

export { router as friendsRoute };
