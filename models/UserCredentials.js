const mongoose = require('./mongoose');
const bcrypt = require("bcryptjs"); 

const userSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        immutable: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 1
    }
});

userSchema.pre("save", function(next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hashSync(
        this.password,
        bcrypt.genSaltSync()
    );
    next();
});

userSchema.methods.comparePassword = function(plaintext) {
    return bcrypt.compare(plaintext, this.password);
}

module.exports = mongoose.model("UserCredentials",userSchema);
