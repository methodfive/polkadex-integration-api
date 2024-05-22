const express = require("express");
const initializeRoutes = require("./routes/routes");
const {initializeMiddlewares, initializeHandlers} = require("./middlewares");
const {EXPRESS_PORT, EXPRESS_TIMEOUT} = require("./constants");

const app = express();
const port = EXPRESS_PORT;

initializeMiddlewares(app);
initializeRoutes(app);
initializeHandlers(app);

let server = app.listen(port, () => {
  console.log(`🚀  Server started at http://localhost:${port}`);
});

server.timeout = EXPRESS_TIMEOUT;