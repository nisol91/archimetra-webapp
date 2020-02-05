import React, { Component } from "react";
import Cube from "../cube";
import { translate } from "react-i18next";
import reactLogo from "../../img/react.svg";
import firebaseLogo from "../../img/firebase_logo.png";
import htmlLogo from "../../img/html.png";
import cssLogo from "../../img/css.png";
import dartLogo from "../../img/dart.png";
import flutterLogo from "../../img/flutter.png";
import jsLogo from "../../img/js.png";

import "./skills.scss";

// import axios from "axios";
// import { Spinner } from "reactstrap";

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cubeShow: false,
      stackItems: [
        { id: 1, name: "react", src: reactLogo },
        { id: 2, name: "firebase", src: firebaseLogo },
        { id: 5, name: "js", src: jsLogo },
        { id: 6, name: "dart", src: dartLogo },
        { id: 6, name: "html", src: htmlLogo },
        { id: 6, name: "css", src: cssLogo },
        { id: 7, name: "flutter", src: flutterLogo }
      ]
    };
  }
  animation() {
    setTimeout(() => {
      this.setState({
        cubeShow: true
      });
    }, 0);
  }
  componentDidMount() {
    this.animation();
  }
  render() {
    const { t } = this.props;

    return (
      <div className="boxSkills">
        <div className="skillssx">
          <h1 className="skills1 text-flicker-in-glow">{t("the_skillset")}</h1>
          <h1 className="skills2 tracking-in-expand">good at:</h1>
          <h1 className="skills3 swing-in-top-fwd">
            JavaScript, React, Dart, Flutter, Html, Css
          </h1>
        </div>
        <div className={`skillsdx fade-in ${this.state.cubeShow && "visible"}`}>
          <h1 className="skills2 tracking-in-expand">the stack:</h1>
          <div className="skillCardBox">
            {this.state.stackItems.map((item, key) => (
              <React.Fragment key={key}>
                <div className="card_skills" key={item.id}>
                  <img className="logosSkills" src={item.src} alt="" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default translate()(Skills);
