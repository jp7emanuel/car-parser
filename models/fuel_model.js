import mongoose from 'mongoose';

const fuelSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('fuel', fuelSchema);
