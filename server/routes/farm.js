const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
    res.json({
        name: process.env.FARM_NAME,
        logo: process.env.FARM_LOGO
    })
})

router.get('/logo', (req, res) => {
    var options = {
        root: path.join(__dirname, '../')
    };
    res.sendFile(`assets/logos/${process.env.FARM_LOGO}`, options)
})

module.exports = router;