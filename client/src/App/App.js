import './App.scss';
import { Projects } from '../pages/Projects/Projects';
import { Navbar } from '../components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignInOutContainer from "../pages/Login/LoginContainer";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<SignInOutContainer />} />
        <Route path='projects' element={<Projects />} />
      </Routes>
    </div>
  );
}

export default App;
