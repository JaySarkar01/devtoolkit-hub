import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: 200,
    },
    code: {
        type: String,
        required: [true, "Code is required"],
    },
    language: {
        type: String,
        default: "javascript",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Snippet || mongoose.model("Snippet", SnippetSchema);
