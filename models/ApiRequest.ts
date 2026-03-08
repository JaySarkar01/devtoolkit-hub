import mongoose from "mongoose";

const ApiRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: 200,
    },
    method: {
        type: String,
        enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        default: "GET",
    },
    url: {
        type: String,
        required: [true, "URL is required"],
    },
    headers: {
        type: String,
        default: "{}",
    },
    body: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.ApiRequest || mongoose.model("ApiRequest", ApiRequestSchema);
