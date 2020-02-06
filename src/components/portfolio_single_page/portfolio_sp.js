import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { translate } from "react-i18next";
import "./portfolio_sp.scss";
import Contact from "../contact/contact";
import Projects from "../projects/projects";
import Footer from "../footer/footer";
import About from "../about/about";
import Skills from "../skills/skills";
import {
  Link as ScrollLink,
  Element,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import ScrollTrigger from "react-scroll-trigger";
import HamburgerMenu from "react-hamburger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMobile, faAddressCard } from "@fortawesome/free-solid-svg-icons";

import firebase from "firebase";

//inizializzo firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCDlPVDPih7_MU4U2V43vxgfF2R3se9wxQ",
  authDomain: "archimetra-72c69.firebaseapp.com",
  databaseURL: "https://archimetra-72c69.firebaseio.com",
  projectId: "archimetra-72c69",
  storageBucket: "archimetra-72c69.appspot.com",
  messagingSenderId: "966185168987",
  appId: "1:966185168987:web:1f2b552754a6e4ddba4f7e",
  measurementId: "G-XHPJN8MRBQ"
});
const db = firebaseApp.firestore();
export { db };

class PortfolioSp extends Component {
  constructor(props) {
    super(props);
    this.addProject = this.addProject.bind(this);
    this.state = {
      cubeVisibility: false,
      toggleClass: true,
      scrollProjects: false,
      scrollContacts: false,
      toggleNav: false,
      skillsNavVisible: false,
      projectsNavVisible: false,
      aboutNavVisible: false,
      homeNavVisible: false,
      contactsNavVisible: false,
      skillsVisible: false,
      projectsVisible: false,
      aboutVisible: false,
      homeVisible: false,
      contactsVisible: false,
      hideNavbar: true,

      navItems: [
        { id: 1, name: "HOME", ref: "home", offset: -80 },
        { id: 2, name: "LO STUDIO", ref: "projects", offset: -80 },
        { id: 3, name: "PORTFOLIO", ref: "about", offset: -80 },
        { id: 4, name: "PARTNERS", ref: "skills", offset: -80 },
        { id: 5, name: "IL TEAM", ref: "skills", offset: -80 },
        { id: 6, name: "CONTATTACI", ref: "contacts", offset: -80 }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cubeVisibility: true, toggleClass: false });
      this.notify();
    }, 1500);
    this.fetchProjects();
    window.addEventListener("scroll", this.handleScroll, true);
    scrollSpy.update();
  }

  //toast component
  notify = () => toast("Hey, check out my projects");

  //==================gestione dello scroll

  scrollTo(element, offset) {
    scroller.scrollTo(element, {
      duration: 400,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: offset
    });
  }
  onEnterViewportAbout = () => {
    this.setState({
      aboutVisible: true,
      aboutNavVisible: true
    });
    // console.log(this.state.visible);
  };

  onExitViewportAbout = () => {
    this.setState({
      aboutNavVisible: false
    });
    // console.log(this.state.visible);
  };
  onEnterViewportSkills = () => {
    this.setState({
      skillsVisible: true,
      skillsNavVisible: true
    });
    // console.log(this.state.visible);
  };

  onExitViewportSkills = () => {
    this.setState({
      skillsNavVisible: false
    });
    // console.log(this.state.visible);
  };
  onEnterViewportProjects = () => {
    this.setState({
      projectsVisible: true,
      projectsNavVisible: true
    });
    // console.log(this.state.visible);
  };

  onExitViewportProjects = () => {
    this.setState({
      projectsNavVisible: false
    });
    // console.log(this.state.visible);
  };

  onEnterViewportHome = () => {
    this.setState({
      homeVisible: true,
      homeNavVisible: true
    });
    // console.log(this.state.visible);
  };

  onExitViewportHome = () => {
    this.setState({
      homeNavVisible: false
    });
    // console.log(this.state.visible);
  };

  onEnterViewportContacts = () => {
    this.setState({
      contactsVisible: true,
      contactsNavVisible: true
    });
    // console.log(this.state.visible);
  };

  onExitViewportContacts = () => {
    this.setState({
      contactsNavVisible: false
    });
    // console.log(this.state.visible);
  };

  handleScroll = () => {
    if (window.scrollY > "100") {
      this.setState({ scrollProjects: true });
    }
    if (window.scrollY > "300") {
      this.setState({ scrollContacts: true });
    }
    if (window.scrollY > "200") {
      this.setState({ toggleNav: true });
    }
    if (window.scrollY < "100") {
      this.setState({ toggleNav: false });
    }
    // console.log(window.scrollY);
  };

  //==============

  //========chiamata per i progetti
  async fetchProjects() {
    await db
      .collection("projects")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        // console.log("=========");
        // console.log(data);
        // console.log("=========");
      });
  }
  addProject() {
    // console.log("inizio");

    db.collection("projects")
      .add({
        name: " projectLos Angeles",
        description: "bello"
      })
      .then(function() {
        // console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
  showNavbar = () => {
    this.setState({ hideNavbar: !this.state.hideNavbar });
  };

  //RENDER DEL COMPONENTE=======

  render() {
    //per le intl
    const { t } = this.props;

    return (
      <div className="boxPortfolioSp">
        <div
          className={`showNavBtn ${!this.state.hideNavbar && ""} `}
          onClick={this.showNavbar}
        >
          <HamburgerMenu
            isOpen={!this.state.hideNavbar}
            menuClicked={this.showNavbar}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color="black"
            borderRadius={0}
            animationDuration={0.5}
          />
        </div>
        <div
          className={`navbar fixedMobileNav ${this.state.toggleNav &&
            "coloredNav slide-in-top"} ${this.state.hideNavbar &&
            "hide slide-in-top"}`}
        >
          <div className="topNavbar">
            <div
              className={`firstRow  ${this.state.toggleNav && "hideFirstRow"} `}
            >
              <h1 className="topText">
                <FontAwesomeIcon icon={faMobile} className="navIcon" />
                0521 618082
              </h1>
              <FontAwesomeIcon icon={faAddressCard} className="navIcon" />
              <h1 className="topText">tecnico@archimetrastudio.it</h1>
            </div>
            <div className="secondRow">
              <img
                className={`logoNav  ${this.state.toggleNav &&
                  "logoNavSmall"} `}
                src="https://firebasestorage.googleapis.com/v0/b/archimetra-72c69.appspot.com/o/archimetra_logo.png?alt=media&token=2c8ae350-b677-4aab-a10a-00e98ffa6033"
                alt=""
              />
            </div>
          </div>
          <div className="bottomNavbar">
            <div
              className={`showNavBtn ${this.state.hideNavbar && "hide"} `}
              onClick={this.showNavbar}
            ></div>
            {this.state.navItems.map((item, key) => (
              <div className="navItem " key={item.id}>
                <ScrollLink
                  to={""}
                  className={`mylink_portfolio lineThroughNav ${this.state
                    .skillsNavVisible &&
                    item.name === "PARTNERS" &&
                    "active"} ${this.state.projectsNavVisible &&
                    item.name === "PORTFOLIO" &&
                    "active"} ${this.state.aboutNavVisible &&
                    item.name === "About" &&
                    "active"} ${this.state.homeNavVisible &&
                    item.name === "HOME" &&
                    "active"} ${this.state.contactsNavVisible &&
                    item.name === "CONTATTACI" &&
                    "active"}`}
                  onClick={() => {
                    this.setState({
                      scrollContacts: true,
                      scrollProjects: true
                    });
                    setTimeout(() => {
                      this.scrollTo(item.ref, item.offset);
                    }, 300);
                  }}
                >
                  {item.name}
                </ScrollLink>
                <div
                  className={`dot ${this.state.skillsNavVisible &&
                    item.name === "PARTNERS" &&
                    "dotActive"} ${this.state.projectsNavVisible &&
                    item.name === "PORTFOLIO" &&
                    "dotActive"} ${this.state.aboutNavVisible &&
                    item.name === "About" &&
                    "dotActive"} ${this.state.homeNavVisible &&
                    item.name === "HOME" &&
                    "dotActive"} ${this.state.contactsNavVisible &&
                    item.name === "CONTATTACI" &&
                    "dotActive"}`}
                ></div>
                {item.id != 6 ? (
                  <div className="separatorNavItem">/</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <ScrollTrigger
          className="scrollTrigger"
          onEnter={this.onEnterViewportHome}
          onExit={this.onExitViewportHome}
        ></ScrollTrigger>
        <Element name="home"></Element>

        <div className="boxHome">
          <img
            className="homeImg"
            src="https://firebasestorage.googleapis.com/v0/b/archimetra-72c69.appspot.com/o/proj1.jpg?alt=media&token=1c349bd4-5350-46fb-88e2-d3b07e280ac3"
            alt=""
          />
          <h1 className="home1 text-flicker-in-glow">Hey</h1>
          <ScrollLink
            to={""}
            className="mylink_portfolio"
            onClick={() => {
              this.setState({ scrollContacts: true, scrollProjects: true });

              setTimeout(() => {
                this.scrollTo("contacts", -5);
              }, 300);
            }}
          >
            <div
              className={`myBtnContact ${this.state.toggleClass &&
                "swing-in-top-fwd"}`}
            >
              {t("contacts")}
            </div>
          </ScrollLink>
        </div>

        <div>
          <div>{/* <ToastContainer /> */}</div>
        </div>
        {this.state.scrollProjects ? (
          <div>
            <ScrollTrigger
              className="scrollTrigger"
              onEnter={this.onEnterViewportProjects}
              onExit={this.onExitViewportProjects}
            ></ScrollTrigger>
            <Element name="projects">
              <Projects id="projects"></Projects>
            </Element>
          </div>
        ) : null}
        <div>
          <ScrollTrigger
            className="scrollTrigger"
            onEnter={this.onEnterViewportAbout}
            onExit={this.onExitViewportAbout}
          ></ScrollTrigger>
          <Element name="about" className="aboutPlaceholder">
            {this.state.aboutVisible ? <About id="about"></About> : null}
          </Element>
        </div>
        <div>
          <ScrollTrigger
            className="scrollTrigger"
            onEnter={this.onEnterViewportSkills}
            onExit={this.onExitViewportSkills}
          ></ScrollTrigger>
          <Element name="skills">
            <Skills id="skills"></Skills>
          </Element>
        </div>

        {this.state.scrollContacts ? (
          <div>
            <ScrollTrigger
              className="scrollTrigger"
              onEnter={this.onEnterViewportContacts}
              onExit={this.onExitViewportContacts}
            ></ScrollTrigger>
            <Element name="contacts" className="contactsPlaceholder">
              {this.state.contactsVisible ? (
                <Contact id="contact"></Contact>
              ) : null}
            </Element>
          </div>
        ) : null}
        <Footer></Footer>
      </div>
    );
  }
}

export default translate()(PortfolioSp);
