"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const svix_1 = require("svix");
const client_1 = require("@prisma/client");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/clerk", express_1.default.raw({ type: "application/json" }), async (req, res) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        if (!CLERK_WEBHOOK_SECRET) {
            console.error("CLERK_WEBHOOK_SECRET is not set");
            res.status(500).json({ error: "Server configuration error" });
            return;
        }
        const svixHeaders = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
        const webhook = new svix_1.Webhook(CLERK_WEBHOOK_SECRET);
        const payload = webhook.verify(req.body, svixHeaders);
        console.log("Verified webhook payload:", JSON.stringify(payload, null, 2));
        if (payload.type === "user.created") {
            const { id, email_addresses, username, first_name, last_name, password_enabled, } = payload.data;
            const email = ((_a = email_addresses[0]) === null || _a === void 0 ? void 0 : _a.email_address) || "unknown@example.com";
            const name = `${first_name || ""} ${last_name || ""}`.trim() ||
                username ||
                "Unknown";
            const isVerified = ((_c = (_b = email_addresses[0]) === null || _b === void 0 ? void 0 : _b.verification) === null || _c === void 0 ? void 0 : _c.status) === "verified" || false;
            // Prevent duplicate users
            const existingUser = await prisma.user.findUnique({ where: { id } });
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        id,
                        email,
                        name,
                        password: "",
                        isVerified,
                    },
                });
                console.log(`User created in database: ${id}, isVerified: ${isVerified}`);
            }
            else {
                console.log(`User ${id} already exists`);
            }
        }
        if (payload.type === "user.updated") {
            const { id, email_addresses, username, first_name, last_name } = payload.data;
            const email = ((_d = email_addresses[0]) === null || _d === void 0 ? void 0 : _d.email_address) || "unknown@example.com";
            const name = `${first_name || ""} ${last_name || ""}`.trim() ||
                username ||
                "Unknown";
            const isVerified = ((_f = (_e = email_addresses[0]) === null || _e === void 0 ? void 0 : _e.verification) === null || _f === void 0 ? void 0 : _f.status) === "verified" || false;
            await prisma.user.update({
                where: { id },
                data: {
                    email,
                    name,
                    isVerified,
                },
            });
            console.log(`User updated in database: ${id}, isVerified: ${isVerified}`);
        }
        if (payload.type === "email_address.verified") {
            const { email_address } = payload.data;
            // Find user by email
            const user = await prisma.user.findFirst({
                where: { email: email_address },
            });
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { isVerified: true },
                });
                console.log(`Email verified for user: ${user.id}, email: ${email_address}`);
            }
            else {
                console.log(`No user found for email: ${email_address}`);
            }
        }
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Webhook error:", error);
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.default = router;
