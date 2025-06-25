import { Schema, Types, model } from 'mongoose';
import { isEmail } from 'validator';
import { hash, compare } from 'bcrypt';

export interface IUser extends Document {
    _id: Types.ObjectId;     // to let ts know the id's mongo adds
    email: string;
    password: string;
    role: string;
    checkPassword(storedPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: [true, 'User must have an email'],
        lowercase: true,
        validate: [isEmail, 'Please provide valid email']
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    role: {
        type: String,
        enum: ['customer', 'admin', 'manager'],
        default: 'user'
    },

},
    { timestamps: true }
);

UserSchema.methods.checkPassword = function(givenPassword:string){
    console.log(this.password, givenPassword);
    return compare(givenPassword, this.password);
}

const User = model('User', UserSchema);

export default User;