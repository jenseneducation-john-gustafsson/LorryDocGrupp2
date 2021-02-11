import './App.css';
import Axios from "axios";
import React from "react";
//jag var tvungen att kommentera något för att uppdatera
function App() {

  const userInput = [{ brand: "", issue: "", diagnostics: "", remedy: "" }];

  class Brands extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        brands: [],
      }
    }

    componentDidMount() {
      Axios.get("http://localhost:3001/brand").then((response) => {
        this.setState({ brands: response.data });
      });
    }

    selectBrand = (event) => {
      console.log(event.target.value)
      this.setState({ change: true });
    };

    render() {
      return (
        <>
          <div className="App">
            <div className="brands">
              <select id="cars" onChange={this.selectBrand}>
                <option value="märke">Välj Märke</option>
                {this.state.brands.map((val, key) => {
                  return <option id="option" key={key} value={val.Brand}>{val.Brand}</option>
                })}
              </select>
            </div>
            {this.state.change ? <Issue /> : null}
          </div>
        </>
      )
    }
  }

  class Issue extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        issues: [],
      }
    }

    componentDidMount() {
      Axios.get("http://localhost:3001/issue/").then((response) => {
        this.setState({ issues: response.data });
      });
    }


    selectBrand = (event) => {
      userInput['issue'] = event.target.value;
      console.log(event.target.value)
      this.setState({ change: true });
    };



    render() {
      return (
        <>
          <div className="App">
            <div className="issues">
              <label>Problem: </label>
              <select id="issues" onChange={this.selectBrand}>
                <option value="issues">Problem</option>
                {this.state.issues.map((val, key) => {
                  return <option key={key} value={val.Issue}>{val.Issue}</option>
                })}
              </select>
            </div>
            {this.state.change ? <Diagnostics /> : null}
          </div>
        </>
      )
    }
  }

  class Diagnostics extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        diagnostics: [],
      }
    }

    componentDidMount() {
      Axios.get(`http://localhost:3001/diagnostics/${userInput.issue}`).then((response) => {
        this.setState({ diagnostics: response.data });
      });
    }

    selectBrand = (event) => {
      userInput['diagnostics'] = event.target.value;
      console.log(event.target.value);
      this.setState({ change: true });
    };

    //Diaganostic regexp filter
    replaceRegex = (value) => {
      let reg = new RegExp(`\\d\\W\\S\\b${userInput.issue.toLowerCase()}\\b\\W\\W`);
      let newValue = value.replace(reg, '');
      return newValue
    }

    render() {
      return (
        <>
          <div className="App">
            <div className="diagnosticsues">
              <label>Diagnos: </label>
              <select id="diagnostics" onChange={this.selectBrand}>
                <option value="diagnostics">Diagnos</option>
                {this.state.diagnostics.map((val, key) => {
                  return <option key={key} value={this.replaceRegex(val.diagnostics)}>{this.replaceRegex(val.diagnostics)}</option>
                })}
              </select>
            </div>
            {this.state.change ? <Remedy /> : null}
          </div>
        </>
      )
    }
  }

  class Remedy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        remedy: [],
      }
    }

    componentDidMount() {
      Axios.get(`http://localhost:3001/remedy/${userInput.diagnostics}`).then((response) => {
        this.setState({ remedy: response.data });
      });
    }

    selectBrand = (event) => {
      console.log(event.target.value)
      this.setState({ change: true });
    };
    //Remedy regexp filter
    replaceRegex = (value) => {
      let reg = new RegExp(`\\d\\d\\W\\S\\b${userInput.issue.toLowerCase()}\\b\\W\\W`);
      let newValue = value.replace(reg, '');
      return newValue
    }

    clearList() { };

    render() {
      return (
        <>
          <form onSubmit={this.clearList}>
            <div className="App">
              <div className="remedy">
                <p>Lösning</p>
                {this.state.remedy.map((val, key) => {
                  return <h3 key={key} value={this.replaceRegex(val.remedy)}>{this.replaceRegex(val.remedy)}</h3>
                })}
                <button class="btn" type='submit'>Submit</button>
              </div>
            </div>
          </form>
        </>
      )
    }
  }
  return (
    <>
      <Brands />
    </>
  )
}
export default App;