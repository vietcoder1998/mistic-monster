"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushAsync = exports.hsetAsync = exports.hgetallAsync = exports.hgetAsync = void 0;
const redis_1 = __importDefault(require("redis"));
const { promisify } = require('util');
const client = redis_1.default.createClient({});
const hgetAsync = promisify(client.hget).bind(client);
exports.hgetAsync = hgetAsync;
const hsetAsync = promisify(client.hset).bind(client);
exports.hsetAsync = hsetAsync;
const hgetallAsync = promisify(client.hgetall).bind(client);
exports.hgetallAsync = hgetallAsync;
const flushAsync = promisify(client.flushall).bind(client);
exports.flushAsync = flushAsync;
