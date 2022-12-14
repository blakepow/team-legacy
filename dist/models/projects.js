"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var projectSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    url: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        required: true,
        unique: false
    },
    skills: {
        type: Array,
        required: true,
        unique: false
    },
    languages: {
        type: Array,
        required: true,
        unique: false
    },
    contributors: {
        type: Array,
        required: true,
        unique: false
    }
});
exports.ProjectSchema = mongoose_1.default.model('projects', projectSchema);
