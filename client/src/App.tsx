import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';


// Simpler theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#4285f4',
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
