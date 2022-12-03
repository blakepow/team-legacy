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
var User = db.user;
var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcryptjs');
var getAll = function (req, res) {
    User.find({})
        .then(function (data) {
        res.status(200);
        res.send(data);
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).send({
            message: 'Could not get users from database. Please try again later.'
        });
    });
};
var getSingle = function (req, res) {
    try {
        var user_id_1 = mongoose.Types.ObjectId(req.params.user_id);
        User.findOne({ _id: user_id_1 })
            .then(function (data) {
            if (data === null) {
                res.status(400).send({ message: 'Could not find user with id ' + user_id_1 + ' in the database.' });
            }
            else {
                res.status(200).send(data);
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error getting user from database. Please try again later.'
            });
        });
    }
    catch (_a) {
        res.status(400).send({ message: 'Invalid user_id. Please try again.' });
    }
};
var insertUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, passwordValidation, salt, _a, err_1, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                // Validate request
                if (!req.body.username || !req.body.email || !req.body.password) {
                    res.status(400).send({ message: 'Fields can not be empty!' });
                    return [2 /*return*/];
                }
                newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                passwordValidation = newUser.isValidPassword(req.body.password);
                if (passwordValidation.length > 0) {
                    res.status(400).send({ message: 'Invalid password:', details: passwordValidation });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, bcrypt.genSalt(SALT_WORK_FACTOR)];
            case 2:
                salt = _b.sent();
                _a = newUser;
                return [4 /*yield*/, bcrypt.hash(newUser.password, salt)];
            case 3:
                _a.password = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
                return [2 /*return*/];
            case 5:
                // Save newUser
                newUser
                    .save()
                    .then(function (data) {
                    res.status(201).send(data);
                })
                    .catch(function (err) {
                    if (err._message === 'user validation failed') {
                        res.status(400).send({ message: err.message });
                    }
                    else {
                        console.log(err);
                        res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
                    }
                });
                return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                console.log(err_2);
                res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, user_id_2;
    return __generator(this, function (_a) {
        try {
            user_id = req.params.user_id;
            if (!user_id) {
                res.status(400).send({ message: 'user_id field cannot be empty' });
                return [2 /*return*/];
            }
            try {
                user_id_2 = mongoose.Types.ObjectId(req.params.user_id);
                User.findOne({ _id: user_id_2 })
                    .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var user, updatedUser, valid;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(data === null)) return [3 /*break*/, 1];
                                res.status(400).send({ message: 'Could not find user_id ' + user_id_2 + ' in the database.' });
                                return [3 /*break*/, 4];
                            case 1:
                                user = new User(data);
                                updatedUser = {};
                                if (!req.body.password) return [3 /*break*/, 3];
                                return [4 /*yield*/, user.validatePassword(req.body.password)];
                            case 2:
                                valid = _a.sent();
                                if (valid) {
                                    res.status(400).send({ message: 'New password cannot be the same as the old password.' });
                                    return [2 /*return*/];
                                }
                                updatedUser.password = req.body.password;
                                _a.label = 3;
                            case 3:
                                if (req.body.email && req.body.email !== user.email)
                                    updatedUser.email = req.body.email;
                                if (req.body.username && req.body.username !== user.username)
                                    updatedUser.username = req.body.username;
                                Object.assign(data, updatedUser);
                                data.save()
                                    .then(function (data) {
                                    res.status(204).send();
                                })
                                    .catch(function (err) {
                                    if (err._message === 'user validation failed') {
                                        res.status(400).send({ message: err.message });
                                    }
                                    else {
                                        console.log(err);
                                        res.status(500).send({ message: 'Could not update the user. Please try again later.' });
                                    }
                                });
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (err) {
                    console.log(err);
                    res.status(500).send({
                        message: 'Error getting user from database. Please try again later.'
                    });
                });
            }
            catch (_b) {
                res.status(400).send({ message: 'Invalid user_id. Please try again.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Could not insert the new user. Please try again later.' });
        }
        return [2 /*return*/];
    });
}); };
var deleteUser = function (req, res) {
    try {
        var user_id_3 = mongoose.Types.ObjectId(req.params.user_id);
        User.deleteOne({ _id: user_id_3 })
            .then(function (data) {
            if (data.acknowledged) {
                if (data.deletedCount > 0) {
                    res.status(200).send();
                }
                else {
                    res.status(400).send({ message: 'Could not find user_id ' + user_id_3 + ' in the database.' });
                }
            }
            else {
                res.status(400).send({ message: 'Could not delete the user. Not authorized.' });
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error deleting user_id ' + user_id_3 + ' from database. Please try again later.',
            });
        });
    }
    catch (_a) {
        res.status(400).send({ message: 'Invalid user_id. Please try again.' });
    }
};
module.exports = { getAll: getAll, getSingle: getSingle, insertUser: insertUser, updateUser: updateUser, deleteUser: deleteUser };
