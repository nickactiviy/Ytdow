const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api/download', async (req, res) => {
    const mediaUrl = req.query.url;

    if (!mediaUrl) {
        return res.status(400).json({ error: 'Please enter a valid URL' });
    }

    if (!mediaUrl.includes('facebook') && !mediaUrl.includes('youtube') && !mediaUrl.includes('instagram') && !mediaUrl.includes('tiktok')) {
        return res.status(400).json({ error: 'Please enter a valid URL for Facebook, YouTube, Instagram, or TikTok' });
    }

    const options = {
        method: 'GET',
        url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
        params: {
            url: mediaUrl,
            filename: 'video'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json({
            title: response.data.title,
            links: response.data.links
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred', details: error.message });
    }
});

module.exports = router;
