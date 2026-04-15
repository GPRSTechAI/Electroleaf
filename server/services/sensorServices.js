const mongoose = require('mongoose')
const Sensor = require('../models/Sensor')
const SensorReading = require('../models/SensorReading')
const imageStorage = require('../utils/imageStrorage')
const ObjectId = mongoose.Types.ObjectId

exports.getSensors = () => {
    return Sensor.aggregate([
        {
            $addFields: {
                id: '$_id'
            }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
}

exports.getAbstract = () => {
    return Sensor.aggregate([
        {
            $addFields: {
                parameters: { $size: "$parameters" },
                id: '$_id'
            }
        },
        {
            $project: {
                parameters: 0,
                _id: 0
            }
        }
    ])
}

exports.getAllParameters = () => {
    return Sensor.aggregate([
        {
            $unwind: '$parameters'
        },
        {
            $addFields: {
                sensorId: '$_id',
                parameterId: '$parameters.id',
                fullName: {
                    $concat: ["$_id", " - ", "$parameters.id", " (", "$parameters.name", ")"]
                }
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: ["$parameters", "$$ROOT"] } }
        },
        {
            $project: {
                parameters: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
}

exports.findOne = async (id) => {
    const count = await SensorReading.countDocuments({ sensorId: id })

    const [result] = await Sensor.aggregate([
        {
            $match: {
                _id: id
            }
        },
        {
            $addFields: {
                id: '$_id'
            }
        },
        {
            $project: {
                _id: 0
            }
        },
    ])

    result.sensorReadings = count
    return result
}

exports.getBoards = () => {
    return Sensor.distinct("board")
}

exports.sensorsOnBoard = (board) => {
    return Sensor.aggregate([
        {
            $match: {
                board
            }
        },
        {
            $addFields: {
                id: '$_id'
            }
        },
        {
            $project: {
                _id: 0,
                board: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
}

exports.createSensor = (_id, board, parameters) => {
    const sensor = new Sensor({
        _id, board, parameters
    })
    return sensor.save()
}

exports.updateSensor = async (_id, board, parameters = [], removedParameters = []) => {
    const operations = [
        {
            updateOne: {
                filter: {
                    _id
                },
                update: {
                    $set: { board },
                    $pull: {
                        parameters: { id: { $in: removedParameters } }
                    },
                }
            }
        },
        {
            updateOne: {
                filter: {
                    _id
                },
                update: {
                    $push: {
                        parameters: { $each: parameters.filter(parameter => parameter._type === 'new') }
                    }
                }
            }
        },
        ...parameters.filter(parameter => parameter._type === 'old').map(parameter => {
            return {
                updateOne: {
                    filter: {
                        _id,
                        "parameters.id": parameter.id
                    },
                    update: {
                        $set: {
                            "parameters.$.name": parameter.name,
                            "parameters.$.unit": parameter.unit,
                        }
                    }
                }
            }
        })
    ]
    return Sensor.bulkWrite(operations)

    // parameters.filter(parameter => parameter._type === 'old').forEach(async parameter => {
    //     console.log(parameter)
    //     await Sensor.updateOne(
    //         { _id: id, 'parameters.id': parameter.id },
    //         {
    //             $set: {
    //                 "parameters.$.id": parameter.id,
    //                 "parameters.$.name": parameter.name,
    //                 "parameters.$.unit": parameter.unit,
    //             }
    //         }
    //     ).catch(console.log)
    // })
}

exports.deleteSensor = (_id) => {
    return Sensor.deleteOne({ _id })
}

exports.removeParameter = (sensorId, parameterId) => {
    return Sensor.updateOne(
        {
            _id: sensorId,
        },
        {
            $pull: {
                parameters: { id: parameterId }
            }
        }
    )
}

exports.uploadSensorImage = async (sensorId, file) => {
    const sensor = await Sensor.findById(sensorId)
    if (!sensor) return false
    const removeFile = sensor.image?.fileId
    const { fileId, url } = await imageStorage.upload(file, sensorId, `sensorImages`, removeFile)
    sensor.image = { url, fileId }
    await sensor.save()
    return { fileId, url }
}

exports.removeSensorImage = async sensorId => {
    const sensor = await Sensor.findById(sensorId)
    if (!sensor) return false
    const removeFile = sensor.image?.fileId
    await imageStorage.remove(removeFile)
    sensor.image = null;
    return sensor.save()
}

exports.uploadParameterImage = async (parameterId, file) => {
    const sensor = await Sensor.findOne({ 'parameters.id': parameterId })
    if (!sensor) return false
    const parameter = sensor.parameters.find(para => para.id === parameterId)
    const removeFile = parameter.image?.fileId
    const { fileId, url } = await imageStorage.upload(file, parameterId, `sensorImages`, removeFile)
    parameter.image = { url, fileId }
    await sensor.save()
    return { fileId, url }
}

exports.removeParameterImage = async parameterId => {
    const sensor = await Sensor.findOne({ 'parameters.id': parameterId })
    if (!sensor) return false
    const parameter = sensor.parameters.find(para => para.id === parameterId)
    const removeFile = parameter.image?.fileId
    await imageStorage.remove(removeFile)
    parameter.image = null;
    return sensor.save()
}