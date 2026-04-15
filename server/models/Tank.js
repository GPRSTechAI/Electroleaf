const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TankSchema = new Schema({
    _id: {
        type: String,
        validate: {
            validator: title => title.length > 0,
            message: 'Id must be longer than 2 characters.'
        },
        required: [true, 'Id required']
    },
    name: {
        type: String,
        required: false
    },
    unit: {
        type: String,
        default: '%'
    },
    reading: {
        time: {
            type: Date,
            default: new Date()
        },
        value: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true });

const Tank = mongoose.model('Tank', TankSchema);
module.exports = Tank