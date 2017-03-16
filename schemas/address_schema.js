import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: String,
  number: Number,
  complement: String,
  district: String,
  city: String,
  state: String,
  zipcode: String
});

export default addressSchema;
