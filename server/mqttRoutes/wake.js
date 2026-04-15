const thresholdRepo = require('../repositories/thresholdRepo')
const mqttHandler = require('../MqttHandler')

const wakeMsg = async (req) => {
    const thresholds = await thresholdRepo.getAllUnpublished()

    for (const threshold of thresholds) {
        const published = await mqttHandler.publish('/threshold', { [threshold.key]: threshold.value }, '/threshold/ack', res => {
            if (res.key === threshold.key) return true
            return false
        })
        console.log({ published })
        if (published) {
            const done = await thresholdRepo.updatePublished(threshold._id)
        }
    }
}

module.exports = {
    wakeMsg
}