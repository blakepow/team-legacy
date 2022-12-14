"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var aboutSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    skills: {
        type: [String],
    },
    education: {
        type: [String],
    },
    experience: {
        type: [String],
    },
    projects: {
        type: [String],
    },
    interests: {
        type: [String],
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});
exports.AboutSchema = mongoose_1.default.model('about', aboutSchema);
