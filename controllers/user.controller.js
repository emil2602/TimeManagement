const UserModel = require('../models').Users;
const bcrypt = require('bcryptjs');
const {where, Op} = require("sequelize");
const {bot, sendLog} = require("../bot");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();

        res.json(users);
    } catch (e) {

        console.log(e)
        res.status(400).send({})
    }
}

exports.createUser = async (req, res) => {
    try {
        console.warn("Start creating user", req.body);
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({message: 'Username, password, email is required'});
        }

        const candidate = await UserModel.findOne({where: {email}});

        if (candidate) {
            return res.status(400).json({message: 'User is already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        const user = {
            username: username,
            email: email,
            password: hashedPassword,
            isActive: true,
            role: "user"
        }

        const createdUser = await UserModel.create(user);

        await sendLog(createdUser, {user: true, type: 'create'});
        res.status(201).send(createdUser)

    } catch (e) {
        console.log("Error creating user", e);
        res.status(500).json({message: 'Internal server error'})
    }
}

exports.getUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await UserModel.findOne({ where: { id: id }});

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        res.status(200).json(user);
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Internal server error'})
    }
}

exports.updateUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await UserModel.findOne({ where: { id: id }});

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        await user.update(req.body);

        res.status(200).json({
            name: user.username,
            email: user.email,
            isActive: user.isActive,
            role: user.role
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Internal server error'})
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findOne({ where: { id: id }});

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        await user.update({isActive: false});

        res.status(200).json({
            message: "User successfully deleted"
        })
    } catch (e) {
        console.log(e)
    }
}

exports.findActiveUsers = async (req, res) => {
    const { role } = req.body;

    try {

        const whereCondition = {
            isActive: true
        }

        if ( role ) {
            whereCondition.role = role;
        }

        const users = await UserModel.findAll({
            where: whereCondition
        });

        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.changeIsActiveStatus = async (req, res) => {
    const {id} = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: "Invalid 'isActive' value. Must be true or false." });
    }

    try {
        const user = await UserModel.findOne({ where: { id: id }});

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        await user.update({
            isActive: isActive
        })

        return res.status(200).json({
            message: `User ${isActive ? 'activated' : 'deactivated'} successfully.`,
        });

    } catch (e) {
        console.log(e)
    }
}

exports.searchUsers = async (req, res) => {
    const {username, email, isActive, role, createdAfter, createdBefore} = req.query;

    try {
        const whereCondition = {}

        if (username) {
            whereCondition.username = { [Op.iLike]: `%${username}%` };
        }

        if (email) {
            whereCondition.email = { [Op.iLike]: `%${email}%` };
        }

        if (isActive) {
            whereCondition.isActive = isActive;
        }

        if ( role ) {
            whereCondition.role = role;
        }

        if (createdAfter) {
            whereCondition.createdAt = { ...(whereCondition.createdAt || {}), [Op.gte]: new Date(createdAfter) };
        }
        if (createdBefore) {
            whereCondition.createdAt = { ...(whereCondition.createdAt || {}), [Op.lte]: new Date(createdBefore) };
        }

        const users = await UserModel.findAll({ where: whereCondition });

        if (!users.length) {
            return res.status(404).json({message: "Users not found"})
        }

        return res.status(200).json(users);
    } catch (e) {
        console.log(e)
    }
}

exports.changeUserPassword = async (req, res) => {
    const {id} = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
    }

    try {
        const user = await UserModel.findOne({ where: { id: id }});

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        const isSamePassword  = await bcrypt.compare(newPassword, user?.password)

        if (isSamePassword) {
            return res.status(400).json({message: "New password cannot be the same"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 7);

        await user.update({password: hashedPassword});

        return res.status(200).json({ message: 'Password updated successfully' });

    } catch (e) {
        console.log(e)
    }
}