const catchError = require('../utils/catchError');
const InCome = require('../models/InCome');


const getAll = catchError(async(req, res) => {
    
    const results = await InCome.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const {name, description, amount}= req.body;
    const body = {name, description, amount, userId}
    const result = await InCome.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await InCome.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await InCome.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await InCome.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}