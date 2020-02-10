import React, { Component } from "react";
import Card from "../card/card";
import "./projects.scss";
import { translate } from "react-i18next";
import { db } from "../portfolio_single_page/portfolio_sp";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseProjects: [],
      projectsVisibility: true,
      contentDidMount: false,
      deviceType: ""
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

  componentDidMount() {
    this.fetchProjects();
    this.isMobile();
  }
  render() {
    const { t } = this.props;

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        partialVisibilityGutter: 40
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 40
      }
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
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={this.state.deviceType === "mobile" ? false : true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all .5s"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.state.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                focusOnSelect={false}
              >
                {this.state.firebaseProjects.map((project, index) => (
                  <React.Fragment key={index}>
                    <div key={index} className="carouselElement">
                      {/* <h1>{project.name}</h1> */}
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
