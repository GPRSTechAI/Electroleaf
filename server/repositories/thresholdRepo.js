const Threshold = require('../models/Threshold')
const mongoose = require('mongoose')

exports.getAllUnpublished = () => {
    return Threshold.find({ status: true, published: false })
}

exports.updatePublished = (_id) => {
    return Threshold.updateOne({ _id: _id }, {
        $set: { published: true }
    })
}