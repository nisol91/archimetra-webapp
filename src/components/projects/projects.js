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
      project: [],
      doggos: [],
      firebaseProjects: [],
      projectsVisibility: false,
      barDidMount: false,
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
        this.setState({ firebaseProjects: data });
      });
  }
  async getDoggos() {
    const response = await fetch(
      "https://test-87a0f.firebaseapp.com/api/v1/doggos",

      {
        headers: {
          // "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    // console.log(await response.json());
  }
  // getDoggos() {
  //   axios
  //     // .get(`${process.env.REACT_APP_GET_PROJECTS}`)
  //     .get("https://test-87a0f.firebaseapp.com/api/v1/doggos", {
  //       headers: {
  //         "Access-Control-Allow-Origin": "http://localhost:3000",
  //         "Content-Type": "application/json"
  //       },
  //       data: {}
  //     })

  //     .then(response => {
  //       this.setState({ doggos: response.data });
  //     })
  //     .catch(function(error) {
  //       // console.log(error);
  //     });
  //   //cosi controllo la durata del caricamento
  //   setTimeout(() => {
  //     this.setState({
  //       projectsVisibility: true
  //     });
  //     // console.log(this.state.doggos);
  //   }, 3000);
  // }
  getProjects() {
    axios
      // .get(`${process.env.REACT_APP_GET_PROJECTS}`)
      .get("https://nicola-portfolio-api-2.herokuapp.com/project")

      .then(response => {
        this.setState({ project: response.data });
      })
      .catch(function(error) {
        // console.log(error);
      });
    //cosi controllo la durata del caricamento
    setTimeout(() => {
      this.setState({
        projectsVisibility: true
      });
      // console.log(this.state.project);
    }, 3000);
  }
  animation() {
    setTimeout(() => {
      this.setState({
        barDidMount: true
      });
    }, 0);
  }
  progress() {
    let progresso = setInterval(() => {
      let val = this.state.bar + 10;
      this.setState({
        bar: val
      });
      if (this.state.bar >= 100) {
        clearInterval(progresso);
      }
    }, 200);
  }
  componentDidMount() {
    this.getProjects();
    this.getDoggos();
    this.fetchProjects();
    this.animation();
    this.progress();
  }
  render() {
    const { t } = this.props;

    return (
      <div className={`fade-in ${this.state.barDidMount && "visible"}`}>
        <div className="progressBar">
          {this.state.projectsVisibility === false && (
            <ProgressBar now={this.state.bar} />
          )}
        </div>
        <div
          className={`boxPortfolio fade-in ${this.state.barDidMount &&
            "visible"}`}
        >
          {this.state.projectsVisibility ? (
            <div
              className={`textPortfolio ${this.state.projectsVisibility &&
                "visible slide-in-tr"}`}
            >
              <h1 className="port1">{t("the_work")}</h1>
              <h1 className="port2">Check it out</h1>
            </div>
          ) : null}
          <div
            className={`works fade-in ${this.state.projectsVisibility &&
              "visible"}`}
          >
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
