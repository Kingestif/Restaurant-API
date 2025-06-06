const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'User must have an email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },

    role: {
        type: String,
        enum: ['customer', 'admin', 'manager'],
        default: 'user'
    },

},
    { timestamps: true }
);

UserSchema.pre('save', async function(next){        
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;   
});

UserSchema.methods.checkPassword = function(givenPassword, storedPassword){
    return bcrypt.compare(givenPassword, storedPassword);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;