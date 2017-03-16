import mongoose from 'mongoose';

const fuelSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('fuel', fuelSchema);
