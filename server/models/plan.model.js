const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    start: {
        location: {
            lat: {
                type: String,
                default: ''
            },
            lng: {
                type: String,
                default: ''
            }
        },
        date: Date
    },
    end: {
        location: {
            lat: {
                type: String,
                default: ''
            },
            lng: {
                type: String,
                default: ''
            }
        },
        date: Date
    },

    description: String,

    attendees: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: true  // At least one of the owners must be attending
    },
    scope: {
        type: String,
        enum: ['public', 'friends', 'group'],
        default: 'friends'
    },
    mark: {
        amount: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
    },
    category: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    owners: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    requirements: [String]

}, {
    timestamps: true
})

const Plan = mongoose.model('PlanTest', planSchema)
module.exports = Plan