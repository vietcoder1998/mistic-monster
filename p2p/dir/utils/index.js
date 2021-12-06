"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
function encode(data, private_key) {
    try {
        const input = JSON.stringify(data);
        const result = crypto_js_1.default.AES.encrypt(input, private_key || 'no_private_key').toString();
        return result;
    }
    catch (error) {
        console.log(error);
        return '';
    }
}
exports.encode = encode;
function decode(data, private_key) {
    try {
        const output = crypto_js_1.default.AES.encrypt(data, private_key || 'no_private_key', crypto_js_1.default.enc.Utf8).toString();
        const result = JSON.parse(output);
        return result;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}
exports.decode = decode;
