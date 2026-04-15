const Actuator = require('../models/Actuator')
const mongoose = require('mongoose')
const imageStorage = require('../utils/imageStrorage')

exports.getActuators = () => {
    return Actuator.aggregate([
        {
            $addFields: {
                id: '$_id',
                fullName: {
                    $concat: ['$_id', " - ", "$name"]
                }
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

exports.viewActuator = id => {
    return Actuator.aggregate([
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
    ]).then(result => result[0])
}

exports.findActuator = id => {
    return Actuator.findById(id)
}

exports.uploadImage = async (actuatorId, file, removeFile) => {
    const uploaded = await imageStorage.upload(file, actuatorId, `actuatorImages`, removeFile)
    return uploaded
}

exports.removeImage = (fileId) => {
    return imageStorage.remove(fileId)
}

exports.createActuator = (_id, name, board) => {
    const actuator = new Actuator({
        _id, name, board
    })
    return actuator.save()
}

exports.saveActuator = (actuator) => {
    return actuator.save()
}

exports.updateActuator = (_id, name, board) => {
    return Actuator.updateOne({ _id }, {
        $set: { name, board }
    })
}

exports.setCurrentCommand = (actuatorId, running, currentCommand) => {
    return Actuator.updateOne({ _id: actuatorId }, {
        $set: {
            command: {
                running,
                currentCommand
            }
        }
    })
}

exports.deleteActuator = id => {
    return Actuator.deleteOne({ _id: id })
}