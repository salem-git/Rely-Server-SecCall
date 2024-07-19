"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const keyValueStore = {};
app.use(express_1.default.json());
app.post('/key-value', (req, res) => {
    // const { key, value } = req.body;
    // if (key && value) {
    //   keyValueStore[key] = value;
    //   res.status(201).json({ message: 'Key-value pair added successfully' });
    // } else {
    //   res.status(400).json({ error: 'Invalid key-value pair' });
    // }
    const { key, status, caller_phone_number, caller_name, receiver_phone_number } = req.body;
    if (key && status && caller_phone_number && caller_name && receiver_phone_number) {
        keyValueStore[key] = { status, caller_phone_number, caller_name, receiver_phone_number };
        res.status(201).json({ message: 'Key-value pair added successfully' });
    }
    else {
        res.status(400).json({ error: 'Invalid key-value pair' });
    }
});
app.get('/key-value/:key', (req, res) => {
    const key = req.params.key;
    if (keyValueStore[key]) {
        // res.status(200).json({ key, value: keyValueStore[key] });
        res.status(200).json(Object.assign({ key }, keyValueStore[key]));
    }
    else {
        res.status(404).json({ error: 'Key not found' });
    }
});
app.delete('/key-value/:key', (req, res) => {
    const key = req.params.key;
    if (keyValueStore[key]) {
        delete keyValueStore[key];
        res.status(200).json({ message: 'Key deleted successfully! it is super simple' });
    }
    else {
        res.status(404).json({ error: 'Key not found' });
    }
});
const port = process.env.PORT || 3000; // Default to port 3000 if not specified
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
