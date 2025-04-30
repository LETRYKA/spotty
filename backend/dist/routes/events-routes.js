"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRoute = void 0;
const express_1 = __importDefault(require("express"));
const get_event_id_1 = __importDefault(require("../resolvers/events/get-event-id"));
const get_all_events_1 = __importDefault(require("../resolvers/events/get-all-events"));
const create_event_1 = __importDefault(require("../resolvers/events/create-event"));
exports.eventsRoute = express_1.default.Router();
exports.eventsRoute.post("/", create_event_1.default);
exports.eventsRoute.get("/:id", get_event_id_1.default);
exports.eventsRoute.get("/", get_all_events_1.default);
