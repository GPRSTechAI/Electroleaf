const SensorReading = require('../services/sensorReadingServices');
const Tank = require('../services/tankServices')

const addReading = (req) => {
    // const { sensorId } = req.params;
    // console.log('new message on ' + req.topic + ': ' + req.payload);
    // console.log(req.payload)
    const { sensorId, time, readings } = JSON.parse(req.payload);
    // console.table({ sensorId, value, time: time || Date.now() })
    console.table({ sensorId, readings, time })
    if (process.env.STORE_SENSOR_READINGS === 'true') {
        SensorReading.addReading(sensorId, time || Date.now(), readings)
    }
}

const updateTankLevel = (req) => {
    const { tankId, time, value } = JSON.parse(req.payload);
    console.table({ tankId, time, value })
    Tank.updateReading(tankId, time || new Date(), value)
}

module.exports = {
    addReading,
    updateTankLevel
}