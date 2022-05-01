const express = require('express');
const app = express();
const exphbs= require('express-handlebars');

app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'))

app.listen(5000, () => {
	console.log("Server started on port 5000.");
});

const { MongoClient } = require("mongodb");

