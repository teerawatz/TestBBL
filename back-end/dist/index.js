"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/users', (req, res) => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then((response) => response.json())
    // .then((json) => console.log(json));
    res.send('Express + TypeScript Server');
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
