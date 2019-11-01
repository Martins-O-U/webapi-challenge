const express = require('express');
const actionDataBase = require('../data/helpers/actionModel');

const router = express.Router();

function requiredFieldChecker(req, res, next) {
    if (req.body.project_id && req.body.description && req.body.notes) {
        next();
    } else {
        res.status(400).json({ error : "please provide all the needed values (project_id, description, and notes)"})
    }
}

router.get('/', (req, res) => {
    
    actionDataBase.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            res.status(500).json({ message: "An Error occured while getting data " + error.message })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    
    actionDataBase.get(id)
        .then(action => {
            if (action) {
                res.json(action)
            } else {
                res.status(404).json({ message: "Action with that specific ID doesnot exist in the dataBase"})
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "An Error occured while getting data " + error.message })
        })
})

router.post('/', requiredFieldChecker, (req, res) => {
    const action = req.body
 
        actionDataBase.insert(action)
            .then(post => {
                res.status(200).json(post)
            })
            .catch((error) => {
                res.status(500).json({ message: "An Error occured while getting data " + error.message })
            })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
   
    actionDataBase.remove(id)
        .then(action => {
            if (action) {
                res.json(action)
            } else {
                res.status(404).json({ message: "Action with that specific ID doesnot exist in the dataBase"})
            }
        })
        .catch(() => {
            res.status(500).json({ message: "An Error occured while getting data " })
        })
})

router.put('/:id', requiredFieldChecker, (req, res) => {
    const id = req.params.id
    const update = req.body

        actionDataBase.update(id, update)
            .then(changes => {
                if (changes) {
                    res.status(200).json(changes)
                } else {
                    res.status(404).json({ message: "Action with that specific ID doesnot exist in the dataBase"})
                }
            })
            .catch(() => {
                res.status(500).json({ message: "An Error occured while saving data" })
            })
})


module.exports = router; 