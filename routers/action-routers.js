const express = require('express');
const actionDataBase = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionDataBase
    .get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        res.status(500).json({ message: "An Error occured while getting data " + error.message })
    })
})

module.exports = router; 