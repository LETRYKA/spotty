"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const authMiddleware = async (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    try {
        const payload = await (0, clerk_sdk_node_1.verifyToken)(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });
        req.userId = payload.sub;
        next();
        res.status(401).json({ error: "Invalid token" });
        return;
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
