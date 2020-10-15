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

router.put('/edit/:userId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
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

            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/isFollowing/:followedId/:followerId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.followedId) || !mongoose.Types.ObjectId.isValid(req.params.followerId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.find({ _id: req.params.followerId, 'social.following': req.params.followedId }, { _id: 1 })
        .then(matchedUsers => {

            if (matchedUsers.length !== 0) {

                res.send(true)

            } else {

                res.send(false)
            }
        })
        .catch(err => res.status(500).json(err))
})

router.put('/handleFollow/:followedId/:followerId/:isFollowing', (req, res) => {

    console.log('req.params is: ', req.params)

    if (!mongoose.Types.ObjectId.isValid(req.params.followedId) || !mongoose.Types.ObjectId.isValid(req.params.followerId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    if (req.params.isFollowing === 'false') {

        console.log('Entro al push')

        User.findByIdAndUpdate(req.params.followerId, { $push: { "social.following": req.params.followedId } }, { new: true })
            .then(updatedUser => res.json(updatedUser))
            .catch(err => res.status(500).json(err))
    } else {

        console.log('Entro al pull')

        User.findByIdAndUpdate(req.params.followerId, { $pull: { "social.following": req.params.followedId } }, { new: true })
            .then(updatedUser => res.json(updatedUser))
            .catch(err => res.status(500).json(err))
    }
})

module.exports = router
