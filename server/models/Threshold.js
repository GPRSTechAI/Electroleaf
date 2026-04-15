const mongoose = require('mongoose');

const thresholdSchema = mongoose.Schema({
    key: {
        type: String,
        required: [true, "Please add a key"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z][a-zA-Z0-9_]+$/.test(v);
            },
            message: props => `${props.value} is not a valid key`
        },
    },
    value: {
        type: String,
        required: [true, "Please add a value"]
    },
    status: {
        type: Boolean,
        default: true
    },
    published: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Threshold", thresholdSchema);