export default abstract class App {
    app: import("express-serve-static-core").Express;
    port: number;
    constructor(port: number);
}
