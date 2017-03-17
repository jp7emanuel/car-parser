import mongoose from '../utils/database/mongoose';

const colorSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

colorSchema.index({ name: 'text' });

export default mongoose.model('color', colorSchema);
