import mongoose from 'mongoose';

const choiceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  targetNodeId: { type: String, required: true }
});

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  choices: [choiceSchema],
  isStart: { type: Boolean, default: false },
  isEnding: { type: Boolean, default: false }
});

const adventureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  nodes: [nodeSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

adventureSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Adventure = mongoose.model('Adventure', adventureSchema); 