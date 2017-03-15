import mongoose from 'mongoose';

const transmissionSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('transmission', transmissionSchema);
