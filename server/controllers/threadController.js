const Thread = require('../services/threadServices')
const threadScheduler = require('../schedule')

// threadScheduler.schedule(1, { type: 'once', schedule: { once: { dateTime: '11/20/2021 19:59' } } })
// threadScheduler.schedule(2, { type: 'repeat', schedule: { repeat: { time: { hour: 19, minute: 58 }, days: [0, 1, 2, 3, 4, 5, 6] } } })
// threadScheduler.schedule(3, { type: 'interval', schedule: { interval: { interval: 1 } } })
// threadScheduler.schedule(4, { type: 'interval', schedule: { interval: { interval: 1 } } })

const getAll = (req, res) => {
    Thread.getAll()
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const findOne = (req, res) => {
    const { id } = req.params;
    Thread.findOne(id)
        .then(result => {
            res.json(result)
        })
        .catch(console.log)
}

const createThread = (req, res) => {
    const { type, execute, schedule, devices, condition } = req.body;
    Thread.createThread(type, execute, schedule, devices, condition)
        .then(result => {
            if (result.execute) {
                threadScheduler.schedule(result._id, result)
            }
            res.json({ status: true, result })
        })
        .catch(console.log);
}

const updateThread = (req, res) => {
    const { id } = req.params
    if (!id) return res.json({ status: false })
    const { type, execute, schedule, devices, condition } = req.body;
    Thread.updateThread(id, type, execute, schedule, devices, condition)
        .then(result => {
            const newThread = { _id: id, type, execute, schedule, devices, condition }
            if (result.execute && execute) {                    // need to be rescheduled
                threadScheduler.reschedule(id, newThread)
            } else if (result.execute && !execute) {          // need to cancel and delete the schedule
                threadScheduler.delete(id)
            } else if (!result.execute && execute) {             // need to create a new schedule
                threadScheduler.schedule(result._id, result)
            }                                                       // else nothing to do

            res.json({ status: true, result: newThread })
        })
        .catch(console.log);
}

const changeExecution = (req, res) => {
    const { id, execute } = req.body;
    if (!id) return res.json({ status: false })
    Thread.changeExecution(id, execute)
        .then(result => {
            const newThread = { ...result, execute }
            if (result.execute && execute) {                    // need to be rescheduled
                threadScheduler.reschedule(id, newThread)
            } else if (result.execute && !execute) {          // need to cancel and delete the schedule
                threadScheduler.delete(id)
            } else if (!result.execute && execute) {             // need to create a new schedule
                threadScheduler.schedule(result._id, result)
            }                                                       // else nothing to do

            res.json({ status: true, result: newThread })
        })
        .catch(console.log);
}


const deleteThread = (req, res) => {
    const { id } = req.params
    Thread.deleteThread(id)
        .then((result) => {
            threadScheduler.delete(id)
            res.json({ status: true, result })
        })
        .catch(console.log)
}


module.exports = {
    getAll,
    findOne,
    createThread,
    updateThread,
    changeExecution,
    deleteThread
}