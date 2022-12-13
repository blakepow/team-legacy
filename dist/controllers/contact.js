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
var getContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = mongoose.Types.ObjectId(req.params.user_id);
                if (!user_id) {
                    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Contact.findOne({ _id: user_id })
                        .then(function (data) {
                        res.status(200);
                        res.send(data);
                    })
                        .catch(function (err) {
                        console.log(err);
                        res.status(500).send({
                            message: 'Could not get contact details from database. Please try again later.'
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var insertContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, newContact;
    return __generator(this, function (_a) {
        user_id = mongoose.Types.ObjectId(req.params.user_id);
        if (!user_id) {
            res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
            return [2 /*return*/];
        }
        try {
            // Validate request
            if (!req.body.houseNumber || !req.body.streetName || !req.body.cityName || !req.body.countryName || !req.body.countryCode || !req.body.telephoneNumber) {
                res.status(400).send({ message: 'Fields can not be empty!' });
                return [2 /*return*/];
            }
            newContact = new Contact({
                _id: user_id,
                houseNumber: req.body.houseNumber,
                streetName: req.body.streetName,
                cityName: req.body.cityName,
                countryName: req.body.countryName,
                countryCode: req.body.countryCod,
                telephoneNumber: req.body.telephoneNumber,
            });
            // Save newContact
            newContact
                .save()
                .then(function (data) {
                res.status(201).send({ data: data });
            })
                .catch(function (err) {
                console.log(err);
                res.status(500).send({ message: 'Could not add contact details. Please try again later.' });
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Could not add contact details. Please try again later.' });
        }
        return [2 /*return*/];
    });
}); };
var updateContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = mongoose.Types.ObjectId(req.params.user_id);
                if (!user_id) {
                    res.status(400).send({ message: 'Invalid authentication. Please try again later.' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Contact.findOne({ _id: user_id })
                        .then(function (data) {
                        if (!data) { // Save the contact if not found
                            // Validate request
                            if (!req.body.houseNumber || !req.body.streetName || !req.body.cityName || !req.body.countryName || !req.body.countryCode || !req.body.telephoneNumber) {
                                res.status(400).send({ message: 'Fields can not be empty!' });
                                return;
                            }
                            var newContact = new Contact({
                                _id: user_id,
                                houseNumber: req.body.houseNumber,
                                streetName: req.body.streetName,
                                cityName: req.body.cityName,
                                countryName: req.body.countryName,
                                countryCode: req.body.countryCod,
                                telephoneNumber: req.body.telephoneNumber,
                            });
                            // Save newContact
                            newContact
                                .save()
                                .then(function (data) {
                                res.status(204).send();
                            })
                                .catch(function (err) {
                                console.log(err);
                                res.status(500).send({ message: 'Could not add contact details. Please try again later.' });
                            });
                        }
                        else { // Update the contact if found
                            var updatedContact = {};
                            if (req.body.houseNumber) {
                                updatedContact.title = req.body.houseNumber;
                            }
                            if (req.body.streetName) {
                                updatedContact.description = req.body.streetName;
                            }
                            if (req.body.cityName) {
                                updatedContact.url = req.body.cityName;
                            }
                            if (req.body.countryName) {
                                updatedContact.title = req.body.countryName;
                            }
                            if (req.body.countryCode) {
                                updatedContact.skills = req.body.countryCode;
                            }
                            if (req.body.telephoneNumber) {
                                updatedContact.languages = req.body.telephoneNumber;
                            }
                            Object.assign(data, updatedContact);
                            data.save()
                                .then(function (data) {
                                res.status(204).send();
                            })
                                .catch(function (err) {
                                console.log(err);
                                res.status(500).send({ message: 'Could not update contact deatils. Please try again later.' });
                            });
                        }
                    })
                        .catch(function (err) {
                        console.log(err);
                        res.status(500).send({
                            message: 'Could not get contact details from database. Please try again later.'
                        });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500).send({ message: 'Could not update contact details. Please try again later.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteContact = function (req, res) {
    if (!req.params.contact_id) {
        res.status(400).send({ message: 'You must provide a contact_id' });
        return;
    }
    try {
        var contact_id_1 = mongoose.Types.ObjectId(req.params.contact_id);
        Contact.deleteOne({ _id: contact_id_1 })
            .then(function (data) {
            if (data.acknowledged) {
                if (data.deletedCount > 0) {
                    res.status(200).send();
                }
                else {
                    res.status(400).send({ message: 'Could not find contact_id ' + contact_id_1 + ' in the database.' });
                }
            }
            else {
                res.status(400).send({ message: 'Could not delete the user. Not authorized.' });
            }
        })
            .catch(function (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error deleting contact details ' + contact_id_1 + ' from database. Please try again later.',
            });
        });
    }
    catch (_a) {
        res.status(400).send({ message: 'Invalid contact_id. Please try again.' });
    }
};
module.exports = { getContact: getContact, insertContact: insertContact, updateContact: updateContact, deleteContact: deleteContact };
