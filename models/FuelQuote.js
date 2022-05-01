const mongoose = require('./mongoose');

const fuelQuoteSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        immutable: true,
        minLength: 1
    },
    gallonsRequested:  {
        type: Number,
        required: true,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true,
        immutable: true
    },
    deliveryDate: {
        type: Date,
        required: true,
        immutable: true
    },
    pricePerGallon: {
        type: Number,
        required: true,
        immutable: true
    },
    amountDue: {
        type: Number,
        required: true,
        immutable: true
    }
});

module.exports = mongoose.model("FuelQuote",fuelQuoteSchema);