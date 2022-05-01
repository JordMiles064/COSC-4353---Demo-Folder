const mongoose = require('./mongoose');

const clientInfoSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        minLength: 1
    },
    fullName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    address1: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    address2: {
        type: String,
        minLength: 1,
        maxLength: 100
    },
    city: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    state: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 2
    },
    zipcode: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 9
    },
});

module.exports = mongoose.model("ClientInformation",clientInfoSchema);