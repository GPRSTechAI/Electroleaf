const SensorReading = require('../models/SensorReading')
const Sensor = require('../models/Sensor')
const mongoose = require('mongoose')

exports.getAll = ({ forTable, limit, offset }) => {
    let tableAggregation = []
    let limitAggregation = []
    if (forTable) {
        tableAggregation = [
            {
                $unwind: '$readings'
            },
            {
                $project: {
                    _id: 1,
                    time: 1,
                    sensorId: 1,
                    parameterId: '$readings.parameterId',
                    value: '$readings.value',
                    board: '$sensor.board',
                    createdAt: 1,
                    updatedAt: 1
                }
            },
        ]
    }
    if (limit && offset) {
        limitAggregation = [
            {
                $skip: Number(offset)
            },
            {
                $limit: Number(limit)
            }
        ]
    }
    return SensorReading.aggregate([
        {
            $sort: {
                time: -1
            }
        },
        ...limitAggregation,
        {
            $lookup: {
                from: "sensors",
                as: 'sensor',
                localField: 'sensorId',
                foreignField: '_id'
            }
        },
        {
            $addFields: {
                sensor: {
                    $arrayElemAt: [
                        '$sensor', 0
                    ]
                }
            }
        },
        {
            $project: {
                'sensor.parameters': 0
            }
        },
        ...tableAggregation
    ]);
}

exports.totalCount = () => {
    return SensorReading.countDocuments().then(value => ({ count: value }))
}

exports.groupBySensor = () => {
    return SensorReading.aggregate([
        { $sort: { 'time': -1 } },
        {
            $group: {
                _id: '$sensorId',
                'docs': { '$push': '$$ROOT' },
            }
        },
        {
            $project: {
                'reading': {
                    $reverseArray: {
                        $slice: ['$docs', 6]
                    }
                }
            }
        }
    ])
}

exports.getSensorReadings = (sensorId, { limit, offset }) => {
    const offsetObj = offset ? [{
        $skip: Number(offset)
    }] : []
    const limitObj = limit ? [{
        $limit: Number(limit)
    }] : []
    return SensorReading.aggregate([
        {
            $match: { sensorId: (sensorId) }
        },
        {
            $sort: { 'time': -1 }
        },
        ...offsetObj,
        ...limitObj
    ])
}

exports.getDashboardSensorReadings = (sensorId, { limit, offset }) => {
    const filterObj = (limit && offset) ? [{
        $project: {
            'readings': {
                $slice: ['$readings', Number(offset), Number(limit)]
            }
        }
    }] : []
    return SensorReading.aggregate([
        {
            $match: { sensorId: (sensorId) }
        },
        {
            $sort: { 'time': -1 }
        },
        {
            $unwind: '$readings'
        },
        {
            $project: {
                _id: 0,
                x: '$time',
                y: '$readings.value',
                parameterId: '$readings.parameterId'
            }
        },
        {
            $group: {
                _id: '$parameterId',
                'readings': { '$push': '$$ROOT' },
            }
        },
        ...filterObj,
        {
            $project: {
                'readings.parameterId': 0,
            }
        }
    ]).then(result => {
        const obj = result.reduce((acc, curr) => (acc[curr._id] = curr.readings, acc), {})
        return obj
    })
}

// exports.getSensorReadingsWithLimitAndTime = (sensorId, limit, lt) => {
//     return SensorReading.aggregate([

//         { $match: { sensor: (sensorId) } },

//         {
//             $unwind: '$readings'
//         },
//         {
//             $project: {
//                 _id: 1,
//                 sensor: '$sensor',
//                 time: '$time',
//                 parameterReadings: '$readings'
//             }
//         },
//         {
//             $replaceRoot: { newRoot: { $mergeObjects: ["$parameterReadings", "$$ROOT"] } }
//         },
//         {
//             $project: {
//                 parameterReadings: 0
//             }
//         }
//     ])
//         .sort({ createdAt: -1 })
//         .limit(Number(limit))
// }

exports.findOne = readingId => {
    return SensorReading.findOne({ _id: (readingId) })
}

