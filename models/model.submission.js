import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    username: { type: String, required: true },
    language: { type: String, required: true },
    stdin: { type: String, required: true },
    code: { type: String, required: true },
    output: { type: String},
    timestamp: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
