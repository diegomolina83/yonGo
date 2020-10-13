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

    const { title, scope, category, description, owners, creator, imageUrl } = req.body

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

        planToCreate = { title, start, end, scope, category, description, imageUrl }
    } else {

        planToCreate = { title, start, scope, category, description, owners, creator, imageUrl }
    }

    Plan.create(planToCreate)
        .then(response => res.json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


module.exports = router
