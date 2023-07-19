"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactController_1 = require("./ContactController");
const router = (0, express_1.Router)();
const contactController = new ContactController_1.ContactController();
router.post('/identify', contactController.identifyContacts);
exports.default = router;
