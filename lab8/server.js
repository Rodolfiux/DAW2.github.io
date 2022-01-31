
var express = require("express");
var path = require("path");


var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var tables = [];
var waitList = [];


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", (req, res) => {
    return res.json(tables);
});

app.get("/api/waitlist", (req, res) => {
    return res.json(waitList);
});

app.post("/api/reservations", function (req, res) {
    var newReservation = req.body;
    if (tables.length < 5) {
		tables.push(newReservation);
		res.send(true);
	} else {
		waitList.push(newReservation);
		res.send(false);
	}
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
