const schedule = require('node-schedule');
const NodeCache = require("node-cache");
const mqttHandler = require('./MqttHandler')
const threadServices = require('./services/threadServices')
const sensorReadingServices = require('./services/sensorReadingServices')
const thresholdServices = require('./services/thresholdServices')
const fetch = require('node-fetch');

async function handleThread(thread) {
    console.log('Running scheduled thread with id', thread._id);
    if (thread.condition.condition) {
        const readings = []
        for await (const sensor of thread.devices.sensorParameters) {
            const reading = await sensorReadingServices.forConditionFunction(sensor.sensorId, sensor.parameterId, sensor.feedReadings)
            readings.push(reading)
        }
        const thresholds = await thresholdServices.getActive()
        const body = {
            client: "ELF_IOT",
            thread,
            conditionFile: thread.condition.conditionFile,
            sensorReadings: readings,
            thresholds
        }
        const response = await fetch(process.env.PYTHON_SERVER + '/sensors/condition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .catch(console.log)
        console.log(response)
        if (response && response.result) {
            mqttHandler.publish(`ELF_IOT/actuators`, JSON.stringify({ actuator: thread.devices.actuatorIds[0], value: 1, duration: thread.condition.duration }));
        }
    } else {
        // mqttHandler.publish(`actuators/${actuatorId}`, JSON.stringify({ value: 0 }));
        mqttHandler.publish(`ELF_IOT/actuators`, JSON.stringify({ actuator: thread.devices.actuatorIds[0], value: 1, duration: thread.condition.duration }));
    }
}


function getCronRule(thread) {
    let cronRule;
    switch (thread.type) {
        case 'repeat':
            cronRule = scheduleRepeat(thread.schedule.repeat.time, thread.schedule.repeat.days)
            break;
        case 'interval':
            cronRule = scheduleInterval(thread.schedule.interval.interval)
            break;
        case 'once':
            cronRule = scheduleOnce(thread.schedule.once.dateTime)
            break;
    }
    return cronRule;
}

/*
    To run a thread on 17.35h
    time = { hour: 17, minute: 35}
    to run the schedule on 
    days = [0, 1, 2, 4]
*/
function scheduleRepeat(time, days) {
    let cronString = `0 ${Number(time.minute)} ${Number(time.hour)} * * ${days.length >= 7 ? "*" : days.join()}`
    console.log('scheduling repeat', cronString)
    return cronString
}

// function scheduleInterval(interval) {
//     let cronString = `*/${interval} * * * * *`
//     console.log('scheduling interval', cronString)
//     return cronString
// }
function scheduleInterval(interval) {
    let cronString = `0 */${interval} * * * *`
    console.log('scheduling interval', cronString)
    return cronString
}

function scheduleOnce(time, callback, scheduled) {
    console.log('scheduling once')
    return new Date(time)
}

class ThreadFactory {

    constructor() {
        this.init()
    }

    init() {
        threadServices.getAll().then(threads => {
            threads.forEach(thread => {
                if (thread.execute) {
                    this.schedule(thread._id, thread)
                }
            })
        }).catch(() => {
            console.log("Thread init failed")
        })
    }

    schedule(id, thread) {
        let cronRule = getCronRule(thread);
        schedule.scheduleJob(String(id), cronRule, () => {
            handleThread(thread)
        })
    }

    reschedule(id, thread) {
        let cronRule = getCronRule(thread);
        schedule.scheduledJobs[id] && schedule.scheduledJobs[id].reschedule(cronRule)
    }

    cancel(id) {
        schedule.scheduledJobs[String(id)].cancel()
    }

    delete(id) {
        const job = schedule.scheduledJobs[String(id)]
        if (job) {
            job.cancel()
        }
    }
}

module.exports = new ThreadFactory();