const { getAll, create, getOne, remove, update } = require('../controllers/inCome.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJwt');

const routerInCome = express.Router();

routerInCome.route('/')
    .get(getAll)
    .post(verifyJWT,create);

    routerInCome.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerInCome;