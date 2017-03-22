import React, { Component } from 'react';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import IDNumber from '../../';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: 'Waiting for input...',
      countrySelected: null,
      idTypeSelectable: null,
      idTypeSelected: null
    };

    this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleIdTypeChange = this.handleIdTypeChange.bind(this);
  }

  handleIdNumberChange(event) {
    let newValue = event.target.value;

    if (!newValue) {
      this.setState({
        value: newValue,
        result: 'Waiting for input...'
      });
      return;
    }

    if (!this.state.countrySelected) {
      this.setState({
        value: newValue,
        result: "Please select the document type."
      });
      return;
    }

    this.setState({
      value: newValue
    });
    this.updateValidateResult();
  }

  updateValidateResult() {
    setTimeout(() => {
      let validator = IDNumber.getValidator(this.state.countrySelected.value, this.state.idTypeSelected.value);
      let result = validator(this.state.value);
      this.setState({
        result: JSON.stringify(result)
      });
    }, 0);
  }

  handleCountryChange(country) {
    this.setState({
      countrySelected: country,
      idTypeSelectable: country.ids,
      idTypeSelected: country.ids[0]
    });
    this.idTypeSelect.focus();
    this.updateValidateResult();
  }

  handleIdTypeChange(idType) {
    this.setState({
      idTypeSelected: idType
    });
    this.updateValidateResult();
  }

  countryOptions = [
    {
      label: 'Singapore',
      value: 'SG',
      ids: [
        {
          label: 'NRIC',
          value: 'NRIC'
        }
      ]
    },
    {
      label: 'China 中国',
      value: 'CN',
      ids: [
        {
          label: 'ID 居民身份证号码',
          value: 'ID'
        }
      ]
    },
    {
      label: 'Taiwan 台灣',
      value: 'TW',
      ids: [
        {
          label: 'ID 中華民國國民身份證字號',
          value: 'ID'
        }
      ]
    }
  ];

  displayDocumentType() {
    if (this.state.countrySelected) {
      return this.state.countrySelected.label + ' ' + this.state.idTypeSelected.label;
    }
    return 'ID Number';
  }

  render() {
    return (
      <div className="App">
        <h1>ID Number Toolkit</h1>

        <div className="DocumentSelector">
          <Select
            name="country"
            value={this.state.countrySelected && this.state.countrySelected.value}
            options={this.countryOptions}
            onChange={this.handleCountryChange}
          />

          <Select
            name="id-type"
            value={this.state.idTypeSelected && this.state.idTypeSelected.value}
            options={this.state.idTypeSelectable}
            onChange={this.handleIdTypeChange}
            ref={(select) => this.idTypeSelect = select}
          />
        </div>

        <div className="id-number-validation-area">
          <h2>{this.displayDocumentType()} Validation</h2>
          <input
            className="id-number-input"
            onChange={this.handleIdNumberChange}
            placeholder={"Please enter " + this.displayDocumentType()}
          />
          <div>Result: {this.state.result}</div>
        </div>

        <div className="tutorial-area">
          <h3>Use it in your project</h3>

          <Tabs
            selectedIndex={0}
          >

            <TabList>
              <Tab>ES6 ppp</Tab>
              <Tab>Non-ES6 app with webpack</Tab>
              <Tab>Traditional web</Tab>
            </TabList>

            <TabPanel>
              <h4>Step 1: Install <span className="code-area">id-number</span></h4>
              <p>Download via npm <span className="code-area">npm install --save id-number</span>.</p>
              <p>Import it by <span className="code-area">import IDNumber from "id-number"</span>.</p>
              <h4>Step 2: Get a validator</h4>
              <p>
                <span className="code-area">
                  const validator = IDNumber.getValidator("{this.state.countrySelected && this.state.countrySelected.value}",
                  "{this.state.idTypeSelected && this.state.idTypeSelected.value}");
                </span>
              </p>
              <h4>Step 3: Use the validator</h4>
              <p>
                <span className="code-area">
                  const result = validator("ID Number");
                </span>
              </p>
            </TabPanel>
            <TabPanel>
              <h4>Step 1: Install <span className="code-area">id-number</span></h4>
              <p>Download via npm <span className="code-area">npm install --save id-number</span>.</p>
              <p>Import it by <span className="code-area">const IDNumber = require("id-number")</span>.</p>
              <h4>Step 2: Get a validator</h4>
              <p>
                <span className="code-area">
                  const validator = IDNumber.getValidator("{this.state.countrySelected && this.state.countrySelected.value}",
                  "{this.state.idTypeSelected && this.state.idTypeSelected.value}");
                </span>
              </p>
              <h4>Step 3: Use the validator</h4>
              <p>
                <span className="code-area">
                  const result = validator("ID Number");
                </span>
              </p>
            </TabPanel>
            <TabPanel>
              <h4>Step 1: Install <span className="code-area">id-number</span></h4>
              <p>Add script tag <span className="code-area">&lt;script src=&quot;IDNumber.js&quot;&gt;&lt;/script&gt;</span> into your HTML file.</p>
              <h4>Step 2: Get a validator</h4>
              <p>
                <span className="code-area">
                  var validator = IDNumber.getValidator("{this.state.countrySelected && this.state.countrySelected.value}",
                  "{this.state.idTypeSelected && this.state.idTypeSelected.value}");
                </span>
              </p>
              <h4>Step 3: Use the validator</h4>
              <p>
                <span className="code-area">
                  var result = validator("ID Number");
                </span>
              </p>
            </TabPanel>

            <p>You can find a more detailed document <a href="https://github.com/imdreamrunner/js-id-number">here</a>.</p>

          </Tabs>
        </div>

        <div className="copyright">
          Powered by <a href="https://github.com/imdreamrunner/js-id-number">JavaScript ID Number Toolkit</a>.
        </div>
      </div>
    );
  }
}

export default App;
