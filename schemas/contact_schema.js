import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  telephone: String,
  fax: String,
  nextel: String,
  website: String
});

export default contactSchema;
