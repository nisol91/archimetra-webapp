import React, { Component } from "react";
import "./about.scss";
import { translate } from "react-i18next";

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cubeVisibility: false
    };
  }

  //cosi controllo la durata del caricamento

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cubeVisibility: true });
    }, 1500);
  }
  render() {
    const { t } = this.props;
    return (
      <div className="boxAbout">
        <div className="aboutcontainer">
          <h1 className="about1 text-flicker-in-glow">{t("about_studio")}</h1>
          {/* <h1 className="about2 tracking-in-expand">good at:</h1> */}
          <h1 className="about3 swing-in-top-fwd">{t("studio_story")}</h1>
          <h1 className="about3 swing-in-top-fwd">{t("studio_story_2")}</h1>
        </div>
        <div
          className={`fade-in ${this.state.cubeVisibility && "visible"}`}
        ></div>
      </div>
    );
  }
}
export default translate()(About);
