import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('package', packageSchema);
