const Tank = require('../services/tankServices');

const getTanks = (req, res) => {
    Tank.getTanks()
        .then(result => {
            res.json(result)
        })
        .catch(console.log);
}

const findOne = (req, res) => {
    const { id } = req.params;
    Tank.findOne(id)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const createTank = (req, res) => {
    const { id, name, unit } = req.body;
    Tank.createTank(id, name, unit)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(e => {
            if (e.message.indexOf('duplicate key error') !== -1) {
                return res.json({ status: false, message: 'Duplicate id' })
            }
            console.log(e.message)
        });
}

const updateTank = (req, res) => {
    const { id: oldId } = req.params;
    const { id: newId, name, unit } = req.body;
    // console.log(req.body)
    Tank.updateTank(oldId, newId, name, unit)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log);
}

const updateReading = (req, res) => {
    const { id } = req.params;
    const { time, value } = req.body;

    Tank.updateReading(id, time, value)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log);
}

const deleteTank = (req, res) => {
    const { id } = req.params;
    Tank.deleteTank(id)
        .then(result => {
            res.json({ status: true, result })
        })
        .catch(console.log)
}

module.exports = {
    getTanks,
    findOne,
    createTank,
    updateTank,
    updateReading,
    deleteTank,
}
