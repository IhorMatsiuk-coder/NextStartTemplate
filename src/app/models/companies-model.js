'use server';

import mongoose from 'mongoose';

delete mongoose.connection.models['Companies'];

const Schema = mongoose.Schema;

const CompaniesSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model('Companies', CompaniesSchema);
