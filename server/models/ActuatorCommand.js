const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActuatorCommandSchema = new Schema({
    time: {
        type: Date,
        default: Date.now()
    },
    duration: {
        type: Number,
        default: 0
    },
    actuatorId: {
        type: String,
        ref: 'Actuator'
    },
    value: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["sent", "executing", "finished", "terminated"],
        default: "sent"
    },
    threadTriggered: {
        type: Boolean,
        default: true
    },
    threadId: {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    }
}, { timestamps: true });

const ActuatorCommand = mongoose.model('ActuatorCommand', ActuatorCommandSchema);
module.exports = ActuatorCommand