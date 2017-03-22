import React, { Component } from 'react';
import './App.css';
import IDNumber from '../../';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: 'Waiting for input...'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newValue = event.target.value;

    let validator = IDNumber.getValidator('SG', 'NRIC');
    let result = validator(newValue);
    this.setState({
      value: newValue,
      result: JSON.stringify(result)
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ID Number Toolkit</h1>
        <h2>Validate ID Number</h2>
        <h3>Singapore NRIC Validator</h3>

        <input onChange={this.handleChange}></input>
        <div>Result: {this.state.result}</div>
      </div>
    );
  }
}

export default App;
