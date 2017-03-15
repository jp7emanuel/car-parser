import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('model', modelSchema);
