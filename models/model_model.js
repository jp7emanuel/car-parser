import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('model', modelSchema);
