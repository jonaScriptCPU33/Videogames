const router = require('express').Router()
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

/* Rutas */
const routeVideoGame = require('./VideoGameRoute')
const routeGenre = require('./genreRoutes')
const routePlatforms = require('./platforms')

/* Middlewares */
router.use(routeVideoGame)
router.use(routeGenre)
router.use(routePlatforms)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
