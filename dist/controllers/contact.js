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
var Contact = db.contact;
var User = db.user;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Contact.find({})
                    .then(function (data) {
                    res.status(200);
                    res.send(data);
                })
                    .catch(function (err) {
                    console.log(err);
                    res.status(500).send({
                        message: 'Could not get Contacts from database. Please try again later.'
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getContact = function (req, res) {
    try {
        var contact_id_1 = mongoose.Types.ObjectId(req.params.contact_id);
        Contact.findOne({ _id: contact_id_1 })
            .then(function (data) {
            if (data === null) {
                res.status(400).send({ message: 'Could not find contact with id ' + contact_id_1 + ' in the database.' });
            }
            else {
                res.status(200).send(data);
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error getting contact from database. Please try again later.'
            });
        });
    }
    catch (_a) {
        res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
    }
};
var insertContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newContact;
    return __generator(this, function (_a) {
        try {
            // Validate request
            if (!req.body.username || !req.body.email || !req.body.password) {
                res.status(400).send({ message: 'Fields can not be empty!' });
                return [2 /*return*/];
            }
            newContact = new Contact({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            // Save newUser
            newContact
                .save()
                .then(function (data) {
                res.status(201).send({ data: data });
            })
                .catch(function (err) {
                if (err._message === 'contact validation failed') {
                    res.status(400).send({ message: err.message });
                }
                else {
                    console.log(err);
                    res.status(500).send({ message: 'Could not insert the new contact. Please try again later.' });
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Could not insert the new contact. Please try again later.' });
        }
        return [2 /*return*/];
    });
}); };
var updateContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var contact_id, contact_id_2;
    return __generator(this, function (_a) {
        try {
            contact_id = req.params.contact_id;
            if (!contact_id) {
                res.status(400).send({ message: 'contact_id field cannot be empty' });
                return [2 /*return*/];
            }
            try {
                contact_id_2 = mongoose.Types.ObjectId(req.params.contact_id);
                Contact.findOne({ _id: contact_id_2 })
                    .then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var contact, updatedUser;
                    return __generator(this, function (_a) {
                        if (data === null) {
                            res.status(400).send({ message: 'Could not find contact_id ' + contact_id_2 + ' in the database.' });
                        }
                        else {
                            contact = new User(data);
                            updatedUser = {};
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
                        }
                        return [2 /*return*/];
                    });
                }); })
                    .catch(function (err) {
                    console.log(err);
                    res.status(500).send({
                        message: 'Error getting contact from database. Please try again later.'
                    });
                });
            }
            catch (_b) {
                res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Could not insert the new contact. Please try again later.' });
        }
        return [2 /*return*/];
    });
}); };
var deleteContact = function (req, res) {
    try {
        var contact_id_3 = mongoose.Types.ObjectId(req.params.user_id);
        Contact.deleteOne({ _id: contact_id_3 })
            .then(function (data) {
            if (data.acknowledged) {
                if (data.deletedCount > 0) {
                    res.status(200).send();
                }
                else {
                    res.status(400).send({ message: 'Could not find contact_id ' + contact_id_3 + ' in the database.' });
                }
            }
            else {
                res.status(400).send({ message: 'Could not delete the contact. Not authorized.' });
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error deleting user_id ' + contact_id_3 + ' from database. Please try again later.',
            });
        });
    }
    catch (_a) {
        res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
    }
};
module.exports = { getAll: getAll, getContact: getContact, insertContact: insertContact, updateContact: updateContact, deleteContact: deleteContact };
