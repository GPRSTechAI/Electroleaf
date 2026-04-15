const SensorReading = require('../services/sensorReadingServices');

const getAll = (req, res) => {
    const { forTable, limit, offset } = req.query
    SensorReading.getAll({ forTable, limit, offset })
        .then(result => res.json(result))
        .catch(console.log)
};

const totalCount = (req, res) => {
    SensorReading.totalCount()
        .then(result => res.json(result))
        .catch(console.log)
}

const groupBySensor = (req, res) => {
    //const { count } = req.params;
    SensorReading.groupBySensor()
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
};

const getSensorReadingsWithLimitAndTime = (req, res) => {
    let { sensorId, limit, lt } = req.params;
    SensorReading.getSensorReadingsWithLimitAndTime(sensorId, limit, lt)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
};

const getSensorReadings = (req, res) => {
    const { sensorId } = req.params;
    const { limit, offset } = req.query;
    SensorReading.getSensorReadings(sensorId, { limit, offset })
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
};

const getDashboardSensorReadings = (req, res) => {
    const { sensorId } = req.params;
    const { limit, offset } = req.query;
    SensorReading.getDashboardSensorReadings(sensorId, { limit, offset })
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
};

const findOne = (req, res) => {
    const { readingId } = req.params;
    SensorReading.findOne(readingId)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const forDashboardBoard = (req, res) => {
    const { board } = req.params;
    const { limit, offset } = req.query;
    SensorReading.forDashboardBoard(board, { limit, offset })
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const forDashboardParameter = (req, res) => {
    const { sensorId, parameterId } = req.params;
    const { limit, offset } = req.query;
    SensorReading.forDashboardParameter(sensorId, parameterId, { limit, offset })
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const addReading = (req, res) => {
    const { sensorId, time, readings } = req.body;
    console.log(readings)
    SensorReading.addReading(sensorId, time, readings)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(error => {
            res.json({ status: false, message: error.message })
        });
}

const updateReading = (req, res) => {
    const { id } = req.params;
    const { sensorId, time, readings } = req.body;
    // update the SensorReading details
    SensorReading.updateReading(id, sensorId, time, readings)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log)

}

const deleteSensorReading = (req, res) => {
    const { id } = req.params;
    SensorReading.deleteSensorReading(id)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log)
}

const getAllNReadingsWithLimitAndTime = (req, res) => {
    const { limit, lt } = req.params;
    SensorReading.getAllNReadingsWithLimitAndTime(limit, lt)
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(console.log)
}

const clearAllReadings = (req, res) => {
    SensorReading.clearAllReadings()
        .then(() => res.json('ok'))
        .catch(console.log)
}

module.exports = {
    getAll,
    totalCount,
    groupBySensor,
    getSensorReadings,
    getDashboardSensorReadings,
    // getSensorReadingsWithLimitAndTime,
    addReading,
    findOne,
    forDashboardBoard,
    forDashboardParameter,
    updateReading,
    deleteSensorReading,
    // getAllNReadingsWithLimitAndTime,
    // clearAllReadings
}
