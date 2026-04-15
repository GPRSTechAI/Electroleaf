const Sensor = require('../services/sensorServices');

const getSensors = (req, res) => {
    Sensor.getSensors()
        .then(result => {
            res.json(result)
        })
        .catch(console.log);
}

const getAbstract = (req, res) => {
    Sensor.getAbstract()
        .then(result => {
            res.json(result)
        })
        .catch(console.log);
}

const getAllParameters = (req, res) => {
    Sensor.getAllParameters()
        .then(result => {
            res.json(result)
        })
        .catch(console.log);
}

const findOne = (req, res) => {
    const { id } = req.params;
    Sensor.findOne(id)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const getBoards = (req, res) => {
    Sensor.getBoards()
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const sensorsOnBoard = (req, res) => {
    const { board } = req.params
    Sensor.sensorsOnBoard(board)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const createSensor = (req, res) => {
    const { id, board, parameters } = req.body;
    Sensor.createSensor(id, board, parameters)
        .then(result => {
            res.json(result)
        })
        .catch(e => {
            if (e.message.indexOf('duplicate key error') !== -1) {
                return res.json({ status: false, message: 'Duplicate id' })
            }
            res.status(400).send("Validation failed")
            console.log(e.message)
        });
}

const updateSensor = (req, res) => {
    const { id, board, parameters, removedParameters } = req.body;
    // console.log(req.body)
    Sensor.updateSensor(id, board, parameters, removedParameters)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log);
}

const deleteSensor = (req, res) => {
    const { id } = req.params;
    Sensor.deleteSensor(id)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log)
}

const removeParameter = (req, res) => {
    const { sensorId, parameterId } = req.params
    Sensor.removeParameter(sensorId, parameterId)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(err => {
            console.log(err)
        })
}

const uploadSensorImage = async (req, res) => {
    const { sensorId } = req.params;
    const file = req.file;

    Sensor.uploadSensorImage(sensorId, file)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

const removeSensorImage = (req, res) => {
    const { sensorId } = req.params;
    Sensor.removeSensorImage(sensorId)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

const uploadParameterImage = async (req, res) => {
    const { parameterId } = req.params;
    const file = req.file;

    Sensor.uploadParameterImage(parameterId, file)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

const removeParameterImage = (req, res) => {
    const { sensorId } = req.params;
    Sensor.removeParameterImage(sensorId)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    getSensors,
    getAllParameters,
    findOne,
    getBoards,
    sensorsOnBoard,
    createSensor,
    updateSensor,
    deleteSensor,
    removeParameter,
    uploadSensorImage,
    removeSensorImage,
    uploadParameterImage,
    removeParameterImage
}
