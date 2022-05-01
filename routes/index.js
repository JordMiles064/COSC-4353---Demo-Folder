const router = require('express').Router();

const UserCredentials = require("../models/UserCredentials");
const ClientInformation = require("../models/ClientInformation");
const FuelQuote = require("../models/FuelQuote");
const { STATES } = require('mongoose');

const PricingModule = require("./PricingModule");

router.post('/login', (req, res) => {
	UserCredentials.findOne({ ID: req.body.username }).then(user => {
		console.log("Trying to find entry in DB with ID: "+req.body.username);
		if(!user){
			console.log("Username does not exist.");
			return res.status(500).send({
				message: "Username does not exist. <a href='http://localhost:5000/signup.html'>Sign up</a> here!"
			});
		}
		
		user.comparePassword(req.body.password).then(correct => {
			if(correct) {
				res.send({
					ID: user.ID
				});
			} else {
				console.log("Incorrect password.");
				return res.status(400).send({
					message: "Incorrect password."
				});
			}
		});
	});
});


router.post('/register', (req,res) => {
	UserCredentials.findOne({ ID: req.body.ID }).then(user => {
		if(user){
			return res.status(500).send({
				message: ""
			});
		} else {
			UserCredentials.create(req.body).then(user => {
				res.json(user);
			});
		}
	});
});


router.post('/getInfoObj', (req,res) => {
	ClientInformation.findOne({ ID: req.body.ID }).catch( (error) => {
		console.log(error);
	}).then(user => {
		if(user){
			res.send(user);
		} else {
			return res.status(400).send({
				message: "No user found with ID: "+req.body.ID
			});
		}
	});
});

router.post('/submitClientInfo', (req,res) => {
	console.log(req.body);

	ClientInformation.replaceOne({ ID: req.body.ID },req.body,{upsert: true}).catch( (error) => {
		console.log(error);
	}).then(() => {
		console.log("Updated/Upserted:");
		console.log(req.body);
	});
});

router.post('/calcFuelQuote', (req,res) => {
	const body = req.body;
	console.log(body);

	ClientInformation.findOne({ ID: req.body.ID }).catch( (error) => {
		console.log(error);
	}).then(user => {
		if(user){
			let fuelQuotes = [];
			FuelQuote.find({ ID: body.ID }).catch( (error) => {
				console.log(error);
			}).then(quoteList => {
				if(quoteList){
					fuelQuotes = quoteList;
				}
				let calculatedTotal = PricingModule.calculate(fuelQuotes, body.gallonsRequested, body.inState, body.pricePerGallon);
				console.log(calculatedTotal);
				res.send({total: calculatedTotal});
			});
		} else {
			return res.status(400).send({
				message: "No user found with ID: "+req.body.ID
			});
		}
	});
});

router.post('/submitFuelQuote', (req,res) => {
	console.log("Submitting fuel quote with object:");
	console.log(req.body);

	FuelQuote.create(req.body).then(user => {
		res.json(user);
	});
});

router.post('/getQuoteList', (req,res) => {
	FuelQuote.find({ ID: req.body.ID }).catch( (error) => {
        console.log(error);
    }).then(quoteList => {
        if(quoteList){
			res.send(quoteList);
        } else {
			return res.status(400).send({
				message: "No user found with ID: "+req.body.ID
			});
		}
    });
})

module.exports = router;