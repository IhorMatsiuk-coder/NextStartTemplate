'use server';

import mongoose from 'mongoose';

delete mongoose.connection.models['Token'];

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export default mongoose.model('Token', TokenSchema);
