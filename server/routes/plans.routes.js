const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Plan = require('../models/plan.model')

// Endpoints
router.get('/getAllPlans', (req, res) => {

    Plan.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOnePlan/:plan_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.plan_id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Plan.findById(req.params.plan_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/plans/create', (req, res) => {

    const { title, scope, category, description, owners, creator, attendees, imageUrl, address } = req.body

    console.log(req.body)

    // We set the Date object for the startDate
    const startDateArray = req.body.startDate.split('-').map(elm => Number(elm))
    const startTimeArray = req.body.startTime.split(':').map(elm => Number(elm))
    const formattedStartDate = new Date(startDateArray[0], startDateArray[1] - 1, startDateArray[2], startTimeArray[0], startTimeArray[1])

    const start = { location: req.body.startLocation, date: formattedStartDate }

    let planToCreate

    if (req.body.endDate && req.body.endTime) {

        // We set the Date object for the endDate
        const endDateArray = req.body.endDate.split('-').map(elm => Number(elm))
        const endTimeArray = req.body.endTime.split(':').map(elm => Number(elm))
        const formattedEndDate = new Date(endDateArray[0], endDateArray[1] - 1, endDateArray[2], endTimeArray[0], endTimeArray[1])

        const end = { location: req.body.endLocation, date: formattedEndDate }

        planToCreate = { title, start, end, scope, category, description, owners, creator, attendees, imageUrl, address }
    } else {

        planToCreate = { title, start, scope, category, description, owners, creator, attendees, imageUrl, address }
    }

    Plan.create(planToCreate)
        .then(response => res.json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.put('/plans/edit/:id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    const { title, scope, category, description, owners, creator, attendees, imageUrl } = req.body

    console.log(req.body)

    // We set the Date object for the startDate
    const startDateArray = req.body.startDate.split('-').map(elm => Number(elm))
    const startTimeArray = req.body.startTime.split(':').map(elm => Number(elm))
    const formattedStartDate = new Date(startDateArray[0], startDateArray[1] - 1, startDateArray[2], startTimeArray[0], startTimeArray[1])

    const start = { location: req.body.startLocation, date: formattedStartDate }

    let planToEdit

    if (req.body.endDate && req.body.endTime) {

        // We set the Date object for the endDate
        const endDateArray = req.body.endDate.split('-').map(elm => Number(elm))
        const endTimeArray = req.body.endTime.split(':').map(elm => Number(elm))
        const formattedEndDate = new Date(endDateArray[0], endDateArray[1] - 1, endDateArray[2], endTimeArray[0], endTimeArray[1])

        const end = { location: req.body.endLocation, date: formattedEndDate }

        planToEdit = { title, start, end, scope, category, description, owners, creator, attendees, imageUrl }

    } else {

        planToEdit = { title, start, scope, category, description, owners, creator, attendees, imageUrl }
    }

    Plan.findByIdAndUpdate(req.params.id, planToEdit, { new: true })
        .then(updatedPlan => res.json(updatedPlan))
        .catch(err => res.status(500).json(err))
})

router.get('/plans/isAttendee/:planId/:userId', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.planId)) {
        res.status(400).json({ message: 'Specified plan id is not valid' })
        return
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }

    Plan.find({ _id: req.params.planId, attendees: req.params.userId }, { _id: 1 })
        .then(matchedPlans => {

            if (matchedPlans.length !== 0) {

                res.send(true)

            } else {

                res.send(false)
            }
        })
        .catch(err => res.status(500).json(err))
})

router.put('/plans/handleAttendance/:planId/:userId/:isAttending', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.planId)) {
        res.status(400).json({ message: 'Specified plan id is not valid' })
        return
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ message: 'Specified user id is not valid' })
        return
    }

    if (req.params.isAttending === 'false') {

        console.log('Entro al push')

        Plan.findByIdAndUpdate(req.params.planId, { $push: { 'attendees': req.params.userId } }, { new: true })
            .then(updatedPlan => res.json(updatedPlan))
            .catch(err => res.status(500).json(err))
    } else {

        console.log('Entro al pull')

        Plan.findByIdAndUpdate(req.params.planId, { $pull: { 'attendees': req.params.userId } }, { new: true })
            .then(updatedPlan => res.json(updatedPlan))
            .catch(err => res.status(500).json(err))
    }
})


module.exports = router