import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    activityLogs: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        action: String, // e.g., "created", "moved", "commented"
        timestamp: { type: Date, default: Date.now },
      },
    ],
    order: {
      type: Number,
      default: 0, // for drag & drop ordering inside list
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
