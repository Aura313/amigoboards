import React from 'react';
import './App.scss';
import { Projects } from '../pages/Projects/Projects';
import Boards from '../pages/Boards/Boards';
import { ProjectDetails } from '../pages/Projects/ProjectDetails';
import { NewProject } from '../pages/Projects/NewProject';
import Navbar from '../components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignInOutContainer from '../pages/Login/LoginContainer/LoginContainer';
import Home from '../pages/Home/Homepage';
import {UserAnalytics} from '../pages/Analytics/UserAnalytics.js';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { UserStories } from '../pages/UserStories/UserStories';
import axios from 'axios';

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
    this.state = {
      userStories: []
    };
  }

  create() {
    this.setState((state, props) => ({
      userStories: [
        ...state.userStories,
        {
          "reporter": "Add reporter", "description": "add description", "title": "add title", "assignee": "add assignee",
          "status": "Add status", "labels": "Add labels"
        }
      ]
    }));
  }

  createitem(item) {
    const newtask = {
      "reporter": item.reporter, "description": item.description, "title": item.title, "assignee": item.assignee,
      "status": item.status, "labels": item.labels
    };
    item.completionStatus = false;

    axios.post(`http://localhost:4000/userStories/`, newtask)
      .then(response => {
        this.setState({ userStories: response.userStories })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className='App'>
          <Routes>
            <Route path='/' element={<SignInOutContainer />} />
            <Route path='/home' element={<Home />} />
            <Route path='/userstats' element={<UserAnalytics />} />
            <Route path='/boards' element={<Boards />} />
            <Route path='/projects' element={<Projects />} />
            <Route
              path='/projects/:slug/:id'
              element={<ProjectDetails {...this.props} />}
            />
            <Route path='/projects/new-project' element={<NewProject />} />
            <Route path='/userStories' element={
              <UserStories
                createHandler={this.create.bind(this)}
                createitem={this.createitem.bind(this)} />} />
                
          </Routes>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
