const Tank = require('../models/Tank')
const mongoose = require('mongoose')

exports.getTanks = () => {
    return Tank.aggregate([
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

exports.findOne = (id) => {
    return Tank.aggregate([
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

exports.createTank = (_id, name, unit) => {
    const tank = new Tank({
        _id, name, unit
    })
    return tank.save()
}

exports.updateTank = async (oldId, newId, name, unit) => {
    return Tank.updateOne({ _id: oldId }, {
        $set: {
            _id: newId,
            name,
            unit
        }
    })
}

exports.updateReading = async (tankId, time, value) => {
    return Tank.updateOne({ _id: tankId }, {
        $set: {
            reading: {
                time, value
            }
        }
    })
}

exports.deleteTank = (_id) => {
    return Tank.deleteOne({ _id })
}