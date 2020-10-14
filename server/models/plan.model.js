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
                // required: true,
                default: ''
            },
            lng: {
                type: String,
                // required: true,
                default: ''
            },
            address: {
                type: String,
                default: ''
            }
        },
        date: Date
    },
    end: {
        location: {
            lat: String,
            lng: String,
            address: String
        },
        date: Date
    },
    imageUrl: {
        type: String,
        default: 'https://pbs.twimg.com/media/Boi190VCAAANJQ4.jpg'
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
    chat: {
        messages: {
            type: [String],
            default: []
        },
    },
    requirements: [String]

}, {
    timestamps: true
})

const Plan = mongoose.model('Plan', planSchema)
module.exports = Plan