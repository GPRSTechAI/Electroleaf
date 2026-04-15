const ActuatorCommand = require('../services/actuatorCommandServices');
const Actuator = require('../services/actuatorServices')

// const scheduleCommand = (req, res) => {
//     const { time, duration, actuatorId, value } = req.body;
//     let status = null;
//     console.log({ time, duration, actuatorId, value })
//     // if (time < Date.now()) {
//     //     res.publish(`actuators/${actuatorId}`, JSON.stringify({ value }));
//     //     status = 'sent'
//     // }
//     // ActuatorCommand.addCommand(time, duration, actuatorId, value, status)
//     //     .then((result) => {
//     //         res.json(result)
//     //     })
//     //     .catch(console.log);
//     res.send()
// };

// const beginExecution = (req, res) => {
//     const { actuatorId, commandId } = req.body;
//     const value = 1;

//     res.publish(`ELF/actuators`, JSON.stringify({ actuatorId, value }));

//     // time, duration, actuatorId, value, status, threadTriggered, threadId

//     ActuatorCommand.executeCommand(actuatorId, commandId)
//         .then((result) => {
//             res.json(result)
//         })
//         .catch(console.log);
// };

// const terminateAllCurrentExecutions = (req, res) => {
//     const { actuatorId } = req.body;
//     const value = 0;

//     res.publish(`actuators/${actuatorId}`, JSON.stringify({ value: 0 }));

//     ActuatorCommand.terminateAllCurrentExecutions(actuatorId)
//         .then((result) => {
//             res.json(result)
//         })
//         .catch(console.log);
// };

const getAllCommands = (req, res) => {
    ActuatorCommand.getAllCommands()

        .then((result) => {
            res.json(result)
        })
        .catch(console.log);
};

// const updateCommand = (req, res) => {
//     const { commandId } = req.params;
//     const { time, duration, actuatorId, value, status } = req.body;

//     ActuatorCommand.updateCommand(commandId, time, duration, actuatorId, value, status)
//         .then((result) => {
//             res.json(result)
//         })
//         .catch(console.log);

// }

// const deleteCommand = (req, res) => {
//     const { commandId } = req.params;

//     ActuatorCommand.deleteCommand(commandId)
//         .then((result) => {
//             res.json(result)
//         })
//         .catch(console.log);

// }

const getActuatorCommands = (req, res) => {
    const { actuatorId } = req.params;

    ActuatorCommand.getActuatorCommands(actuatorId)
        .then((result) => {
            res.json(result)
        })
        .catch(console.log);
};

const runActuator = async (req, res) => {
    const { actuatorId, value = 1, duration = -1 } = req.body;

    // res.sendCommand({actuatorId, value, duration});
    const sent = await ActuatorCommand.sendCommand({ actuatorId, value, duration }).catch(error => {
        res.status(403).json({ error })
    })

    if (!sent) return

    const command = {
        time: Date.now(),
        duration,
        value,
        actuatorId,
        threadTriggered: false
    }

    ActuatorCommand.addCommand(command)
        .then(command => {
            let running = false
            let currentCommand = null
            if (value) {
                running = true;
                currentCommand = command._id
            }
            Actuator.setCurrentCommand(actuatorId, running, currentCommand)
                .then((result) => {
                    res.json(command)
                })
                .catch(console.log);
        })
        .catch(console.log)
}

const clearAll = (req, res) => {
    ActuatorCommand.clearAll()
        .then(result => res.json(result))
        .catch(console.log)
}


module.exports = {
    getAllCommands,
    getActuatorCommands,
    runActuator,
    clearAll
}