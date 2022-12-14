"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.insertProject = exports.getAll = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var projects_1 = require("../models/projects");
function isValidDate(dateString) {
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    if (!regex_date.test(dateString)) {
        return false;
    }
    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);
    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        return false;
    }
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, projects, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.body.user_id;
                if (!user_id) {
                    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, projects_1.ProjectSchema.find({ user_id: user_id })];
            case 2:
                projects = _a.sent();
                if (!projects) {
                    res.status(404).send({ message: "No projects found under current user" });
                    return [2 /*return*/];
                }
                res.status(200).send(projects);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).send({ message: 'Could not get projects from database. Please try again later.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var insertProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, project, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.body.user_id;
                if (!user_id) {
                    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
                    return [2 /*return*/];
                }
                // Validate request
                if (!req.body.title || !req.body.description || !req.body.url || !req.body.date || !req.body.skills || !req.body.languages || !req.body.contributors) {
                    res.status(400).send({ message: 'Fields can not be empty!' });
                    return [2 /*return*/];
                }
                if (!isValidDate(req.body.date)) {
                    res.status(400).send({ message: "Invalid date. Format should be: yyyy-mm-dd." });
                    return [2 /*return*/];
                }
                project = new projects_1.ProjectSchema(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project.save()];
            case 2:
                _a.sent();
                res.status(201).send(project);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(500).send({ message: 'Could not insert the new project. Please try again later.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.insertProject = insertProject;
var updateProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, project_id, project, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.body.user_id;
                if (!user_id) {
                    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
                    return [2 /*return*/];
                }
                if (!isValidDate(req.body.date)) {
                    res.status(400).send({ message: "Invalid date. Format should be: yyyy-mm-dd." });
                    return [2 /*return*/];
                }
                try {
                    project_id = new mongoose_1.default.Types.ObjectId(req.params.project_id);
                }
                catch (error) {
                    res.status(400).send({ message: 'Invalid project_id. Please try again later.' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, projects_1.ProjectSchema.findById(project_id)];
            case 1:
                project = _a.sent();
                if (!project) {
                    res.status(404).send({ message: "No project found with that project_id" });
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, projects_1.ProjectSchema.findByIdAndUpdate(project._id, req.body)];
            case 3:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.log(e_2);
                res.status(500).send({ message: 'Could not update the project. Please try again later.' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateProject = updateProject;
var deleteProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, project_id, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.body.user_id;
                if (!user_id) {
                    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
                    return [2 /*return*/];
                }
                try {
                    project_id = new mongoose_1.default.Types.ObjectId(req.params.project_id);
                }
                catch (error) {
                    res.status(400).send({ message: 'Invalid project_id. Please try again later.' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, projects_1.ProjectSchema.findById(project_id)];
            case 1:
                project = _a.sent();
                if (!project) {
                    res.status(404).send({ message: "No project found with that project_id" });
                    return [2 /*return*/];
                }
                try {
                    project.remove();
                    res.status(200).send();
                }
                catch (e) {
                    console.log(e);
                    res.status(500).send({
                        message: 'Error deleting project ' + project_id + ' from database. Please try again later.'
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deleteProject = deleteProject;
