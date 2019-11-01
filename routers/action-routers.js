const express = require('express');
const actionDataBase = require('../data/helpers/actionModel');

const router = express.Router();

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
                res.status(404).json({ message: "Project with that specific ID doesnot exist in the dataBase"})
            }
        })
        .catch(() => {
            res.status(500).json({ message: "An Error occured while getting data " + error.message })
        })
})


module.exports = router; 