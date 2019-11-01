const express = require('express');
const projectDataBase = require('../data/helpers/projectModel');

const router = express.Router();


function checkRequiredField(req, res, next) {
    if (req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json({ error: "please provide all the needed values (name and description)" })
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
        .catch((error) => {
            res.status(500).json({ message: "An Error occured while getting data " + error.message})
        })
})

router.post('/', checkRequiredField, (req, res) => {
    const project = req.body
    
    projectDataBase.insert(project)
        .then(project => {
            res.status(200).json(project)
        })
        .catch((error) => {
            res.status(500).json({ message: "An Error occured while getting data " + error.message })
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
   
    projectDataBase.remove(id)
        .then(project => {
            if (project) {
                res.json(project)
            } else {
                res.status(404).json({ error: "Project with that specific ID doesnot exist in the dataBase" })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "An Error occured while getting data " })
        })
})

router.put("/:id", checkRequiredField, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    projectDataBase.update( id, changes )
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: "Project with that specific ID doesnot exist in the dataBase" })
            }              
        })
        .catch(error => res.json({ message: "An Error occured while getting data "}))
})

router.get("/:id/actions", (req, res) => {
    const { id } = req.params;
    projectDataBase.getProjectActions(id)
        .then(data => {
            if (data.length > 0) {
                res.json(data)
            } else {
                res.status(404).json({ message: "Project with that specific ID doesnot exist in the dataBase"})
            }

        })
        .catch(error => {res.json({ message: "An Error occured while getting data."})})
})

module.exports = router; 