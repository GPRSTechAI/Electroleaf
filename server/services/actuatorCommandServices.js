const ActuatorCommand = require('../models/ActuatorCommand')
const mqttHandler = require('../MqttHandler');

// const terminateAllCurrentExecutions = (actuatorId, commandId) => {
//     const idQuery = commandId ? { _id: { "$ne": commandId } } : {}
//     return ActuatorCommand.updateMany(
//         { actuatorId, status: { '$in': ["sent", "executing"] }, ...idQuery },
//         [
//             {
//                 $set: { status: "terminated" }
//             },
//             {
//                 $set: {
//                     duration: {
//                         "$subtract": ["$$NOW", "$time"]
//                     }
//                 }
//             }

//         ]
//     ).then(async result => {
//         await Actuator.setCurrentCommand(actuatorId, null);
//         return result;
//     })
// }

// exports.terminateAllCurrentExecutions = terminateAllCurrentExecutions;

// exports.addCommand = (time, duration, actuatorId, value, status) => {
//     const statusObj = status ? { status } : {};
//     const actuatorCommand = new ActuatorCommand({
//         time, duration, actuatorId, value, ...statusObj
//     })
//     return actuatorCommand.save()
//         .then(async result => {
//             if (status === "sent") {
//                 await Actuator.setCurrentCommand(actuatorId, result._id)
//                 return result;
//             } else {
//                 schedule.schedule(result._id, 'begin', time, async function (actuatorId, commandId, value) {
//                     mqttHandler.publish(`actuators/${actuatorId}`, JSON.stringify({ value }));
//                     await terminateAllCurrentExecutions(actuatorId, commandId).catch(console.log)
//                     await ActuatorCommand.updateOne({ _id: commandId }, {
//                         $set: { status: 'sent' }
//                     })
//                     await Actuator.setCurrentCommand(actuatorId, commandId)
//                 }.bind(null, actuatorId, result._id, value));

//                 schedule.schedule(result._id, 'finish', (time + duration), async function (actuatorId, commandId, value) {
//                     mqttHandler.publish(`actuators/${actuatorId}`, JSON.stringify({ value: 0 }));
//                     await ActuatorCommand.updateOne({ _id: commandId }, {
//                         $set: { status: 'finished' }
//                     })
//                     await Actuator.setCurrentCommand(actuatorId, null)
//                 }.bind(null, actuatorId, result._id, value))
//                 return result
//             }
//         })
// }

exports.getAllCommands = () => {
    return ActuatorCommand.find()
}

exports.getActuatorCommands = actuatorId => {
    return ActuatorCommand.aggregate([
        {
            $match: { actuatorId }
        },
        {
            $sort: { 'time': 1 }
        },
    ])
}

exports.findOne = commandId => {
    return ActuatorCommand.findById(commandId)
}

exports.sendCommand = ({ actuatorId, value, duration }) => {
    return mqttHandler.publish('/actuators', { actuatorId, value, duration }, '/actuators/ack', res => {
        if (res.actuatorId === actuatorId) return true
        return false
    })
}

exports.addCommand = (command) => {
    const actuatorCommand = new ActuatorCommand(
        command
    )
    return actuatorCommand.save()
}

exports.clearAll = () => {
    return ActuatorCommand.deleteMany()
}

// exports.updateCommand = (commandId, time, duration, actuatorId, value, status) => {
//     return ActuatorCommand.updateOne({ _id: commandId }, {
//         $set: { time, duration, actuatorId, value, status }
//     })
// }

// exports.deleteCommand = commandId => {
//     return ActuatorCommand.deleteOne({ _id: commandId })
// }

// exports.executeCommand = (actuatorId, commandId) => {
//     return terminateAllCurrentExecutions(actuatorId, commandId)
//         .then(async result => {
//             await Actuator.setCurrentCommand(actuatorId, commandId);
//             return result;
//         })
// }

// exports.addInstantCommand = async (actuatorId, value) => {
//     await terminateAllCurrentExecutions(actuatorId);
//     const actuatorCommand = new ActuatorCommand({
//         duration: -1, actuatorId, value, status: "sent"
//     })
//     return actuatorCommand.save()
//         .then(async result => {
//             await Actuator.setCurrentCommand(actuatorId, result._id);
//             return result;
//         })
// }

// exports.updateCommandStatus = async (actuatorId, status) => {
//     const { currentCommand: _id } = await Actuator.viewActuator(actuatorId);
//     if (_id) {
//         if (status === 'finished') await Actuator.setCurrentCommand(actuatorId, null)
//         return ActuatorCommand.updateOne({ _id }, {
//             $set: { status }
//         })
//     } else {
//         // This is a critical situation
//         return terminateAllCurrentExecutions(actuatorId)
//     }
// }
