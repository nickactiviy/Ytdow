const express = require('express');
const downloader = require('./api/downloader');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(downloader);

app.get('/', (req, res) => {
    res.send('API is running. Use /api/download?url=<VIDEO_URL> to download videos.');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
