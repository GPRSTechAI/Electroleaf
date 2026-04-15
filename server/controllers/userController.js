const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const userServices = require('../services/userServices')

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userServices.getAllUsers()

    if (users) {
        res.json(users)
    } else {
        res.status(400)
        throw new Error("Some error occured")
    }
})

const createUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.status(400)
        throw new Error("Please add missed fields")
    }

    const user = await userServices.createUser({ firstname, lastname, email, password })

    if (user) {
        res.status(201).json(user)
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const findUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await userServices.findUserById(id)
    res.json(user)
})

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, email } = req.body
    if (!firstname || !lastname || !email) {
        res.status(400)
        throw new Error("Please add missed fields")
    }
    userServices.updateUser({ id, firstname, lastname, email })
        .then((result) => {
            res.json({ status: true, result })
        })
        .catch(console.log);
})

const updatePrivileges = asyncHandler((req, res) => {
    const { id } = req.params
    const { privileges } = req.body
    if (!privileges) {
        res.status(400)
        throw new Error("Please add missed fields")
    }
    userServices.updatePrivileges(id, privileges)
        .then((result) => {
            res.json({ status: true, result })
        })
        .catch(console.log);
})

const deleteUser = (req, res) => {
    const { id } = req.params;

    userServices.deleteUser(id)
        .then((result) => {
            res.json({ status: true, result })
        })
        .catch(console.log);
};

module.exports = {
    getAllUsers,
    createUser,
    findUser,
    updateUser,
    updatePrivileges,
    deleteUser
}