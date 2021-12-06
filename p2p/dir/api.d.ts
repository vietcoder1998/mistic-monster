import { Account, BlockInfo, Code, Message } from 'mmc-core-chain/lib';
export declare function set_account(address: string, private_key: string, account: Account): Promise<{
    code: Code;
    msg?: undefined;
} | {
    code: number;
    msg: string;
}>;
export declare function save_block(block_info: BlockInfo): Promise<{
    result: string;
    code: Code;
    msg?: undefined;
} | {
    code: Code;
    msg: Message;
    result?: undefined;
}>;
export declare function get_block(hash: string): Promise<{
    block: BlockInfo;
    code: Code;
    msg?: undefined;
} | {
    code: Code;
    msg: Message;
    block?: undefined;
}>;
export declare function add_tx_to_block(hash: string, tx_hash: string): Promise<{
    result: any;
    code: Code;
    msg?: undefined;
} | {
    code: Code;
    msg: Message;
    result?: undefined;
}>;
export declare function get_all_account_detail(): Promise<any>;
export declare function register_account(address: string, private_key: string, account: Account): Promise<{
    code: Code;
    address: string;
    result: any;
    msg?: undefined;
    error?: undefined;
} | {
    code: Code;
    msg: Message;
    address?: undefined;
    result?: undefined;
    error?: undefined;
} | {
    msg: Message;
    error: unknown;
    code?: undefined;
    address?: undefined;
    result?: undefined;
}>;
export declare function validate_account(address: string, private_key: string): Promise<boolean>;
export declare function set_private_key(address: string, private_key: string): Promise<any>;
export declare function get_account(address: string, private_key: string): Promise<{
    account: any;
    code?: undefined;
    msg?: undefined;
} | {
    code: Code;
    msg: Message;
    account?: undefined;
}>;
export declare function remove_database(): Promise<any>;
