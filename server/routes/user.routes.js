const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')

// Endpoints
router.get('/getAllUsers', (req, res) => {

    User.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneUser/:plan_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.plan_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findById(req.params.plan_id)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router
