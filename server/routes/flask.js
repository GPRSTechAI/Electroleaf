const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/*', async (req, res) => {
    const response = await fetch(process.env.PYTHON_SERVER).then(res => res.text())
    res.send(response)
});
module.exports = router;