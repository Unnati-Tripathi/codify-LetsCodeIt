const mongoose = require("mongoose"); 
mongoose.set('debug', true); // This will log every database query to your terminal

// mongoose.connect('mongodb://127.0.0.1:27017/codeIDE')
//maine database ka naam rkka h codeIDE

// let userSchema = new mongoose.userSchema({
    let userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    date:{
        type: Date,
        default: Date.now
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User' , userSchema); //User is name of collection





