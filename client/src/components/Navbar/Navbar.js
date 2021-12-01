import React from 'react';
import { Link } from 'react-router-dom';

// Navbar Class Component
export class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className='nav-content'>
          <h3> TODOLIST </h3>

          <Link to='/projects'>Projects</Link>
        </div>
      </nav>
    );
  }
}
