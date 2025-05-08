import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
    assignedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);



const User = mongoose.model('User', userSchema);

export default User;
