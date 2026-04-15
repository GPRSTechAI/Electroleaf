const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    type: {
        type: String,
        enum: ["repeat", "interval", "once", "onReading"],
        default: "repeat"
    },
    execute: {
        type: Boolean,
        default: true
    },
    schedule: {
        repeat: {
            time: {
                hour: {
                    type: Number,
                    default: 0
                },
                minute: {
                    type: Number,
                    default: 0
                }
            },
            days: [{
                type: Number,
                min: [0, 'Invalid'],
                max: [6, 'Invalid'],
            }]
        },
        interval: {
            interval: {
                type: Number
            }
        },
        once: {
            dateTime: {
                type: Date,
                default: Date.now
            }
        },
        onReading: {
            number: {
                type: Number,
                default: 1
            }
        }
    },
    devices: {
        sensorParameters: [
            {
                sensorId: {
                    type: String,
                    ref: 'Sensor'
                },
                parameterId: {
                    type: String,
                    ref: 'Sensor'
                },
                feedReadings: {
                    type: Number,
                    default: 1
                }
            }
        ],
        actuatorIds: [
            {
                type: String,
                ref: 'Actuator'
            }
        ],
    },
    condition: {
        condition: {
            type: Boolean,
            default: true
        },
        conditionFile: {
            type: String,
        },
        duration: {
            type: Number
        }
    },
}, { timestamps: true });

const Thread = mongoose.model('thread', ThreadSchema);
module.exports = Thread;