// const MqttHandler = require('./MqttHandler');

// const mqttClient = new MqttHandler('mqtt://localhost:1234');
// mqttClient.connect();

// mqttClient.

const mqtt = require('mqtt');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptMessage() {
    return new Promise((resolve, reject) => {
        readline.question('topic: ', topic => {
            readline.question('message: ', message => {
                resolve({ topic, message })
            })
            //readline.close();
        });
    });
}

function publishDelay(topic, message, delay) {
    setTimeout(() => {
        client.publish(topic, JSON.stringify(message));
    }, delay)
}

const client = mqtt.connect("mqtt://broker.hivemq.com");
// const client = mqtt.connect(process.env.MQTT_BROKER);

client.on('message', (topic, message) => {
    message = JSON.parse(message.toString());
    console.log(new Date().toLocaleString(), message);
    if (topic === "ELF_IOT/dev/threshold") {
        console.log('Got threshold')
        const key = Object.keys(message)[0]
        client.publish('ELF_IOT/dev/threshold/ack', JSON.stringify({
            key,
            status: true
        }));
    } else if (topic === "ELF_IOT/dev/actuators") {
        console.log(message)
        publishDelay('ELF_IOT/dev/actuators/ack', {
            actuatorId: message.actuatorId,
            status: true
        }, 2000)
    }
});

client.on('error', (err) => {
    console.log(err);
    client.end();
    setTimeout(() => {
        client.reconnect();
    }, 5000)
});

client.on("reconnect", () => {
    console.log("reconnecting!")
})

const defaultTopic = "ELF_IOT/dev/readings"
const defaultmessage = JSON.stringify({
    sensorId: 'sensor3',
    readings: [
        { parameterId: '1', value: 42 },
        { parameterId: '2', value: 18 },
    ]
})

client.on('connect', async () => {
    console.log('connected')
    client.subscribe('ELF_IOT/dev/threshold');
    client.subscribe('ELF_IOT/dev/actuators');
    client.subscribe('TLA/2022/lamb');
    // client.subscribe('ELF_IOT/threshold');
    // client.subscribe('testing');
    // setInterval(() => {
    //     client.publish('readings', 'reading')
    //     console.log('message sent', 'reading')
    // }, 5000)


    while (true) {
        const { topic, message } = await promptMessage();
        if (!message) {
            client.publish(defaultTopic, defaultmessage)
        } else {
            client.publish(topic, message)
        }
        console.log('message sent', topic, message)
    }
})


