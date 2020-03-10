import React, { Component } from "react";
import "./portfolio.scss";
import { translate } from "react-i18next";
import { db } from "../portfolio_single_page/portfolio_sp";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";

import { isMobile } from "react-device-detect";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      firebaseProjects: [],
      projectsVisibility: false,
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
        //console.log("=====PROJECTS====");
        //console.log(data);
        //console.log("=====PROJECTS====");
        this.setState({ firebaseProjects: data });
        this.showProjects();
      });
  }

  isMobile() {
    if (isMobile === true) {
      this.setState({ deviceType: "mobile" });
    } else {
      this.setState({ deviceType: "browser" });
    }
    setTimeout(() => {
      //console.log("====================================");
      //console.log(this.state.deviceType);
      //console.log(isMobile);
      //console.log("====================================");
    }, 200);
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
    //console.log(this.state.width);
  }

  showProjects() {
    setTimeout(() => {
      this.setState({
        projectsVisibility: true
      });
    }, 100);
  }

  componentDidMount() {
    this.fetchProjects();
    this.isMobile();
    window.addEventListener("resize", this.updateDimensions);
  }
  render() {
    const { t } = this.props;

    return (
      <div
        className={`boxPortfolio fade-in ${this.state.projectsVisibility &&
          "visible "}`}
      >
        <div
          className={`textPortfolio ${this.state.projectsVisibility &&
            "visible slide-in-tr"}`}
        >
          <h1 className="port1">PORTFOLIO</h1>
          <div className="dottedDiv"></div>
          <Link to={"/"} className="mylink">
            <div className="goToProjects">TORNA ALLA HOME</div>
          </Link>
        </div>
        <div
          className={`works fade-in ${this.state.projectsVisibility &&
            "visible"}`}
        >
          {this.state.firebaseProjects.map((project, index) => (
            <React.Fragment key={index}>
              {project.hide == null ? (
                <Link
                  to={{
                    pathname: `/portfolio/${project.index}`,
                    state: {
                      name: project.name,
                      description: project.description,
                      img: project.img[0]
                    }
                  }}
                  className="carouselElement"
                >
                  <div className="hoverDiv" href="/">
                    <h1 className="projectTitle">{project.name}</h1>
                    <div className="divisorio"></div>
                    <h1 className="projectDesc">{project.description}</h1>
                  </div>
                  <img className="carouselImg" src={project.img[0]} alt="" />
                </Link>
              ) : (
                <div className="carouselElement grey">
                  <div className="hoverDiv" href="/">
                    <h1 className="projectTitle">{project.name}</h1>
                    <div className="divisorio"></div>
                    <h1 className="projectDesc">{project.description}</h1>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
export default translate()(Portfolio);
