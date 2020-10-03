const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: String,

    location: {
        start: {
            lat: {
                type: String,
                default: ''
            },
            lng: {
                type: String,
                default: ''
            }
        },
        end: {
            lat: {
                type: String,
                default: ''
            },
            lng: {
                type: String,
                default: ''
            }
        }
    },
    date: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    attendees: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: true  // At least one of the owners must be attending
    },
    allowedUsers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [] // When is empty represents that all users are allowed (is Public)
    },
    mark: {
        amount: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
    },
    category: String,

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    owners: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [] // When is empty represents that all users are allowed (is Public)
    },
    requirements: [String]

}, {
    timestamps: true
})

const Plan = mongoose.model('Plan', planSchema)
module.exports = Plan