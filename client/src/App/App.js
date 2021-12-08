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
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { UserStories } from '../pages/UserStories/UserStories';
import NewUserStory from '../pages/UserStories/NewUserStory';
import UserStoryDetails from '../pages/UserStories/UserStoryDetails';
import axios from 'axios';
import Config from '../Configuration/Config.json';
import Footer from '../components/Footer/Footer';
import AuthencatedRoute from '../utils/AuthenticatedRoute';

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
      userStories: [],
    };
  }

  create() {
    this.setState((state, props) => ({
      userStories: [
        ...state.userStories,
        {
          reporter: 'Add reporter',
          description: 'add description',
          title: 'add title',
          assignee: 'add assignee',
          status: 'Add status',
          labels: 'Add labels',
        },
      ],
    }));
  }

  createitem(item) {
    const newtask = {
      reporter: item.reporter,
      description: item.description,
      title: item.title,
      assignee: item.assignee,
      status: item.status,
      labels: item.labels,
      projectID: item.projectID,
      projectName: item.projectName
    };
    item.completionStatus = false;

    return axios
      .post(Config.userStories_url,
        newtask
      ).then((userStories) => this.setState({ userStories: userStories.userStories }));
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className='page-container'>
          <Routes>
            <Route exact path='/' element={<SignInOutContainer />} />
            <Route element={<AuthencatedRoute />}>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/boards' element={<Boards />} />
              <Route exact path='/projects' element={<Projects />} />
              <Route
                exact
                path='/projects/:slug/:id'
                element={<ProjectDetails {...this.props} />}
              />
              <Route path='/projects/new-project' element={<NewProject />} />
              <Route
                path='/workItems'
                element={
                  <UserStories
                    createHandler={this.create.bind(this)}
                    createitem={this.createitem.bind(this)}
                  />
                }
              />
              <Route path='/workItems/:id' element={<UserStoryDetails />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;
