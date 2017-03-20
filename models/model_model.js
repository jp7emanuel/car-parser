import mongoose from '../utils/database/mongoose';

const modelSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true,
    text: true
  }
});

export default mongoose.model('model', modelSchema);
