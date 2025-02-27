import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Grid,
  Switch,
  FormControlLabel,
  Collapse,
  MenuItem,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Adventure, StoryNode, Choice } from '../types/adventure';

interface AdventureEditorProps {
  adventure: Adventure;
  onSave: (adventure: Adventure) => void;
  onBack: () => void;
}

export default function AdventureEditor({ adventure, onSave, onBack }: AdventureEditorProps) {
  const [currentAdventure, setCurrentAdventure] = useState<Adventure>(adventure);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    adventure.nodes.find((node) => node.isStart)?.id || null
  );
  const [newChoice, setNewChoice] = useState<{ text: string; targetNodeId: string }>({
    text: '',
    targetNodeId: '',
  });
  const [isAddingChoice, setIsAddingChoice] = useState(false);

  const handleAddNode = () => {
    const newNode: StoryNode = {
      id: crypto.randomUUID(),
      title: 'New Node',
      content: '',
      choices: [],
      isStart: currentAdventure.nodes.length === 0,
    };
    setCurrentAdventure({
      ...currentAdventure,
      nodes: [...currentAdventure.nodes, newNode],
    });
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateNode = (nodeId: string, updates: Partial<StoryNode>) => {
    setCurrentAdventure({
      ...currentAdventure,
      nodes: currentAdventure.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      ),
    });
  };

  const handleAddChoice = (nodeId: string) => {
    if (!newChoice.text || !newChoice.targetNodeId) return;
    
    handleUpdateNode(nodeId, {
      choices: [...(currentAdventure.nodes.find((n) => n.id === nodeId)?.choices || []), newChoice],
    });
    setNewChoice({ text: '', targetNodeId: '' });
    setIsAddingChoice(false);
  };

  const handleUpdateChoice = (nodeId: string, index: number, updates: Partial<Choice>) => {
    const node = currentAdventure.nodes.find((n) => n.id === nodeId);
    if (node) {
      const newChoices = [...node.choices];
      newChoices[index] = { ...newChoices[index], ...updates };
      handleUpdateNode(nodeId, { choices: newChoices });
    }
  };

  const handleDeleteChoice = (nodeId: string, index: number) => {
    const node = currentAdventure.nodes.find((n) => n.id === nodeId);
    if (node) {
      const newChoices = node.choices.filter((_, i) => i !== index);
      handleUpdateNode(nodeId, { choices: newChoices });
    }
  };

  const selectedNode = currentAdventure.nodes.find((node) => node.id === selectedNodeId);

  return (
    <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
      <Paper sx={{ width: 300, minWidth: 300, p: 2, overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Story Nodes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => handleAddNode()}
          sx={{ mb: 2 }}
        >
          Add Node
        </Button>
        {currentAdventure.nodes.length === 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Start by creating your first node. This will automatically be set as the starting point of your adventure.
          </Alert>
        )}
        <List>
          {currentAdventure.nodes.map((node) => (
            <ListItem
              key={node.id}
              sx={{ cursor: 'pointer' }}
              onClick={() => setSelectedNodeId(node.id)}
            >
              <Typography
                noWrap
                sx={{ color: node.id === selectedNodeId ? 'primary.main' : 'inherit' }}
              >
                {node.title} {node.isStart ? '(Start)' : ''} {node.isEnding ? '(End)' : ''}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        {selectedNode ? (
          <Grid container spacing={2}>
            {currentAdventure.nodes.length === 1 && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  To add choices to this node, first create additional nodes that your choices can lead to.
                  Use the "Add Node" button on the left to create more nodes.
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Node Title"
                value={selectedNode.title}
                onChange={(e) => handleUpdateNode(selectedNode.id, { title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Node Content"
                value={selectedNode.content}
                onChange={(e) => handleUpdateNode(selectedNode.id, { content: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedNode.isStart || false}
                    onChange={(e) => handleUpdateNode(selectedNode.id, { isStart: e.target.checked })}
                  />
                }
                label="Starting Node"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedNode.isEnding || false}
                    onChange={(e) => handleUpdateNode(selectedNode.id, { isEnding: e.target.checked })}
                  />
                }
                label="Ending Node"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Choices
              </Typography>
              {selectedNode.choices.map((choice, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                  <TextField
                    label="Choice Text"
                    value={choice.text}
                    onChange={(e) =>
                      handleUpdateChoice(selectedNode.id, index, { text: e.target.value })
                    }
                    sx={{ flexGrow: 1 }}
                    size="small"
                  />
                  <TextField
                    select
                    label="Target Node"
                    value={choice.targetNodeId}
                    onChange={(e) =>
                      handleUpdateChoice(selectedNode.id, index, { targetNodeId: e.target.value })
                    }
                    sx={{ minWidth: 200 }}
                    size="small"
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            backgroundColor: 'background.paper',
                            maxHeight: 300
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Select target node</em>
                    </MenuItem>
                    {currentAdventure.nodes
                      .filter((n) => n.id !== selectedNode.id)
                      .map((node) => (
                        <MenuItem key={node.id} value={node.id}>
                          {node.title}
                        </MenuItem>
                      ))}
                    {currentAdventure.nodes.length <= 1 && (
                      <MenuItem disabled>
                        <em>Create more nodes to add choices</em>
                      </MenuItem>
                    )}
                  </TextField>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteChoice(selectedNode.id, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              
              <Collapse in={isAddingChoice}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                  <TextField
                    label="New Choice Text"
                    value={newChoice.text}
                    onChange={(e) => setNewChoice({ ...newChoice, text: e.target.value })}
                    sx={{ flexGrow: 1 }}
                    size="small"
                  />
                  <TextField
                    select
                    label="Target Node"
                    value={newChoice.targetNodeId}
                    onChange={(e) => setNewChoice({ ...newChoice, targetNodeId: e.target.value })}
                    sx={{ minWidth: 200 }}
                    size="small"
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            backgroundColor: 'background.paper',
                            maxHeight: 300
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Select target node</em>
                    </MenuItem>
                    {currentAdventure.nodes
                      .filter((n) => n.id !== selectedNode.id)
                      .map((node) => (
                        <MenuItem key={node.id} value={node.id}>
                          {node.title}
                        </MenuItem>
                      ))}
                    {currentAdventure.nodes.length <= 1 && (
                      <MenuItem disabled>
                        <em>Create more nodes to add choices</em>
                      </MenuItem>
                    )}
                  </TextField>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddChoice(selectedNode.id)}
                    disabled={!newChoice.text || !newChoice.targetNodeId}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setIsAddingChoice(false);
                      setNewChoice({ text: '', targetNodeId: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Collapse>

              {!isAddingChoice && (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddingChoice(true)}
                  size="small"
                >
                  Add Choice
                </Button>
              )}
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Select a node to edit or create a new one</Typography>
        )}
      </Box>

      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={() => onSave(currentAdventure)}>
          Save
        </Button>
      </Box>
    </Box>
  );
} 