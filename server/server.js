import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000; // Your chosen port

// Setup for ES Modules to find the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This tells Express to go "up one level" from the server folder to find public
app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html'] }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
