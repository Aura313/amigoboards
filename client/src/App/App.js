import './App.scss';
import { Projects } from '../pages/Projects/Projects';
import { Members } from '../pages/Members/Members';
import { Navbar } from '../components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignInOutContainer from "../pages/Login/LoginContainer/LoginContainer";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<SignInOutContainer />} />
        <Route path='projects' element={<Projects />} />
        <Route path='members' element={<Members />} />
      </Routes>
    </div>
  );
}

export default App;
