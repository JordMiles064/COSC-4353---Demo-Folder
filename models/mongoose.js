const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin@cluster0.nub57.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

module.exports = mongoose;