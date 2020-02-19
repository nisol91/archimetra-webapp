import React, { Component } from "react";
import "./partners.scss";
import { translate } from "react-i18next";
import { db } from "../portfolio_single_page/portfolio_sp";
import Carousel from "nuka-carousel";
import { isMobile } from "react-device-detect";
import { Parallax } from "react-parallax";

class Partners extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      firebasePartners: [],
      partnersVisibility: false,
      deviceType: "",
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  async fetchPartners() {
    await db
      .collection("partners")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        //console.log(data);
        this.setState({ firebasePartners: data });
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
    }, 1500);
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
        partnersVisibility: true
      });
    }, 300);
  }

  componentDidMount() {
    this.fetchPartners();
    this.isMobile();
    window.addEventListener("resize", this.updateDimensions);
  }
  render() {
    const { t } = this.props;

    return (
      <div
        className={`partners fade-in ${this.state.partnersVisibility &&
          "visible"}`}
      >
        <div className="lineDiv"></div>
        <h1 className="partn1">PARTNERS</h1>
        <div className="carouselPartnersContainer">
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
            withoutControls="true"
          >
            {this.state.firebasePartners.map((project, index) => (
              <React.Fragment key={index}>
                <div key={index} className="carouselPartnersElement">
                  <img
                    className="carouselPartnersImg"
                    src={project.img}
                    alt=""
                  />
                </div>
              </React.Fragment>
            ))}
          </Carousel>
        </div>
        <div className="parallaxDiv">
          <Parallax
            className="parallax"
            bgImage="https://firebasestorage.googleapis.com/v0/b/archimetra-72c69.appspot.com/o/nuova%20villa%20INTERNO%201.jpg?alt=media&token=de4731ee-7381-4a01-b024-78c373240d3d"
            strength={500}
          ></Parallax>
        </div>
      </div>
    );
  }
}
// export default Contact;
export default translate()(Partners);
