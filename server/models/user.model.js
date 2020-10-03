const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: 'https://librenoticias.com/wp-content/uploads/2020/08/default-user-image.png'
    },
    userType: {
        type: String,
        enum: ['basic', 'admin'],
        default: 'basic'
    },
    social: {
        following: {
            type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            default: []
        },
        followers: {
            type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            default: []
        },
        mark: {
            amount: { type: Number, default: 0 },
            average: { type: Number, default: 0 },
        }
    },
    plans: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
        default: []
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User