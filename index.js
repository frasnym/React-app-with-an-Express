const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

// Databases
require("./db/mongoose");
const UserModel = require("./models/user.model");

app.use(cors()); // allow CORS, Access-Control-Allow-Origin
app.use(express.json()); // body raw JSON

// Login API
app.post("/login", async (req, res) => {
	try {
		const user = await UserModel.findOne({
			username: req.body.username,
			password: req.body.password,
		});

		if (!user) {
			return res.status(404).send();
		}

		return res.status(200).send(user);
	} catch (e) {
		return res.status(404).send();
	}
});

//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));
//production mode
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	//
	app.get("*", (req, res) => {
		res.sendFile(path.join((__dirname = "client/build/index.html")));
	});
}

//build mode
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

//start server
app.listen(port, (req, res) => {
	console.log(`server listening on port: ${port}`);
});
