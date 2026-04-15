const Actuator = require('../services/actuatorServices');

const getActuators = (req, res) => {
    Actuator.getActuators()
        .then((result) => {
            res.json(result)
        })
        .catch(console.log);
}

const viewActuator = (req, res) => {
    const { id } = req.params;

    Actuator.viewActuator(id)
        .then((result) => {
            res.json(result)
        })
        .catch(console.log);
}

const createActuator = async (req, res) => {
    const { id, name, board } = req.body;
    const file = req.file;

    // saving to db in intial point to finish the schema level validation
    const actuator = await Actuator.createActuator(id, name, board).catch(console.log)
    if (!actuator) {
        return res.status(400).send('Validation error')
    }

    if (file) {
        const { fileId, url } = await Actuator.uploadImage(id, file)
        actuator.image = { fileId, url }
        const saved = await Actuator.saveActuator(actuator)
        res.status(201).json(saved)
    } else {
        res.status(201).json(actuator)
    }
}

const updateActuator = async (req, res) => {
    const { id } = req.params;
    const { name, board, imageRemoved } = req.body;
    const file = req.file;
    const actuator = await Actuator.findActuator(id);

    if (!actuator) return res.status(404).send("Actuator not found")

    if (file) {
        const removeFileId = actuator.image?.fileId
        const { fileId, url } = await Actuator.uploadImage(id, file, removeFileId)
        actuator.image = { fileId, url }
    } else if (imageRemoved && actuator.image) {
        await Actuator.removeImage(actuator.image.fileId)
        actuator.image = null
    }
    actuator.name = name;
    actuator.board = board;
    Actuator.saveActuator(actuator)
        .then((result) => {
            res.json({ status: true, result })
        })
        .catch(console.log);
    // Actuator.updateActuator(id, name, board)
    // .then((result) => {
    //     res.json({ status: true, result })
    // })
    // .catch(console.log);
};

/*
const addContent = (req,res) => {
    const {id} = req.params;
    const {content} = req.body;

    Actuator.updateOne( { id : id }, {})
        .then((result) => {
            res.json(result)
        })
        .catch(console.log);
};
*/

const deleteActuator = (req, res) => {
    const { id } = req.params;

    Actuator.deleteActuator(id)
        .then((result) => {
            res.json({ status: true, result })
        })
        .catch(console.log);
};

// const setCurrentCommand = (req, res) => {
//     const { actuatorId } = req.params;
//     const { commandId } = req.body;

//     Actuator.setCurrentCommand(actuatorId, commandId)
//         .then((result) => {
//             res.json(result)
//         })
//         .catch(console.log);
// }

module.exports = {
    getActuators,
    viewActuator,
    createActuator,
    updateActuator,
    deleteActuator,
    // setCurrentCommand
}