const mqtt = require('mqtt');

console.log('Running')
class MqttHandler {
    constructor() {
        this.mqttClient = null;
        //this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
        //this.password = 'YOUR_PASSWORD';
        this.router = null;
    }

    connect(host, prefix) {
        this.prefix = prefix;
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });
        this.mqttClient = mqtt.connect(host, { connectTimeout: 500 });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
            setTimeout(() => {
                console.log("Trying to reconnect")
                this.mqttClient.reconnect();
            }, 5000)
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
            this.router.wrap(this.mqttClient);
            this.mqttClient.subscribe(prefix + '/threshold/ack')
            this.mqttClient.subscribe(prefix + '/actuators/ack')
        });

        // mqtt subscriptions
        this.mqttClient.subscribe('mytopic', { qos: 0 });

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {

            if (!message.toString()) message = 'null'
            try {
                message = JSON.parse(message.toString())
                console.log(topic, message)
            } catch (e) {
                message = message.toString()
            }
            //console.log(message)
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    subscribeTopic(topic) {
        this.mqttClient.subscribe(topic)
    }

    unsubscribeTopic(topic) {
        this.mqttClient.unsubscribe(topic)
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(message) {
        this.mqttClient.publish('testing', message);
    }

    async publish(topic, message, ackTopic, conditionFun) {
        this.mqttClient.publish(this.prefix + topic, JSON.stringify(message));
        return new Promise((resolve, reject) => {
            if (!ackTopic) resolve(true)
            else {
                const timeOut = setTimeout(() => {
                    reject("Device not responded")
                }, 30000)
                this.mqttClient.on('message', (topic, message) => {
                    if (topic === this.prefix + ackTopic) {
                        const msg = JSON.parse(message.toString())
                        if (conditionFun(msg)) {
                            clearTimeout(timeOut)
                            if (msg.status) resolve(true)
                            reject('Operation failed. Device responded.')
                        }
                    }
                });
            }

        })
    }

    use(router) {
        this.router = router;
    }

    sendCommand(actuatorId, value, duration) {
        this.publish('ELF_IOT/actuators', JSON.stringify({ actuatorId, value, duration }))
    }
}

module.exports = new MqttHandler();