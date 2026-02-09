import mongoose, { Document, Schema } from 'mongoose';

export interface IResume extends Document {
    originalText: string;
    jobDescription: string;
    tailoredResume?: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const ResumeSchema: Schema = new Schema({
    originalText: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    tailoredResume: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default mongoose.model<IResume>('Resume', ResumeSchema);
