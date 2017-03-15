import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('color', colorSchema);
