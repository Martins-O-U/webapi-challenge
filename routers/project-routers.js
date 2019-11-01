const express = require('express');
const projectDataBase = require('../data/helpers/projectModel');

const router = express.Router();


function checkRequiredField(req, res, next) {
    if (req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json({ error: "please provide name and description of project"})
    }
}

router.get('/', (req, res) => {
    projectDataBase
    .get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch((error) => {
        res.status(500).json({ message: "An Error occured while getting data " + error.message})
    })
})


module.exports = router; 