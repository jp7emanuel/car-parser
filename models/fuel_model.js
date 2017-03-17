import mongoose from '../utils/database/mongoose';

const fuelSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

fuelSchema.index({ name: 'text' });

export default mongoose.model('fuel', fuelSchema);
