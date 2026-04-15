const mongoose = require('mongoose');
const ImageSchema = require('./shared/Image')
const Schema = mongoose.Schema;

const ActuatorSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    board: {
        type: String,
        required: true
    },
    command: {
        running: {
            type: Boolean,
            default: false
        },
        currentCommand: {
            type: Schema.Types.ObjectId,
            ref: 'ActuatorCommand'
        }
    },
    image: ImageSchema
}, { timestamps: true });

const Actuator = mongoose.model('Actuator', ActuatorSchema);
module.exports = Actuator