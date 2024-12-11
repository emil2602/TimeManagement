const {Op} = require("sequelize");
const {sendLog} = require("../bot");
const TaskModel = require("../models").Task;


exports.createTask = async (req, res) => {
    const { title, description, priority, column_id, creator_id, assignee_id   } = req.body;

    try {
        if (!title || !creator_id || !priority || !column_id || !assignee_id) {
            return res.status(400).json({message: 'Some fields are required'});
        }

        const newTask = await TaskModel.create(req.body);

        await sendLog(newTask, {task: true, type: "create"})
        res.status(200).json(newTask);

    } catch (e) {


        return res.status(500).json({message: 'Internal server error'})
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await TaskModel.findOne({ where: { id: id }});

        if (!task) {
            return res.status(400).json({message: "Task not found"})
        }

        res.status(200).json(task);

    } catch (e) {
        if (typeof id !== "number") {
            return res.status(400).json({message: "Wrong type of id"})
        }
        return res.status(500).json({message: 'Internal server error'})
    }
}

exports.updateTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await TaskModel.findOne({ where: { id: id }});

        if (!task) {
            return res.status(400).json({message: "Task not found"})
        }

        await task.update(req.body);

        res.status(200).json(task);

    } catch (e) {
        if (typeof id !== "number") {
            return res.status(400).json({message: "Wrong type of id"})
        }
        return res.status(500).json({message: 'Internal server error'})
    }
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await TaskModel.findOne({where: {id: id}});

        if (!task) {
            return res.status(400).json({message: "Task not found"})
        }

        await task.destroy();

        return res.status(200).json({message: "Task deleted"})
    } catch (e) {

        if (typeof id !== "number") {
            return res.status(400).json({message: "Wrong type of id"})
        }
        return res.status(500).json({message: 'Internal server error'})
    }
}

exports.getTasksList = async (req, res) => {
    const { title, description, priority, column_id, assignee_id, createdAfter, createdBefore } = req.query;

    try {
        const whereCondition = {}

        if (title) {
            whereCondition.title = { [Op.iLike]: `%${title}%` }
        }

        if (description) {
            whereCondition.description = { [Op.iLike]: `%${description}%` }
        }

        if (priority) {
            whereCondition.priority = priority
        }

        if (column_id) {
            whereCondition.column_id = column_id
        }

        if (assignee_id) {
            whereCondition.assignee_id = assignee_id
        }

        if (createdAfter) {
            whereCondition.createdAt = { ...(whereCondition.createdAt || {}), [Op.gte]: new Date(createdAfter) };
        }

        if (createdBefore) {
            whereCondition.createdAt = { ...(whereCondition.createdAt || {}), [Op.lte]: new Date(createdBefore) };
        }

        const tasks = await TaskModel.findAll({ where: whereCondition });

        if (!tasks.length) {
            return res.status(404).json({message: "Tasks not found"})
        }

        return res.status(200).json(tasks);

    } catch (e) {
        return res.status(500).json({message: 'Internal server error'})
    }
}