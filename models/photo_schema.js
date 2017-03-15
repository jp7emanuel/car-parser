import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  url: String
});

export default photoSchema;
