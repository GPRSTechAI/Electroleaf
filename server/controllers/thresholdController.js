const thresholdServices = require('../services/thresholdServices');

const getAll = (req, res) => {
    thresholdServices.getAll()
        .then(result => {
            res.json(result)
        })
        .catch(console.log);
}

const findOne = (req, res) => {
    const { id } = req.params;
    thresholdServices.findOne(id)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const createThreshold = async (req, res) => {
    const { key, value, status } = req.body;
    // if (status) {
    //     res.publish('ELF_IOT/threshold', JSON.stringify({ [key]: value }))
    // }
    // const published = await thresholdServices.publishThreshold({ key, value, status }).catch(e => {
    //     res.status(403).json({ error: "Device not responded" })
    // })

    // if (published) {
    thresholdServices.createThreshold({ key, value, status })
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(e => {
            if (e.message.indexOf('duplicate key error') !== -1) {
                return res.json({ status: false, message: 'Duplicate id' })
            }
            res.json({ status: false, message: e.message })
        });
    // }
}

const updateThreshold = async (req, res) => {
    const { id } = req.params;
    const { key, value, status } = req.body;

    // if (status) {
    //     res.publish('ELF_IOT/threshold', JSON.stringify({ [key]: value }))
    // }
    // const published = await thresholdServices.publishThreshold({ key, value, status }).catch(error => {
    //     res.status(403).json({ error })
    // })

    // if (published) {
    thresholdServices.updateThreshold(id, { key, value, status })
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log);
    // }
}

const updateStatus = (req, res) => {
    const { id, status } = req.body;

    thresholdServices.updateStatus(id, status)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log);
}

const deleteThreshold = (req, res) => {
    const { id } = req.params;
    thresholdServices.deleteThreshold(id)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log)
}

module.exports = {
    getAll,
    findOne,
    createThreshold,
    updateThreshold,
    updateStatus,
    deleteThreshold,
}
