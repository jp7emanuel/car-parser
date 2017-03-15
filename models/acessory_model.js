import mongoose from 'mongoose';

const acessorySchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('acessory', acessorySchema);
