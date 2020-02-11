import React, { Component } from "react";
import "./team.scss";
import { translate } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShapes,
  faRulerCombined
} from "@fortawesome/free-solid-svg-icons";

class Team extends Component {
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
          <h1 className="about1 text-flicker-in-glow">IL TEAM</h1>
          <div className="linearDiv"></div>

          <div className="fourPresentationDiv"></div>
        </div>
        <div
          className={`fade-in ${this.state.cubeVisibility && "visible"}`}
        ></div>
      </div>
    );
  }
}
export default translate()(Team);
