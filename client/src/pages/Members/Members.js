import React from 'react';
import ComboBox from './ComboBox';
import axios from 'axios';

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:7000/members')
      .then(response => {
        this.setState({
          members: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    const { members } = this.state
    console.log(members);
    return (
      <div>
        <ComboBox members={members} />
      </div>);
  }
}