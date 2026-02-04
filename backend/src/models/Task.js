import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
     title: {
        type: String, 
        required: true,
        trim: true,
    },
     status: {
        type: String,
        enum: ["active", "conpleted"],
        default: "active",
     },
     completedAt: {
        type: Date,
        default: null
     },
    },
    {
        timestamps: true, //Tự động thêm createdAt và updatedAt vào
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;