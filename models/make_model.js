import mongoose from 'mongoose';

const makeSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('make', makeSchema);
