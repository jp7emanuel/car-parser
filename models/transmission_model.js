import mongoose from '../utils/database/mongoose';

const transmissionSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

transmissionSchema.index({ name: 'text' });

export default mongoose.model('transmission', transmissionSchema);
