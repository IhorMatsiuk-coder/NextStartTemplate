'use server';

import mongoose from 'mongoose';

delete mongoose.connection.models['User'];

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  userRole: { type: Number, default: 1 },
  activationLink: { type: String },
});

export default mongoose.model('User', UserSchema);
