const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async () => {
    const users = await User.aggregate([
        {
            $sort: {
                createdAt: 1
            }
        },
        {
            $addFields: {
                id: '$_id'
            }
        },
        {
            $project: {
                _id: 0,
                password: 0
            }
        }
    ])
    return users;
}

exports.createUser = async ({ firstname, lastname, email, password }) => {
    // check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new Error("User already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        firstname, lastname, email, password: hashedPassword
    })
    return user;
}

exports.findUserById = (id) => {
    return User.findOne({ _id: id }).select('-password')
}

exports.findUserByEamil = (email) => {
    return User.findOne({ email }).select('-password')
}

exports.getUserById = (id) => {
    return User.findById(id).select('-password')
}

exports.updateUser = ({ id, firstname, lastname, email }) => {
    return User.updateOne({ _id: id }, {
        $set: { firstname, lastname, email }
    })
}

exports.updatePrivileges = (id, privileges = []) => {
    return User.updateOne({ _id: id }, {
        $set: { privileges }
    })
}

exports.deleteUser = id => {
    return User.deleteOne({ _id: id, isAdmin: false })
}