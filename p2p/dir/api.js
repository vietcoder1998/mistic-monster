"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_database = exports.get_account = exports.set_private_key = exports.validate_account = exports.register_account = exports.get_all_account_detail = exports.add_tx_to_block = exports.get_block = exports.save_block = exports.set_account = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const lib_1 = require("mmc-core-chain/lib");
const redis_1 = require("./redis");
const utils_1 = require("./utils");
async function set_account(address, private_key, account) {
    try {
        const is_valid = await validate_account(address, private_key);
        if (is_valid) {
            const encrypt = crypto_js_1.default.AES.encrypt(JSON.stringify(account), private_key).toString();
            await (0, redis_1.hsetAsync)(lib_1.Store.privacy, address, encrypt);
            return {
                code: lib_1.Code.success,
                msg: lib_1.Message.success,
            };
        }
        else {
            return {
                code: lib_1.Code.err_private_key,
            };
        }
    }
    catch (error) {
        return {
            code: 2,
            msg: 'private_key is error',
        };
    }
}
exports.set_account = set_account;
async function save_block(block_info) {
    try {
        const data = JSON.stringify(block_info);
        const result = await (0, redis_1.hsetAsync)(lib_1.Store.blocks, block_info.hash, (0, utils_1.encode)(data));
        return {
            result,
            code: lib_1.Code.success,
        };
    }
    catch (error) {
        return {
            code: lib_1.Code.unknown,
            msg: lib_1.Message.unknown,
        };
    }
}
exports.save_block = save_block;
async function get_block(hash) {
    try {
        const data = await (0, redis_1.hgetAsync)(lib_1.Store.blocks, hash);
        const block = JSON.parse((0, utils_1.decode)(data));
        return {
            block,
            code: lib_1.Code.success,
        };
    }
    catch (error) {
        return {
            code: lib_1.Code.unknown,
            msg: lib_1.Message.unknown,
        };
    }
}
exports.get_block = get_block;
async function add_tx_to_block(hash, tx_hash) {
    try {
        const block = await (0, redis_1.hgetAsync)(lib_1.Store.blocks, hash);
        const block_info = (0, utils_1.decode)(block);
        block_info.txs.push(tx_hash);
        const result = await (0, redis_1.hsetAsync)(lib_1.Store.blocks, hash, (0, utils_1.encode)(block_info));
        return {
            result,
            code: lib_1.Code.success,
        };
    }
    catch (error) {
        return {
            code: lib_1.Code.unknown,
            msg: lib_1.Message.unknown,
        };
    }
}
exports.add_tx_to_block = add_tx_to_block;
async function get_all_account_detail() {
    try {
        const rs = await (0, redis_1.hgetallAsync)(lib_1.Store.account);
        Object.keys(rs).map((k) => {
            let data = Buffer.from(rs[k]).toString('utf-8');
            console.log(data);
        });
        return rs;
    }
    catch (error) {
        console.log(error);
        return {
            code: lib_1.Code.not_found,
            msg: lib_1.Message.not_found,
        };
    }
}
exports.get_all_account_detail = get_all_account_detail;
async function register_account(address, private_key, account) {
    try {
        const result_1 = await set_private_key(address, private_key);
        if (result_1) {
            const data = (0, utils_1.encode)(account, private_key);
            const result = await (0, redis_1.hsetAsync)(lib_1.Store.account, address, data);
            return {
                code: lib_1.Code.success,
                address,
                result,
            };
        }
        else
            return {
                code: lib_1.Code.err_private_key,
                msg: lib_1.Message.err_private_key,
            };
    }
    catch (error) {
        return {
            msg: lib_1.Message.unknown,
            error,
        };
    }
}
exports.register_account = register_account;
async function validate_account(address, private_key) {
    try {
        const rs = await (0, redis_1.hgetallAsync)(lib_1.Store.privacy, address);
        console.log(address, private_key, rs);
        if (!private_key || private_key !== rs) {
            console.log('error');
            return false;
        }
        else {
            console.log('success');
            return true;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.validate_account = validate_account;
async function set_private_key(address, private_key) {
    return await (0, redis_1.hsetAsync)(lib_1.Store.privacy, address, private_key);
}
exports.set_private_key = set_private_key;
async function get_account(address, private_key) {
    try {
        const is_valid = await validate_account(address, private_key);
        console.log('🚀 ~ file: api.ts ~ line 133 ~ Api ~ get_account ~ is_valid', is_valid);
        if (is_valid) {
            const data = await (0, redis_1.hgetAsync)(lib_1.Store.account, address);
            console.log('🚀 ~ file: api.ts ~ line 137 ~ Api ~ get_account ~ address', address);
            console.log('🚀 ~ file: api.ts ~ line 138 ~ Api ~ get_account ~ data', data);
            const decrypt = crypto_js_1.default.AES.decrypt(data, private_key).toString(crypto_js_1.default.enc.Utf8);
            return { account: JSON.parse(decrypt) };
        }
        else {
            return {
                code: lib_1.Code.err_private_key,
                msg: lib_1.Message.err_private_key,
            };
        }
    }
    catch (error) {
        return {
            code: lib_1.Code.unknown,
            msg: lib_1.Message.unknown,
        };
    }
}
exports.get_account = get_account;
async function remove_database() {
    return (0, redis_1.flushAsync)();
}
exports.remove_database = remove_database;
