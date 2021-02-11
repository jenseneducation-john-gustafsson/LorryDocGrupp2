import './App.css';
import Axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
          {/*Knapp för kontakt sidan*/}
          <button className="btn-contact"><Link to="/contact">Kontakt</Link></button>
          <div className="App">
            <div>
              <select onChange={this.selectHandler}>
                <option>Välj märke</option>
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
              <select onChange={this.selectHandler}>
                <option>Problem</option>
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
              <select onChange={this.selectHandler}>
                <option>Diagnos</option>
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
                <p id="margin-remedy">Lösning</p>
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

  // funktion för kontakt sidan
  function contact() {
    return (
      <div className="section-contact">
        <div className="main-contact">
          <div className="information-contact">
            <div>
              <h2>Kontakta oss</h2>
              <p>LorryDoc AB</p>
              <p>Stockholmsvägen 123</p>
              <p>Öppettider : kl 07-21</p>
              <p>Telefon Nummer : 08-113 112 80</p>
              <p>Epost : lorrydoc@gmail.com</p>
              <br />
              <h2>Lite om oss</h2>
              <p>LorryDoc var skapad för att undersöka <br />
                problemet innan man ringer till <br />
                verkstad, oftast så är det små saker som <br />
                du kan fixa själv och det är då <br />
                LorryDoc kommer till hjälp </p>
            </div>
          </div>
          <button className="btn-home"><Link to="/">Hem</Link></button>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Route path="/" component={Brands} exact={true} />
      <Route path="/contact" component={contact} />
    </Router>
  )
}
export default App;