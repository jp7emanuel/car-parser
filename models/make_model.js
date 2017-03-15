import mongoose from 'mongoose';

const makeSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('make', makeSchema);
