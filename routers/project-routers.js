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
    
    projectDataBase.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch((error) => {
            res.status(500).json({ message: "An Error occured while getting data " + error.message})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    
    projectDataBase.get(id)
        .then(project => {
            if (project) {
                res.json(project)
            } else {
                res.status(404).json({ message: "Project with that specific ID doesnot exist in the dataBase" })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "An Error occured while getting data " + error.message})
        })
})


module.exports = router; 