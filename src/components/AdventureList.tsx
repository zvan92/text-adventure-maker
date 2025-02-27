import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import { Adventure } from '../types/adventure';
import { api } from '../services/api';

interface AdventureListProps {
  onSelectAdventure: (adventure: Adventure) => void;
  onPlayAdventure: (adventure: Adventure) => void;
}

export default function AdventureList({ onSelectAdventure, onPlayAdventure }: AdventureListProps) {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newAdventureTitle, setNewAdventureTitle] = useState('');
  const [newAdventureDescription, setNewAdventureDescription] = useState('');

  useEffect(() => {
    loadAdventures();
  }, []);

  const loadAdventures = async () => {
    try {
      const loadedAdventures = await api.getAllAdventures();
      setAdventures(loadedAdventures);
    } catch (error) {
      console.error('Failed to load adventures:', error);
    }
  };

  const handleCreateAdventure = async () => {
    if (!newAdventureTitle.trim()) return;

    try {
      const newAdventure: Adventure = {
        title: newAdventureTitle,
        description: newAdventureDescription,
        nodes: [],
      };

      const createdAdventure = await api.createAdventure(newAdventure);
      setAdventures([...adventures, createdAdventure]);
      setIsNewDialogOpen(false);
      setNewAdventureTitle('');
      setNewAdventureDescription('');
      onSelectAdventure(createdAdventure);
    } catch (error) {
      console.error('Failed to create adventure:', error);
    }
  };

  const handleDeleteAdventure = async (adventureId: string) => {
    try {
      await api.deleteAdventure(adventureId);
      setAdventures(adventures.filter(adv => adv._id !== adventureId));
    } catch (error) {
      console.error('Failed to delete adventure:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Text Adventures</Typography>
        <Button variant="contained" onClick={() => setIsNewDialogOpen(true)}>
          Create New Adventure
        </Button>
      </Box>

      <Stack spacing={2}>
        {adventures.map((adventure) => (
          <Card key={adventure._id} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Typography variant="h6">{adventure.title}</Typography>
                  {adventure.description && (
                    <Typography variant="body2" color="text.secondary">
                      {adventure.description}
                    </Typography>
                  )}
                </div>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => adventure._id && handleDeleteAdventure(adventure._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => onSelectAdventure(adventure)}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                startIcon={<PlayArrowIcon />}
                onClick={() => onPlayAdventure(adventure)}
              >
                Play
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      <Dialog open={isNewDialogOpen} onClose={() => setIsNewDialogOpen(false)}>
        <DialogTitle>Create New Adventure</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Adventure Title"
            fullWidth
            value={newAdventureTitle}
            onChange={(e) => setNewAdventureTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description (optional)"
            fullWidth
            multiline
            rows={3}
            value={newAdventureDescription}
            onChange={(e) => setNewAdventureDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateAdventure} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 