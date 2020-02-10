import React, { Component } from "react";
import axios from "axios";
import Card from "../card/card";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./projects.scss";
import { translate } from "react-i18next";
import reactLogo from "../../img/react.svg";
import firebaseLogo from "../../img/firebase_logo.png";
import { db } from "../portfolio_single_page/portfolio_sp";

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: "",
      firebaseProjects: [],
      projectsVisibility: true,
      contentDidMount: false,
      bar: 0
    };
  }

  async fetchProjects() {
    await db
      .collection("projects")
      .orderBy("id")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        // console.log("=====PROJECTS====");
        // console.log(data);
        // console.log("=====PROJECTS====");
        this.setState({ firebaseProjects: data, projectsVisibility: true });
      });
  }

  componentDidMount() {
    this.fetchProjects();
  }
  render() {
    const { t } = this.props;

    return (
      <div className={`fade-in ${this.state.projectsVisibility && "visible"}`}>
        <div
          className={`boxPortfolio fade-in ${this.state.projectsVisibility &&
            "visible"}`}
        >
          <div
            className={`textPortfolio ${this.state.projectsVisibility &&
              "visible slide-in-tr"}`}
          >
            <h1 className="port1">PORTFOLIO</h1>
            <div className="dottedDiv"></div>

            <a className="goToProjects">VAI AL PORTFOLIO</a>
          </div>
          <div
            className={`works fade-in ${this.state.projectsVisibility &&
              "visible"}`}
          >
            progetti
            {this.state.firebaseProjects.map((project, index) => (
              <React.Fragment key={index}>
                <Card key={index} datiPerCard={project} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default translate()(Projects);
