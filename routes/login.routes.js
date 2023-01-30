const { Router } = require('express');
const loginController = require('../controllers/login.controller');

const loginRoutes = Router();

loginRoutes.post('/', loginController.login);

module.exports = loginRoutes;