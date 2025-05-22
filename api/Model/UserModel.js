import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
  }
);

export const UserModel = mongoose.model('UserInfo', UserSchema);
