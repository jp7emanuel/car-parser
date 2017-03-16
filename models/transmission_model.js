import mongoose from 'mongoose';

const transmissionSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('transmission', transmissionSchema);
