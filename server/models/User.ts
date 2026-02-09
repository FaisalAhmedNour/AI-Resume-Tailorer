import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    firebaseId: string;
    credits: number;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: Number,
        default: 3
    }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
