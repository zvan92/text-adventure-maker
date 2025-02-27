import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Adventure } from './models/adventure.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get all adventures
app.get('/api/adventures', async (req, res) => {
  try {
    const adventures = await Adventure.find();
    res.json(adventures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single adventure
app.get('/api/adventures/:id', async (req, res) => {
  try {
    const adventure = await Adventure.findById(req.params.id);
    if (!adventure) {
      return res.status(404).json({ error: 'Adventure not found' });
    }
    res.json(adventure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new adventure
app.post('/api/adventures', async (req, res) => {
  try {
    const adventure = new Adventure(req.body);
    await adventure.save();
    res.status(201).json(adventure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an adventure
app.put('/api/adventures/:id', async (req, res) => {
  try {
    const adventure = await Adventure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!adventure) {
      return res.status(404).json({ error: 'Adventure not found' });
    }
    res.json(adventure);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an adventure
app.delete('/api/adventures/:id', async (req, res) => {
  try {
    const adventure = await Adventure.findByIdAndDelete(req.params.id);
    if (!adventure) {
      return res.status(404).json({ error: 'Adventure not found' });
    }
    res.json({ message: 'Adventure deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
}); 