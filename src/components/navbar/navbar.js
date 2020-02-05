import React, { Component } from "react";
import "./navbar.scss";
import i18n from "../../i18n";
import { withNamespaces } from "react-i18next";
import scrollToComponent from "react-scroll-to-component";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faBars } from "@fortawesome/free-solid-svg-icons";

// import logo from "../../img/logo_2.png";
// import home from "../../img/chinese-house.svg";
// import portfolio from "../../img/view.svg";
// import contact from "../../img/letter.svg";
// import skills from "../../img/settings.svg";
// import about from "../../img/lego.svg";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleNav: false,
      navItems: [
        { id: 1, name: "Home" },
        { id: 2, name: "Projects" },
        { id: 3, name: "About" },
        { id: 4, name: "Skills" },
        { id: 5, name: "Contact" }
      ]
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }

  handleScroll = () => {
    if (window.scrollY > "200") {
      this.setState({ toggleNav: true });
    }
    if (window.scrollY < "100") {
      this.setState({ toggleNav: false });
    }
  };

  render() {
    //i18n
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };
    const { t } = this.props;

    return (
      <div
        className={`nav_bar ${this.state.toggleNav && "fixedNav slide-in-top"}`}
      >
        {this.state.navItems.map((item, key) => (
          <Link
            className="mylink"
            onClick={() => {
              this.setState({ scrollContacts: true });

              setTimeout(() => {
                scrollToComponent(this.contactRef, {
                  offset: 200,
                  align: "bottom",
                  duration: 1000
                });
              }, 100);
            }}
          >
            <div className="navItem" key={item.id}>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
export default withNamespaces()(Navbar);
