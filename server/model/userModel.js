import mongoose from 'mongoose';

const { Schema } = mongoose;

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    primaryContact: { type: String, },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },

    // for user
    uid: { type: String, },
    
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
