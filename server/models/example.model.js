import mongoose from 'mongoose';

// Example model - replace with your own models
const exampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Example = mongoose.model('Example', exampleSchema);

