import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  isEligible: { type: Boolean, default: false },
});

export default mongoose.model('Country', countrySchema);
