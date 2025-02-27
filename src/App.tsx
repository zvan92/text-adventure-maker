import { useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material'
import { Adventure } from './types/adventure'
import AdventureList from './components/AdventureList'
import AdventureEditor from './components/AdventureEditor'
import AdventurePlayer from './components/AdventurePlayer'
import { api } from './services/api'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const STORAGE_KEY = 'text-adventures'

function App() {
  const [view, setView] = useState<'list' | 'editor' | 'player'>('list')
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null)

  const handleSelectAdventure = (adventure: Adventure) => {
    setSelectedAdventure(adventure)
    setView('editor')
  }

  const handlePlayAdventure = (adventure: Adventure) => {
    setSelectedAdventure(adventure)
    setView('player')
  }

  const handleSaveAdventure = async (adventure: Adventure) => {
    try {
      if (adventure._id) {
        await api.updateAdventure(adventure._id, adventure)
      }
      setView('list')
    } catch (error) {
      console.error('Failed to save adventure:', error)
    }
  }

  const handleBack = () => {
    setView('list')
    setSelectedAdventure(null)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Text Adventure Maker
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {view === 'list' && (
            <AdventureList 
              onSelectAdventure={handleSelectAdventure}
              onPlayAdventure={handlePlayAdventure}
            />
          )}
          {view === 'editor' && selectedAdventure && (
            <AdventureEditor
              adventure={selectedAdventure}
              onSave={handleSaveAdventure}
              onBack={handleBack}
            />
          )}
          {view === 'player' && selectedAdventure && (
            <AdventurePlayer
              adventure={selectedAdventure}
              onBack={handleBack}
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
