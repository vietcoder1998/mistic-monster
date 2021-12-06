import { BlockChain } from 'mmc-core-chain/lib';
import App from './app';
declare class TestNet extends App {
    mmc_chain: BlockChain;
    app: import("express-serve-static-core").Express;
    port: number;
    constructor(port: number);
}
export default TestNet;
