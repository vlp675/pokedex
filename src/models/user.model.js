const mongoose = require('mongoose');

let validateEmail = function (email) {
    //expression régulière
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
    }, 
    password: String
});

userSchema.pre('save', function (next) {
    //ON SAIT JAMAIS JE GARDE
    next();
});

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel