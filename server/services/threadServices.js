const Thread = require('../models/Thread')
const mongoose = require('mongoose')

exports.getAll = () => {
    return Thread.find()
}

exports.findOne = (id) => {
    return Thread.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        // {
        //     $lookup: {
        //         from: "actuators",
        //         as: 'devices.actuators',
        //         localField: 'devices.actuatorIds',
        //         foreignField: '_id'
        //     }
        // },
        {
            $lookup: {
                from: "sensors",
                as: 'devices.sensors',
                localField: 'devices.sensorParameters.sensorId',
                foreignField: '_id'
            }
        },
        {
            $addFields: {
                'devices.fullSensorParameters': {
                    $ifNull: [
                        {
                            $map: {
                                input: '$devices.sensorParameters',
                                as: 'parameter',
                                in: {
                                    $mergeObjects: [
                                        {
                                            $let: {
                                                vars: {
                                                    sensor: {
                                                        $first: {
                                                            $filter: {
                                                                input: '$devices.sensors',
                                                                as: 'sensor',
                                                                cond: {
                                                                    $and: [
                                                                        { $eq: ['$$sensor._id', '$$parameter.sensorId'] },
                                                                        // { $eq: ['$$sensor.parameters.id', '$$parameter.parameterId'] },
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                in: {
                                                    $mergeObjects: [
                                                        '$$sensor',
                                                        {
                                                            $let: {
                                                                vars: {
                                                                    filteredParameter: {
                                                                        $first: {
                                                                            $filter: {
                                                                                input: '$$sensor.parameters',
                                                                                as: 'innerParameter',
                                                                                cond: {
                                                                                    $eq: ['$$innerParameter.id', '$$parameter.parameterId']
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                in: {
                                                                    fullName: {
                                                                        $concat: ["$$sensor._id", " - ", "$$filteredParameter.id", " (", "$$filteredParameter.name", ")"]
                                                                    },
                                                                    parameters: "$$filteredParameter"
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        },
                                        '$$parameter'
                                    ]
                                }
                            }
                        },
                        []
                    ]
                }
            }
        },
        {
            $project: {
                'devices.sensors': 0,
            }
        },
        {
            $lookup: {
                from: "actuators",
                let: { "actuatorIds": "$devices.actuatorIds" },
                as: 'devices.actuators',
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$_id", "$$actuatorIds"]
                            }
                        }
                    },
                    {
                        $addFields: {
                            fullName: {
                                $concat: ['$_id', " - ", "$name"]
                            },
                            id: "$_id"
                        },
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ],
            }
        },
    ]).then(data => data[0])
}

exports.createThread = (type, execute, schedule, { sensorParameters = [], actuatorIds = [] }, condition) => {
    const thread = new Thread({ type, schedule, devices: { sensorParameters, actuatorIds }, condition, execute })
    return thread.save()
}

exports.updateThread = (id, type, execute, schedule, devices, condition) => {
    return Thread.findOneAndUpdate({ _id: id }, {
        $set: { type, schedule, devices, condition, execute }
    }, { new: false })
}

exports.changeExecution = (id, execute = false) => {
    return Thread.findOneAndUpdate({ _id: id }, {
        $set: { execute }
    }, { new: false })
}

exports.deleteThread = (id) => {
    return Thread.findByIdAndDelete(id)
}