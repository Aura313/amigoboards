import './App.scss';
import { Projects } from '../pages/Projects/Projects';
import Navbar from '../components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignInOutContainer from '../pages/Login/LoginContainer/LoginContainer';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

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
export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path='/' element={<SignInOutContainer />} />
            <Route path='projects' element={<Projects />} />
          </Routes>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
