"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const webhooks_1 = __importDefault(require("./routes/webhooks"));
const user_routes_1 = require("./routes/user-routes");
const friends_routes_1 = require("./routes/friends-routes");
const stories_routes_1 = require("./routes/stories-routes");
const location_routes_1 = require("./routes/location-routes");
const events_routes_1 = require("./routes/events-routes");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 8000;
const allowedOrigins = ["http://localhost:3000"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// Apply express.json() only to non-webhook routes
app.use((req, res, next) => {
    if (req.path.startsWith("/api/webhooks")) {
        return next(); // Skip express.json() for webhook routes
    }
    return express_1.default.json()(req, res, next); // Apply express.json() for other routes
});
// Routes
app.use("/api/users", user_routes_1.userRoute);
app.use("/api/friends", friends_routes_1.friendsRoute);
app.use("/api/location", location_routes_1.locationRoute);
app.use("/api/stories", stories_routes_1.storiesRoute);
app.use("/api/events", events_routes_1.eventsRoute);
app.use("/api/webhooks", webhooks_1.default);
app.get("/api", (req, res) => {
    res.send("API is running...");
});
app.listen(port, async () => {
    console.log(`💀 Server is running on port ${port}`);
});
