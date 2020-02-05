import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  // faFacebook,
  // faInstagram,
  // faTwitter,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

import logo from "../../img/logo_2.png";
import home from "../../img/chinese-house.svg";
import portfolio from "../../img/view.svg";
import contact from "../../img/letter.svg";
import skills from "../../img/settings.svg";
import about from "../../img/lego.svg";

import i18n from "../../i18n";
import { withNamespaces } from "react-i18next";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navSlide: false,
      showOverlay: false,
      navShowedMedia: false,
      windowWidth: window.innerWidth
    };
    this.closeNav = this.closeNav.bind(this);
    this.openNav = this.openNav.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
    this.hiddenOverlay = this.hiddenOverlay.bind(this);
    this.showNav = this.showNav.bind(this);
  }
  showNav() {
    if (this.state.windowWidth < 1000) {
      this.setState({
        navShowedMedia: !this.state.navShowedMedia
      });
    }
  }
  closeNav() {
    this.setState({ navSlide: true });
  }
  openNav() {
    this.setState({ navSlide: false });
  }
  showOverlay() {
    this.setState({ showOverlay: true });
  }
  hiddenOverlay() {
    this.setState({ showOverlay: false });
  }
  componentDidMount() {}
  render() {
    // ==handling css classes==
    let className_1 = "mynavbar";
    if (this.state.navSlide) {
      className_1 += " slideLeft";
    }
    if (!this.state.navSlide) {
      className_1 += " slideRight";
    }
    let className_2 = "linkFont";
    if (this.state.navSlide) {
      className_2 += " hidden";
    }
    let className_3 = "overlay1";
    if (this.state.showOverlay) {
      className_3 += " overlay1Visible";
    } else if (this.state.hiddenOverlay) {
      className_3 = "overlay1";
    }

    //i18n
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };
    const { t } = this.props;

    return (
      <div className="navCont">
        <div className="myBarsCont">
          <FontAwesomeIcon
            icon={faBars}
            onClick={this.showNav}
            className="myBars"
          />
        </div>
        <div
          className={`${className_1} ${this.state.navShowedMedia &&
            "navbarShowedMedia"}`}
        >
          <Link to={"/"} className="mylink myLogoLink">
            <img
              className={`myLogo ${this.state.navSlide && "hidden"}`}
              src={logo}
              alt=""
            />
          </Link>
          <div
            className={`close-container ${this.state.navSlide && "hidden"}`}
            onClick={this.closeNav}
            onMouseEnter={this.showOverlay}
            onMouseLeave={this.hiddenOverlay}
          >
            <div className="leftright"></div>
            <div className="rightleft"></div>
          </div>
          <div className={className_3}>Try me!</div>
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`arrow_right ${this.state.navSlide &&
              "arrow_right_show"}`}
            onClick={this.openNav}
          />
          <Link to={"/"} className="mylink" onClick={this.showNav}>
            <h1 className={className_2}>Home</h1>
            <img
              className={`homeIcon ${this.state.navSlide && "show_icon"}`}
              src={home}
              alt=""
            />
          </Link>
          <Link to={"/about"} className="mylink" onClick={this.showNav}>
            <h1 className={className_2}>About</h1>
            <img
              className={`homeIcon aboutIcon ${this.state.navSlide &&
                "show_icon"}`}
              src={about}
              alt=""
            />
          </Link>
          <Link to={"/skills"} className="mylink" onClick={this.showNav}>
            <h1 className={className_2}>Skills</h1>
            <img
              className={`homeIcon skillsIcon ${this.state.navSlide &&
                "show_icon"}`}
              src={skills}
              alt=""
            />
          </Link>
          <Link to={"/portfolio"} className="mylink" onClick={this.showNav}>
            <h1 className={className_2}>Portfolio</h1>
            <img
              className={`homeIcon portIcon ${this.state.navSlide &&
                "show_icon"}`}
              src={portfolio}
              alt=""
            />
          </Link>
          <Link to={"/contact-me"} className="mylink" onClick={this.showNav}>
            <h1 className={className_2}>{t("contacts_nav")}</h1>
            <img
              className={`homeIcon contIcon ${this.state.navSlide &&
                "show_icon"}`}
              src={contact}
              alt=""
            />
          </Link>
          <div className={`socialIcons ${this.state.navSlide && "hidden"}`}>
            <a href="https://github.com/nisol91?tab=repositories">
              <FontAwesomeIcon icon={faGithub} className="mysocialicon" />
            </a>
            {/* <a href="/">
              <FontAwesomeIcon icon={faFacebook} className="mysocialicon" />
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faInstagram} className="mysocialicon" />
            </a>
            <a href="/">
              <FontAwesomeIcon icon={faTwitter} className="mysocialicon" />
            </a> */}
          </div>
          <div className={`lang ${this.state.navSlide && "hidden"}`}>
            {/* <h1 className="langSelect">IT</h1> */}
            {/* <h1 className="langSelect">EN</h1> */}
            <h1 className="langSelect" onClick={() => changeLanguage("it")}>
              IT
            </h1>
            <h1 className="langSelect" onClick={() => changeLanguage("en")}>
              EN
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
export default withNamespaces()(Navbar);
