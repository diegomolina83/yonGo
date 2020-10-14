const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')
const Plan = require('../models/plan.model')


// Endpoints
router.get('/getAllUsers', (req, res) => {

    User.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneUser/:userId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findById(req.params.userId)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/getAllPlans/fast/:userId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Plan.find({ attendees: req.params.userId })
        .sort({ 'start.date': 1 })
        .limit(20)
        .then(response => {
            console.log('CONSULTA PROCESADA!!!')
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/getAllPlans/:userId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Plan.find({ attendees: req.params.userId })
        .sort({ 'start.date': 1 })
        .then(response => {
            console.log('CONSULTA PROCESADA!!!')
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router
