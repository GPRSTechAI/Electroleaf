const mqtt = require('mqtt');
var client = mqtt.connect("mqtt://broker.hivemq.com");

const publishRandom = () => {
    var random = Math.floor(Math.random() * 50);
    // if (random < 20) {
    client.publish("ELF_IOT/readings", JSON.stringify(
        {
            sensorId: "sensor3",
            readings: [
                {
                    parameterId: "001",
                    value: 2
                },
                {
                    parameterId: "002",
                    value: 10
                },
                {
                    parameterId: "003",
                    value: 20
                }
            ]
        }
    ));
    console.log('published')
    // }
}

const publishTankLevel = () => {
    var random = Math.floor(Math.random() * 50);
    // if (random < 20) {
    client.publish("ELF_IOT/tankLevel", JSON.stringify(
        {
            tankId: "tank02",
            value: 30
        }
    ));
    console.log('published')
    // }
}

client.on("connect", function () {
    client.subscribe("ELF_Temperature");
    console.log('Client has succesfully subscribed');
    // setInterval(function () {
    //     publishRandom()
    // }, 5000)
    // publishRandom()
    publishTankLevel()
});

client.on("message", function (topic, message) {
    console.log(message.toString());
});