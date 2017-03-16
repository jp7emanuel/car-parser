import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    text : true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  telephone: String,
  fax: String,
  nextel: String,
  website: String
});

contactSchema.path('name').index({text : true});
contactSchema.path('email').index(true);

export default mongoose.model('contact', contactSchema);
