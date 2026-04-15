const mongoose = require('mongoose');
const ImageSchema = require('./shared/Image')
const Schema = mongoose.Schema;

const ParameterSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    unit: {
        type: String,
        default: ''
    },
    lastReading: [{
        time: Date,
        value: Number
    }],
    image: ImageSchema,
}, { timestamps: true })

const SensorSchema = new Schema({
    _id: {
        type: String,
        validate: {
            validator: title => title.length > 0,
            message: 'Id must be longer than 2 characters.'
        },
        required: [true, 'Id required']
    },
    board: {
        type: String,
        required: [true, 'board id required']
    },
    image: ImageSchema,
    parameters: [ParameterSchema]
}, { timestamps: true });

const Sensor = mongoose.model('Sensor', SensorSchema);
module.exports = Sensor