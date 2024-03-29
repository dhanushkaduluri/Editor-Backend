
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ConnectToDB from './config/ConnectToDB.js';
import { submit, getSubmissions, executeCode, checkOutput } from './Controllers/controllers.js';

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.post('/submit', submit);
app.get('/submissions', getSubmissions);
app.post('/execute', executeCode);
app.post('/output', checkOutput);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    ConnectToDB();
});
