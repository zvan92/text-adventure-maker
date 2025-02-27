import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Fade,
} from '@mui/material';
import { Adventure, StoryNode } from '../types/adventure';

interface AdventurePlayerProps {
  adventure: Adventure;
  onBack: () => void;
}

export default function AdventurePlayer({ adventure, onBack }: AdventurePlayerProps) {
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [history, setHistory] = useState<StoryNode[]>([]);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const startNode = adventure.nodes.find((node) => node.isStart);
    if (startNode) {
      setCurrentNode(startNode);
      setHistory([startNode]);
    }
  }, [adventure]);

  const handleChoice = (targetNodeId: string) => {
    setFadeIn(false);
    setTimeout(() => {
      const nextNode = adventure.nodes.find((node) => node.id === targetNodeId);
      if (nextNode) {
        setCurrentNode(nextNode);
        setHistory((prev) => [...prev, nextNode]);
        setFadeIn(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setFadeIn(false);
      setTimeout(() => {
        const newHistory = history.slice(0, -1);
        setHistory(newHistory);
        setCurrentNode(newHistory[newHistory.length - 1]);
        setFadeIn(true);
      }, 300);
    }
  };

  if (!currentNode) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Error: No starting node found</Typography>
        <Button onClick={onBack}>Back to Adventures</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3, mb: 2, backgroundColor: 'background.paper' }}>
        <Fade in={fadeIn} timeout={300}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {currentNode.title}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 4 }}>
              {currentNode.content}
            </Typography>

            {!currentNode.isEnding && currentNode.choices && currentNode.choices.length > 0 && (
              <Stack spacing={2} sx={{ mt: 4 }}>
                {currentNode.choices.map((choice, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    fullWidth
                    onClick={() => handleChoice(choice.targetNodeId)}
                    sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                  >
                    {choice.text}
                  </Button>
                ))}
              </Stack>
            )}

            {currentNode.isEnding && (
              <Typography variant="h6" color="primary" gutterBottom>
                The End
              </Typography>
            )}

            {!currentNode.isEnding && (!currentNode.choices || currentNode.choices.length === 0) && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                This node has no choices. Add some choices in the editor.
              </Typography>
            )}
          </Box>
        </Fade>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={history.length <= 1}
        >
          Go Back
        </Button>
        <Button variant="outlined" onClick={onBack}>
          Exit Adventure
        </Button>
      </Box>
    </Box>
  );
} 