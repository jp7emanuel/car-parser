import mongoose from '../utils/database/mongoose';

const transmissionSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true,
    text: true
  }
});

export default mongoose.model('transmission', transmissionSchema);
