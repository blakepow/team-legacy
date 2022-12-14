"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var contactSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    houseNumber: {
        type: Number,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    countryName: {
        type: String,
        required: true
    },
    countryCode: {
        type: Number,
        required: true
    },
    telephoneNumber: {
        type: Number,
        required: true
    }
});
exports.ContactSchema = mongoose_1.default.model('contact', contactSchema);