exports.forDashboardBoard = (board, { limit, offset }) => {
    return Sensor.aggregate([
        {
            $match: {
                board
            }
        },
        {
            $project: {
                _id: 1,
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]).then(sensors => {
        const sensorsArray = sensors.map(sensor => sensor._id)
        return SensorReading.aggregate([
            {
                $match: {
                    sensorId: {
                        $in: sensorsArray
                    }
                }
            },
            {
                $sort: { 'time': -1 }
            },
            {
                $unwind: '$readings'
            },
            {
                $group: {
                    _id: {
                        $concat: [
                            '$sensorId', '-', '$readings.parameterId'
                        ]
                    },
                    sensorId: { $first: '$sensorId' },
                    parameterId: { $first: '$readings.parameterId' },
                    lastReading: { $first: '$time' },
                    'docs': {
                        '$push': '$readings.value'
                    },
                }
            },
            {
                $project: {
                    'readings': {
                        // $reverseArray: {
                        //     $slice: ['$docs', 6]
                        // }
                        $slice: ['$docs', 6]
                    },
                    sensorId: 1,
                    parameterId: 1,
                    lastReading: 1
                }
            },
            {
                $group: {
                    _id: '$sensorId',
                    'parameters': {
                        '$push': {
                            k: '$parameterId',
                            v: {
                                lastReading: '$lastReading',
                                readings: '$readings'
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    parameters: {
                        $arrayToObject: '$parameters'
                    }
                }
            }
        ]).then(result => {
            const obj = result.reduce((acc, curr) => (acc[curr._id] = curr.parameters, acc), {})
            return obj
        })
    })
}

exports.forDashboardParameter = (sensorId, parameterId, { limit, offset }) => {
    const offsetObj = offset ? [{
        $skip: Number(offset)
    }] : []
    const limitObj = limit ? [{
        $limit: Number(limit)
    }] : []
    return SensorReading.aggregate([
        {
            $match: {
                sensorId: sensorId,
                'readings.parameterId': parameterId
            }
        },
        {
            $sort: { 'time': -1 }
        },
        {
            $project: {
                _id: 0,
                time: 1,
                readings: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: '$readings',
                                as: 'reading',
                                cond: {
                                    $eq: ['$$reading.parameterId', parameterId]
                                }
                            }
                        }, 0
                    ]
                }
            }
        },
        {
            $project: {
                x: '$time',
                y: '$readings.value'
            }
        },
        ...offsetObj,
        ...limitObj
    ])
}

exports.forConditionFunction = async (sensorId, parameterId, limit) => {
    const [sensor] = await Sensor.aggregate([
        {
            $match: {
                _id: sensorId,
                'parameters.id': parameterId
            },
        },
        {
            $addFields: {
                parameter: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: '$parameters',
                                as: 'parameter',
                                cond: {
                                    $eq: ['$$parameter.id', parameterId]
                                }
                            }
                        }, 0
                    ]
                },
                sensorId,
                parameterId
            }
        },
        {
            $project: {
                parameters: 0
            }
        }
    ])

    if (!sensor) return null

    const readings = await SensorReading.aggregate([
        {
            $match: {
                sensorId: sensorId,
                'readings.parameterId': parameterId
            }
        },
        {
            $sort: { 'time': -1 }
        },
        {
            $limit: limit
        },
        {
            $project: {
                _id: 0,
                time: 1,
                readings: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: '$readings',
                                as: 'reading',
                                cond: {
                                    $eq: ['$$reading.parameterId', parameterId]
                                }
                            }
                        }, 0
                    ]
                }
            }
        },
        {
            $project: {
                time: 1,
                value: '$readings.value'
            }
        }
    ])
    sensor.readings = readings;
    sensor.planeReadings = readings.map(reading => reading.value)
    return sensor
}

exports.addReading = (sensorId, time, readings) => {
    const sensorReading = new SensorReading({
        sensorId, time, readings
    })
    return sensorReading.save()
}

exports.updateReading = (id, sensorId, time, readings) => {
    return SensorReading.updateOne({ _id: id }, {
        $set: { sensorId, time, readings }
    })
}

exports.deleteSensorReading = id => {
    return SensorReading.findByIdAndDelete(id)
}

// exports.getAllNReadingsWithLimitAndTime = (limit, lt) => {
//     return SensorReading.aggregate([
//         { $match: { 'time': { $lte: Number(lt) } } },
//         { $sort: { 'time': -1, 'createdAt': -1 } },
//         { $limit: Number(limit) },
//         {
//             $unwind: '$readings'
//         },
//         {
//             $lookup: {
//                 from: "sensors",
//                 as: '_sensor',
//                 localField: 'sensor',
//                 foreignField: 'id'
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 sensorId: '$sensor',
//                 time: '$time',
//                 board: '$_sensor.board',
//                 parameterReadings: '$readings'
//             }
//         },
//         {
//             $replaceRoot: { newRoot: { $mergeObjects: ["$parameterReadings", "$$ROOT"] } }
//         },
//         {
//             $project: {
//                 parameterReadings: 0
//             }
//         }
//         // {
//         //     $lookup: {
//         //         from: "sensors",
//         //         as: '_sensor',
//         //         localField: 'sensor',
//         //         foreignField: 'id'
//         //     }
//         // },
//         // {
//         //     $project: {
//         //         time: '$time',
//         //         readings: '$readings',
//         //         sensorId: '$sensor',
//         //         board: { $arrayElemAt: ['$_sensor.board', 0] },
//         //         name: { $arrayElemAt: ['$_sensor.parameters.name', 0] },
//         //         unit: { $arrayElemAt: ['$_sensor.parameters.unit', 0] },
//         //         createdAt: '$createdAt'
//         //     }
//         // }
//     ])
// }

// exports.clearAllReadings = () => {
//     return SensorReading.deleteMany({})
// }

// exports.manualAggregation = (aggregation) => {
//     return SensorReading.aggregate(aggregation)
// }