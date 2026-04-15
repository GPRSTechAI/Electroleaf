const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendMail = require("../utils/email");
const config = require('../config/keys')
const { makeUid } = require('../utils/utils')

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const encryptedUser = {
            _id: user.id,
            email: user.email
        }
        return {
            _id: user.id,
            accessToken: generateAccessToken(encryptedUser),
            refreshToken: generateRefreshToken(encryptedUser),
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            }
        };
    } else {
        throw new Error("Invalid credientials")
    }
}


exports.tokenRefresh = (refreshToken) => {
    try {
        const decodedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = generateAccessToken({ id: decodedUser._id, email: decodedUser.email })
        return accessToken;
    } catch (error) {
        console.log(error)
        throw new Error("Error occured")
    }
}

exports.changePassword = async ({ id, oldPassword, newPassword }) => {
    try {
        const user = await User.findOne({ _id: id })

        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            const result = await changeUserPassword(id, newPassword)
            return "Password changed"
        } else {
            console.log("User not found/ pasword didn't match")
            throw new Error("User not found/ pasword didn't match")
        }
    } catch (error) {
        console.log(error)
        throw new Error("Error occured")
    }
}

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email })
    if (user) {
        const resetToken = makeUid(6)
        const expiration = 30
        const expirationTime = Date.now() + expiration * 60 * 1000
        const accountRecovery = {
            token: resetToken,
            expirationTime
        }
        const result = await User.updateOne({ _id: user._id }, {
            $set: { accountRecovery }
        })

        const resetUrl = config.FROENTEND_DOMAIN + "/" + config.PASSWORD_RESET_PATH + "/" + email + "/" + resetToken

        console.log(resetUrl)
        const params = {
            to: email,
            subject: "Password recovery",
            title: "ElectroLeaf Password Recovery",
            text:
                "Your password reset vertification code is " +
                resetToken,
            html:
                `<div>Please reset your password using this link  ` +
                `<a href="${resetUrl}">${resetUrl}</a>` +
                `</div>`
        }

        return sendMail(
            params,
            (err, response) => {
                console.log(JSON.stringify({ err, response, result }, null, 2));
                if (err) throw new Error("Cannot send email")
                return `Reset email sent to ${response && response.accepted && response.accepted[0]}`
            }
        );

    } else {
        console.log("Email not found")
        throw new Error("Email not found")
    }
}


exports.resetPassword = async ({ email, token, newPassword }) => {
    try {
        const user = await User.findOne({ email })

        if (user.accountRecovery && user.accountRecovery.token === token) {
            if (user.accountRecovery.expirationTime && (user.accountRecovery.expirationTime > Date.now())) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                const result = await User.updateOne({ _id: user._id }, {
                    $set: { password: hashedPassword, accountRecovery: { token: null, expirationTime: null } }
                })
                return "Password Changed"
            } else {
                console.log("Reset Token expired")
                throw new Error("Reset Token expired")
            }

        } else {
            console.log("Not valid credientials")
            throw new Error("Not valid credientials")
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.logout = (userId) => {

}

const generateAccessToken = (object) => {
    return jwt.sign(object, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',

    })
}

const generateRefreshToken = (object) => {
    return jwt.sign(object, process.env.REFRESH_TOKEN_SECRET)
}


const changeUserPassword = async (id, newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const result = await User.updateOne({ _id: id }, {
        $set: { password: hashedPassword }
    })
    return result
}