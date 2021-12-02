import './App.scss';
import { Projects } from '../pages/Projects/Projects';
import Navbar from '../components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignInOutContainer from '../pages/Login/LoginContainer/LoginContainer';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#1f487e',
    },
    secondary: {
      main: '#89B0AE',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<SignInOutContainer />} />
          <Route path='projects' element={<Projects />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
