const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
}

function errorHandler(err, req, res, next) {
  console.log(req.path, err.message, err.stack);
  res.status(res.statusCode || 500);
  res.json({
    type: "Error",
    message: err.message
  });
}

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }

  return compression.filter(req, res)
}

function initializeMiddlewares(app) {
  const corsOptions = {
    origin: '*',
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: false
  };

  app.use(cors(corsOptions));
  app.use(compression({ filter: shouldCompress }))
  app.use(helmet());

  /*app.use((req, res, next) => {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Content-Security-Policy": "default-src 'unsafe-eval' *",
      "X-Content-Security-Policy": "default-src *",
      "X-WebKit-CSP": "default-src *"
    })
    next();
  });*/
}

function initializeHandlers(app) {
  app.use(notFound);
  app.use(errorHandler);
}

module.exports = {
  initializeMiddlewares,
  initializeHandlers
};