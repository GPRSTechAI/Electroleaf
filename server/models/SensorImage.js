const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorImageSchema = new Schema({
    time: {
        type: Number,
        default: Date.now()
    },
    sensor: {
        type: String,
        ref: 'Sensor'
    }
}, { timestamps: true });

const SensorImage = mongoose.model('SensorImage', SensorImageSchema);
module.exports = SensorImage;