import React from 'react';
import './App.scss';
import { Projects } from '../pages/Projects/Projects';
import { Members } from '../pages/Members/Members';
import { ProjectDetails } from '../pages/Projects/ProjectDetails';
import Navbar from '../components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignInOutContainer from '../pages/Login/LoginContainer/LoginContainer';
import Home from '../pages/Home/Homepage';
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

export class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path='/' element={<SignInOutContainer />} />
            <Route path='/home' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            {/* 
            <Route path='/projects/:slug/:id' 
             render={(props) => {
               console.log("kksksksks")
              return ( <ProjectDetails {...props } /> )
          }} /> */}
            <Route
              path='/projects/:slug/:id'
              element={<ProjectDetails {...this.props} />}
            />
            <Route path='members' element={<Members />} />
          </Routes>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
