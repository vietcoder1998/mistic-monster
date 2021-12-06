"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const lib_1 = require("mmc-core-chain/lib");
const api_1 = require("./api");
const app_1 = __importDefault(require("./app"));
class TestNet extends app_1.default {
    constructor(port) {
        super(port);
        this.mmc_chain = new lib_1.BlockChain();
        this.app = (0, express_1.default)();
        this.port = 8092;
        this.app.use(body_parser_1.default.json());
        this.app.get('/', async (req, res) => {
            res.send(this.mmc_chain);
        });
        this.app.post('/register', async (req, res) => {
            const { body: { private_key, data }, } = req;
            const rs = await (0, api_1.register_account)((0, lib_1.address)(64), String(private_key), data);
            res.send(rs);
        });
        this.app.get('/account', async (req, res) => {
            const rs = await (0, api_1.get_all_account_detail)();
            res.send({ acc: rs });
        });
        this.app.get('/account/:address', async (req, res) => {
            const { headers: { private_key }, params: { address }, } = req;
            const rs = await (0, api_1.get_account)(address, String(private_key));
            res.send(rs);
        });
        /// call transaction => mmc.transaction.get_account(private_key , address)
        this.app.get('/transaction/:id', (req, res) => {
            const { hash } = req.query;
            res.send({
                transaction: this.mmc_chain.get_transaction_detail(String(hash)),
            });
        });
        this.app.get('/reset', (req, res) => {
            const rs = (0, api_1.remove_database)();
            res.send(rs);
        });
        this.app.get('/txs', (req, res) => {
            res.send({
                total: this.mmc_chain._total_transaction,
                transaction: this.mmc_chain._txs,
            });
        });
        this.app.get('/nodes', (req, res) => {
            res.send({
                nodes: this.mmc_chain._nodes,
                total: this.mmc_chain._total_nodes,
            });
        });
        this.app.get('/nodes/register', (req, res) => {
            const { query: { address, host, name, id, port, pk }, } = req;
            const data = this.mmc_chain.register_node(String(address), Number(port), String(name), String(pk));
            res.send(data);
        });
        this.app.get('/block', (req, res) => {
            const { page, size } = req.query;
            const p = page ? Number(page) : 0;
            const s = size ? Number(size) : 10;
            res.send({
                block: this.mmc_chain.query(p, s),
                total: this.mmc_chain._total_block,
            });
        });
        this.app.get('/block/create', (req, res) => {
            const { query: { block }, } = req;
            const block_info = JSON.parse(Buffer.from(String(block), 'base64').toString('utf-8'));
            res.send(this.mmc_chain.add_block(block_info));
        });
        this.app.get('/register', async (req, res) => {
            const { password, seed } = req.query;
            if (!password || String(password).length < 8) {
                res.status(404).send({ msg: 'Password is error', code: 404 });
            }
            else {
                const response = this.mmc_chain.register(String(password), String(seed));
                res.status(200).send({
                    data: response,
                    msg: 'success',
                    code: 200,
                });
            }
        });
        this.app.get('/monster', (req, res) => {
            let p, s;
            const { page, size } = req.query;
            if (!page) {
                p = 0;
            }
            else {
                p = Number(page);
            }
            if (!size) {
                s = 0;
            }
            else {
                s = Number(size);
            }
            const monsters = (0, lib_1.query)(p, s, this.mmc_chain._monster);
            res.send({
                page: p,
                size: s,
                result: monsters.result,
                total: monsters.total,
            });
        });
        this.app.use(function (err, req, res, next) {
            if (err) {
                res.status(500).send(err.message);
            }
            next();
        });
        this.app.listen(this.port, () => {
            console.log('server running, ', `http://localhost:${this.port}`);
        });
    }
}
exports.default = TestNet;
