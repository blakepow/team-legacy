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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var db = require('../models');
var Projects = db.projects;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = mongoose.Types.ObjectId(req.params.user_id);
                return [4 /*yield*/, Projects.find({ user_id: user_id }).select('-user_id')
                        .then(function (data) {
                        res.status(200);
                        res.send(data);
                    })
                        .catch(function (err) {
                        console.log(err);
                        res.status(500).send({
                            message: 'Could not get projects from database. Please try again later.'
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var insertProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newProject;
    return __generator(this, function (_a) {
        try {
            // Validate request
            if (!req.body.title || !req.body.description || !req.body.url || !req.body.date || !req.body.skills || !req.body.languages || !req.body.contributors) {
                res.status(400).send({ message: 'Fields can not be empty!' });
                return [2 /*return*/];
            }
            newProject = new Projects({
                user_id: req.params.user_id,
                title: req.body.title,
                description: req.body.description,
                url: req.body.url,
                date: req.body.date,
                skills: req.body.skills,
                languages: req.body.languages,
                contributors: req.body.contributors
            });
            // Save newProject
            newProject
                .save()
                .then(function (data) {
                res.status(201).send({ data: data });
            })
                .catch(function (err) {
                console.log(err);
                res.status(500).send({ message: 'Could not insert the new project. Please try again later.' });
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Could not insert the new project. Please try again later.' });
        }
        return [2 /*return*/];
    });
}); };
var updateProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, project_id_1;
    return __generator(this, function (_a) {
        if (!req.params.project_id) {
            res.status(400).send({ message: 'You must provide a project_id' });
            return [2 /*return*/];
        }
        try {
            user_id = req.params.user_id;
            if (!user_id) {
                res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
                return [2 /*return*/];
            }
            try {
                project_id_1 = mongoose.Types.ObjectId(req.params.project_id);
                Projects.findOne({ _id: project_id_1, user_id: user_id })
                    .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var updatedProject;
                    return __generator(this, function (_a) {
                        if (data === null) {
                            res.status(400).send({ message: 'Could not find project_id ' + project_id_1 + ' in the database.' });
                        }
                        else {
                            updatedProject = {};
                            if (req.body.title) {
                                updatedProject.title = req.body.title;
                            }
                            if (req.body.description) {
                                updatedProject.description = req.body.description;
                            }
                            if (req.body.url) {
                                updatedProject.url = req.body.url;
                            }
                            if (req.body.date) {
                                updatedProject.title = req.body.date;
                            }
                            if (req.body.skills) {
                                updatedProject.skills = req.body.skills;
                            }
                            if (req.body.languages) {
                                updatedProject.languages = req.body.languages;
                            }
                            if (req.body.contributors) {
                                updatedProject.contributors = req.body.contributors;
                            }
                            Object.assign(data, updatedProject);
                            data.save()
                                .then(function (data) {
                                res.status(204).send();
                            })
                                .catch(function (err) {
                                console.log(err);
                                res.status(500).send({ message: 'Could not update the project. Please try again later.' });
                            });
                        }
                        return [2 /*return*/];
                    });
                }); })
                    .catch(function (err) {
                    console.log(err);
                    res.status(500).send({
                        message: 'Error getting project from database. Please try again later.'
                    });
                });
            }
            catch (_b) {
                res.status(400).send({ message: 'Invalid project_id. Please try again.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Could not update the project. Please try again later.' });
        }
        return [2 /*return*/];
    });
}); };
var deleteProject = function (req, res) {
    if (!req.params.project_id) {
        res.status(400).send({ message: 'You must provide a project_id' });
        return;
    }
    try {
        var project_id_2 = mongoose.Types.ObjectId(req.params.project_id);
        Projects.deleteOne({ _id: project_id_2 })
            .then(function (data) {
            if (data.acknowledged) {
                if (data.deletedCount > 0) {
                    res.status(200).send();
                }
                else {
                    res.status(400).send({ message: 'Could not find project_id ' + project_id_2 + ' in the database.' });
                }
            }
            else {
                res.status(400).send({ message: 'Could not delete the user. Not authorized.' });
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error deleting project ' + project_id_2 + ' from database. Please try again later.',
            });
        });
    }
    catch (_a) {
        res.status(400).send({ message: 'Invalid project_id. Please try again.' });
    }
};
module.exports = { getAll: getAll, insertProject: insertProject, updateProject: updateProject, deleteProject: deleteProject };
