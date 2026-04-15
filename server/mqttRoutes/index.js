const mqttRouter = require('mqtt-simple-router');
const sensorReadings = require('./sensorReadings');
const actuators = require('./Actuators')
const wake = require('./wake')

const router = new mqttRouter();
const MQTT_PREFIX = process.env.MQTT_PREFIX;

router.auto(`${MQTT_PREFIX}/readings`, sensorReadings.addReading);
router.auto(`${MQTT_PREFIX}/tankLevel`, sensorReadings.updateTankLevel);
router.auto(`${MQTT_PREFIX}/wake`, wake.wakeMsg);

router.auto(`${MQTT_PREFIX}/actuators/updateStatus`, actuators.updateCommandStatus);

module.exports = router;