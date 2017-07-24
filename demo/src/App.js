import React from 'react';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactGA from 'react-ga';
import GitHubForkRibbon from 'react-github-fork-ribbon';

import './App.css';

import ValidationBox from './ValidationBox';
import GenerationBox from './GenerationBox';

ReactGA.initialize('UA-48557356-1');
ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: 'Waiting for input...',
      countrySelected: null,
      idTypeSelectable: null,
      idTypeSelected: null
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleIdTypeChange = this.handleIdTypeChange.bind(this);
  }

  handleCountryChange(country) {
    this.setState({
      countrySelected: country,
      idTypeSelectable: country.ids,
      idTypeSelected: country.ids[0]
    });
    this.idTypeSelect.focus();
    this.updateChildrenBox();
  }

  handleIdTypeChange(idType) {
    this.setState({
      idTypeSelected: idType
    });
    this.updateChildrenBox();
  }

  updateChildrenBox() {
    setTimeout(() => {
      this.validateBox.setCountryAndIdType(this.state.countrySelected, this.state.idTypeSelected);
      this.generationBox.setCountryAndIdType(this.state.countrySelected, this.state.idTypeSelected);
    }, 0);
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

  displayGitHubRibbon() {
    return (
      <GitHubForkRibbon href="https://github.com/imdreamrunner/js-id-number"
                        target="_blank"
                        position="right">
        Fork me on GitHub
      </GitHubForkRibbon>
    )
  }

  releaseCdnLink() {
    return 'https://unpkg.com/id-number/dist/browser/IDNumber.js';
  }


  render() {
    return (
      <div className="App">
        <h1>ID Number Toolkit</h1>

        {this.displayGitHubRibbon()}

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

        <ValidationBox
          ref={(me) => this.validateBox = me}
        />

        <GenerationBox
          ref={(me) => this.generationBox = me}
        />

        <div className="tutorial-area">
          <h3>Use it in your project</h3>

          <Tabs
            selectedIndex={0}
          >

            <TabList>
              <Tab>ES6 app</Tab>
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
              <p>Add script tag <span className="code-area">&lt;script src=&quot;{this.releaseCdnLink()}&quot;&gt;&lt;/script&gt;</span> into your HTML file.</p>
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
          </Tabs>

          <p>You can find a more detailed document <a href="https://github.com/imdreamrunner/js-id-number">here</a>.</p>

        </div>

        <div className="copyright">
          Powered by <a href="https://github.com/imdreamrunner/js-id-number">JavaScript ID Number Toolkit</a>.
        </div>
      </div>
    );
  }
}

export default App;
