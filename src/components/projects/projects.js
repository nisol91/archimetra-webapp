import React, { Component } from "react";
import Card from "../card/card";
import "./projects.scss";
import { translate } from "react-i18next";
import { db } from "../portfolio_single_page/portfolio_sp";
import Carousel from "nuka-carousel";

import { isMobile } from "react-device-detect";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      firebaseProjects: [],
      projectsVisibility: true,
      contentDidMount: false,
      deviceType: "",
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  async fetchProjects() {
    await db
      .collection("projects")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("=====PROJECTS====");
        console.log(data);
        console.log("=====PROJECTS====");
        this.setState({ firebaseProjects: data, projectsVisibility: true });
      });
  }

  isMobile() {
    if (isMobile === true) {
      this.setState({ deviceType: "mobile" });
    } else {
      this.setState({ deviceType: "browser" });
    }
    setTimeout(() => {
      console.log("====================================");
      console.log(this.state.deviceType);
      console.log(isMobile);
      console.log("====================================");
    }, 1500);
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
    console.log(this.state.width);
  }

  componentDidMount() {
    this.fetchProjects();
    this.isMobile();
    window.addEventListener("resize", this.updateDimensions);
  }
  render() {
    const { t } = this.props;

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

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
            <div className="carouselContainer">
              <Carousel
                slidesToShow={
                  this.state.width > 1100
                    ? this.state.width > 1500
                      ? "4"
                      : "3"
                    : this.state.width > 900
                    ? "2"
                    : "1"
                }
                dragging="true"
                swiping="true"
                wrapAround="true"
                autoplay="true"
                autoplayInterval="2000"
              >
                {this.state.firebaseProjects.map((project, index) => (
                  <React.Fragment key={index}>
                    <div key={index} className="carouselElement">
                      <a className="hoverDiv" href="/">
                        <h1 className="projectTitle">{project.name}</h1>
                        <div className="divisorio"></div>
                        <h1 className="projectDesc">{project.description}</h1>
                      </a>
                      <img className="carouselImg" src={project.img} alt="" />
                    </div>
                  </React.Fragment>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default translate()(Projects);
