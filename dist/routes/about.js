"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var about_1 = require("../controllers/about");
router.get('/:id', about_1.getAboutById);
router.get('/user/:id', about_1.getAboutByUserId);
router.post('/', about_1.createAbout);
router.put('/:id', about_1.updateAbout);
router.delete('/:id', about_1.deleteAbout);
module.exports = router;
