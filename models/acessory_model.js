import mongoose from 'mongoose';

const acessorySchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required : true
  }
});

acessorySchema.index({ name: 'text' });

export default mongoose.model('acessory', acessorySchema);
