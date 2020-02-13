import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PortfolioSp from "./components/portfolio_single_page/portfolio_sp";
import Project from "./components/project/project";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { translate } from "react-i18next";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      splashScreen: true,
      hideSplash: false
    };
  }
  componentDidMount() {
    this.splash();
  }
  splash() {
    setTimeout(() => {
      this.setState({ splashScreen: false });
    }, 1500);
    setTimeout(() => {
      this.setState({ hideSplash: true });
    }, 3000);
  }

  render() {
    // console.log(process.env.REACT_APP_VAR);
    // console.log(process.env.REACT_APP_GET_PROJECTS);

    return (
      <I18nextProvider i18n={i18n}>
        <Router>
          <div className="contenitore">
            <div className="main" onClick={this.hideNav}>
              {!this.state.hideSplash ? (
                <div
                  className={`splashScreen  ${this.state.splashScreen ===
                    false && "fade-out-splash"}`}
                >
                  <img
                    className="splashImg pulseit"
                    src="https://firebasestorage.googleapis.com/v0/b/archimetra-72c69.appspot.com/o/archimetra_logo.png?alt=media&token=2c8ae350-b677-4aab-a10a-00e98ffa6033"
                    alt=""
                  />
                </div>
              ) : null}
              <Route exact path="/" component={PortfolioSp} />
              <Route exact path="/project/:projID" component={Project} />
            </div>
          </div>
        </Router>
      </I18nextProvider>
    );
  }
}

export default translate("common")(App);

//qui dentro si trovano la navbar e il router con le transizioni
