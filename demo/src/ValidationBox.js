import React from 'react';
import JsonTable from './JsonTable';

import IDNumber from '../../';


export default class ValidationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: 'Please select document type...',
      country: null,
      idType: null,
      inputClassName: ''
    };

    this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
  }


  handleIdNumberChange(event) {
    let newValue = event.target.value;
    this.setState({
      value: newValue
    });
    this.updateValidateResult();
  }


  updateValidateResult() {
    setTimeout(() => {
      if (!this.state.idType) {
        this.setState({
          inputClassName: '',
          result: 'Please select document type...'
        });
        return;
      }
      if (!this.state.value) {
        this.setState({
          inputClassName: '',
          result: `Please enter ${this.displayDocumentType()}...`
        });
        return;
      }
      let validator = IDNumber.getValidator(this.state.country.value, this.state.idType.value);
      let result = validator(this.state.value);
      this.setState({
        inputClassName: result.success ? 'success' : 'error',
        result: result.success ? 'Valid' : 'Invalid',
        extra: result.extra || {'Reason': result.reason}
      });
    }, 0);
  }


  displayDocumentType() {
    if (this.state.country && this.state.idType) {
      return this.state.country.label + ' ' + this.state.idType.label;
    }
    return 'ID Number';
  }


  setCountryAndIdType(country, idType) {
    this.setState({country, idType});
    this.updateValidateResult();
  }


  render() {
    return (
      <div className="id-number-validation-area">
        <h2>{this.displayDocumentType()} Validation</h2>
        <input
          className={`id-number-input ${this.state.inputClassName}`}
          onChange={this.handleIdNumberChange}
          placeholder={"Type here..."}
        />
        <div className="validation-result">
          Result: {this.state.result}
          {this.state.extra && JsonTable(this.state.extra)}
        </div>
      </div>
    )
  }
}
