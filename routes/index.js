const { Router } = require('express');
const api = Router();
const userRoutes = require('./users.routes');
const loginRoutes = require('./login.routes');
const { verifyToken } = require('../middlewares/auth.middleware');

// TODO: Implementar roles y autorizaciones con tokens -> done
// TODO: Login, con JWT (Json Web Token) -> done
api.use('/login', loginRoutes);
api.use('/users', verifyToken, userRoutes);

module.exports = api;