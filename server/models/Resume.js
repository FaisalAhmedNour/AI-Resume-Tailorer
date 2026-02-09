const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Resume', ResumeSchema);
