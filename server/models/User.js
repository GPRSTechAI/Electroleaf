const mongoose = require('mongoose');

const useSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please add a name"]
    },
    lastname: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add password"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    loginEnabled: {
        type: Boolean,
        default: true
    },
    privileges: {
        type: [{
            type: String
        }],
        default: []
    },
    accountRecovery: {
        token: {
            type: String,
            default: null
        },
        expirationTime: {
            type: mongoose.Schema.Types.Date,
            detault: null
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("User", useSchema);