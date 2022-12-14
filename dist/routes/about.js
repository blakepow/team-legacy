"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var about_1 = require("../controllers/about");
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.get('/:about_id', authMiddleware_1.default, about_1.getAboutById);
router.get('/', authMiddleware_1.default, about_1.getAboutByUserId);
router.post('/', authMiddleware_1.default, about_1.createAbout);
router.put('/', authMiddleware_1.default, about_1.updateAbout);
router.delete('/', authMiddleware_1.default, about_1.deleteAbout);
module.exports = router;
