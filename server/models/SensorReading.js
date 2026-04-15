const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorReadingSchema = new Schema({
    sensorId: {
        type: String,
        ref: 'Sensor',
        required: [true, 'sensorId required']
    },
    time: {
        type: Number,
        default: Date.now()
    },
    readings: [{
        parameterId: {
            type: String
        },
        value: {
            type: Number,
            default: 0
        }
    }]
}, { timestamps: true });

SensorReadingSchema.index({ time: -1 })

const SensorReading = mongoose.model('SensorReading', SensorReadingSchema);
module.exports = SensorReading