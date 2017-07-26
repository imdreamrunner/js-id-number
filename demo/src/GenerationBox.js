import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CopyToClipboard from "react-copy-to-clipboard";
import ReactTooltip from 'react-tooltip'
import MdRefresh from 'react-icons/lib/md/refresh';
import MdContentCut from 'react-icons/lib/md/content-cut';
import MdContentPaste from 'react-icons/lib/md/content-paste';

import JsonTable from './JsonTable';

import IDNumber from '../../';


export default class GenerationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      idType: null,
      resultList: []
    };

    this.generateNewIdNumbers = this.generateNewIdNumbers.bind(this);
  }

  generateNewIdNumbers() {
    if (!(this.state.country && this.state.idType)) {
      this.setState({resultList: []});
      return;
    }
    const generator = IDNumber.getGenerator(this.state.country.value, this.state.idType.value);
    let resultList = [];
    for (let i = 0; i < 10; i++) {
      resultList.push(generator());
    }
    resultList = resultList.filter((v) => !!v);
    this.setState({resultList})
  }

  displayDocumentType() {
    if (this.state.country && this.state.idType) {
      return this.state.country.label + ' ' + this.state.idType.label;
    }
    return 'ID Number';
  }


  setCountryAndIdType(country, idType) {
    this.setState({country, idType});
    this.generateNewIdNumbers();
  }


  render() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 0);
    return (
      <div className="id-number-generation-area">
        <h2>{this.displayDocumentType()} Generation</h2>
        {
          (() => {
            if (!this.state.idType) {
              return (
                <p>Please select document type.</p>
              )
            } else if (!this.state.resultList.length) {
              return (
                <p>Sorry, currently there is no generator available.</p>
              )
            } else {
              return (
                <div>
                  <ul className="id-number-list">
                    {
                      this.state.resultList.map((idNumber) => {
                        return (
                          <li  key={idNumber.value}>
                            <span data-tip={ReactDOMServer.renderToStaticMarkup(JsonTable(idNumber.extra))}>{idNumber.value}</span>

                            <CopyToClipboard text={idNumber.value}
                                             onCopy={() => alert('Copied to clipboard!')}>
                              <MdContentCut data-tip="Copy ID Number" size={16} />
                            </CopyToClipboard>
                            <CopyToClipboard text={JSON.stringify(idNumber.extra)}
                                             onCopy={() => alert('Copied to clipboard!')}>
                              <MdContentPaste data-tip="Copy Details" size={16} />
                            </CopyToClipboard>
                          </li>
                        )
                      })
                    }
                  </ul>
                  <div className="refresh-icon" onClick={this.generateNewIdNumbers}>
                    <MdRefresh size={30} />
                  </div>
                </div>
              )
            }
          })()
        }
        <ReactTooltip html={true} />
      </div>
    )
  }
}
