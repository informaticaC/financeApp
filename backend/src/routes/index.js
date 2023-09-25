const express = require('express');
const routerUser = require('./user.router');
const routerObjective = require('./objective.router');
const routerInCome = require('./inCome.router');
const router = express.Router();

//colocar las rutas aquí
router.use('/users', routerUser);
router.use('/objectives', routerObjective);
router.use('/income', routerInCome);


module.exports = router;