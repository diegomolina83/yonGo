const express = require('express');
const router = express.Router();

const uploader = require('../configs/cloudinary.config');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {

    console.log('En el endpoint /upload')

    if (!req.file) {

        console.log('Entre aquí dentro wey!')

        next(new Error('No file uploaded!'));
        return;
    }

    res.json({ secure_url: req.file.secure_url })
})

module.exports = router