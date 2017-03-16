import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('color', colorSchema);
