const SensorImage = require('../models/SensorImage');


exports.uploadImage = (sensor,time) => {
    const sensorImage = new SensorImage({ sensor, time })
    return sensorImage.save()
}

exports.getSensorImages = (sensorId) => {
    return SensorImage.aggregate([
        { $sort: { 'time': 1 } },
        { $match: { sensor: sensorId } }
    ])
}