const Threshold = require('../models/Threshold')
const mqttHandler = require('../MqttHandler')

exports.getAll = () => {
    return Threshold.find()
}

exports.getActive = () => {
    return Threshold.aggregate([
        {
            $match: {
                status: true
            }
        }
    ])
}

exports.findOne = (id) => {
    return Threshold.aggregate([
        {
            $match: {
                _id: id
            }
        },
    ]).then(result => result[0])
}

exports.publishThreshold = ({ key, value, status = true }) => {
    if (status) {
        return mqttHandler.publish('/threshold', { [key]: value }, '/threshold/ack', res => {
            if (res.key === key) return true
            return false
        })
    }
    return false
}

exports.createThreshold = async ({ key, value, status = true }) => {
    const threshold = new Threshold({
        key, value, status
    })
    return threshold.save()
}

exports.updateThreshold = (_id, { key, value, status }) => {
    return Threshold.updateOne({ _id }, {
        $set: {
            key, value, status, published: false
        }
    })
}

exports.updateStatus = (_id, status) => {
    return Threshold.updateOne({ _id }, {
        $set: {
            status
        }
    })
}

exports.deleteThreshold = (_id) => {
    return Threshold.deleteOne({ _id })
}