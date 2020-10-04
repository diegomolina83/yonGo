const express = require('express')
const router = express.Router()
const Plan = require ('../models/plan.model')

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


module.exports = router
