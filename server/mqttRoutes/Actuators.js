const ActuatorCommand = require('../models/ActuatorCommand');

const updateCommandStatus = (req) => {
    const { actuatorId } = req.params;
    //console.log('new message on ' + req.topic + ': ' + req.payload);
    const { status } = JSON.parse(req.payload);
    ActuatorCommand.updateCommandStatus(actuatorId, status)
}

module.exports = {
    updateCommandStatus
}