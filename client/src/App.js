import './App.css';
import Axios from "axios";
import React from "react";

function App() {

  // varibel för att ta emot användarens val i dropdown lista
  const userInput = [{ brand: "", issue: "", diagnostics: "", remedy: "" }];

  // class som hanterar val av märken från databas
  class Brands extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        brands: [],
      }
    }

    // get request för att hämta märken från databas
    componentDidMount() {
      Axios.get("http://localhost:3001/brand").then((response) => {
        this.setState({ brands: response.data });
      });
    }

    // funktion för att kolla om val har gjorts i dropdown meny
    selectHandler = (event) => {
      this.setState({ change: true });
    };

    render() {
      return (
        <>
          <div className="App">
            <div>
              <select onChange={this.selectHandler}>
                <option value="märke">Välj Märke</option>
                {this.state.brands.map((val, key) => {
                  return <option key={key} value={val.Brand}>{val.Brand}</option>
                })}
              </select>
            </div>
            {/*När change eller lika med true, så visas problem classen på sidan*/}
            {this.state.change ? <Issue /> : null}
          </div>
        </>
      )
    }
  }

  // class som hanterar val av problem från databas
  class Issue extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        issues: [],
      }
    }

    // get request för att hämta problem från databas
    componentDidMount() {
      Axios.get("http://localhost:3001/issue/").then((response) => {
        this.setState({ issues: response.data });
      });
    }

    // funktion för att kolla om val har gjorts i dropdown meny
    // sparar användarens val från dropdown
    selectHandler = (event) => {
      userInput['issue'] = event.target.value;
      this.setState({ change: true });
    };



    render() {
      return (
        <>
          <div className="App">
            <div>
              <label>Problem: </label>
              <select onChange={this.selectHandler}>
                <option value="issues">Problem</option>
                {this.state.issues.map((val, key) => {
                  return <option key={key} value={val.Issue}>{val.Issue}</option>
                })}
              </select>
            </div>
            {/*När change eller lika med true, så visas diagnos classen på sidan*/}
            {this.state.change ? <Diagnostics /> : null}
          </div>
        </>
      )
    }
  }

  // class som hanterar val av diagnos från databas
  class Diagnostics extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        diagnostics: [],
      }
    }

    // get request för att hämta diagnos från databas
    componentDidMount() {
      Axios.get(`http://localhost:3001/diagnostics/${userInput.issue}`).then((response) => {
        this.setState({ diagnostics: response.data });
      });
    }

    // funktion för att kolla om val har gjorts i dropdown meny
    // sparar användarens val från dropdown
    selectHandler = (event) => {
      userInput['diagnostics'] = event.target.value;
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
            <div>
              <label>Diagnos: </label>
              <select onChange={this.selectHandler}>
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

  // class som hanterar val av lösning från databas
  class Remedy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        change: false,
        remedy: [],
      }
    }

    // get request för att hämta lösning från databas
    componentDidMount() {
      Axios.get(`http://localhost:3001/remedy/${userInput.diagnostics}`).then((response) => {
        this.setState({ remedy: response.data });
      });
    }

    // funktion för att kolla om val har gjorts i dropdown meny
    // sparar användarens val från dropdown
    selectHandler = (event) => {
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
              <div>
                <p>Lösning</p>
                {this.state.remedy.map((val, key) => {
                  return <h3 key={key} value={this.replaceRegex(val.remedy)}>{this.replaceRegex(val.remedy)}</h3>
                })}
                <button className="btn" type='submit'>Submit</button>
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