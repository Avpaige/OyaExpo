require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const customAuthMiddleware = require("./middleware/custom-auth-middleware");

// controller imports
const userController = require("./controllers/user-controller");
const viewsController = require("./controllers/views-controller");

// directory references
const clientDir = path.join(__dirname, "../client");
// set up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the cookie-parser to help with auth token,
// it must come before the customAuthMiddleware
app.use(cookieParser());
app.use(customAuthMiddleware);

// serve up the public folder so we can request static
// assets from the client
app.use("/assets", express.static(clientDir));

// hook up our controllers
app.use(userController);
app.use(viewsController);

// Requiring our models for syncing
const db = require("./models/index");

db.sequelize.sync({ force: true }).then(() => {
	// inside our db sync callback, we start the server
	// this is our way of making sure the server is not listening
	// to requests if we have not made a db connection
	app.listen(PORT, () => {
		console.log(`App listening on PORT ${PORT}`);
	});
});
