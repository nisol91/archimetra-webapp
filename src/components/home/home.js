import React, { Component } from "react";
import Sphere from "../sphere";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { translate } from "react-i18next";
import scrollToComponent from "react-scroll-to-component";
import "./home.scss";
import Contact from "../contact/contact";
import firebase from "firebase";

//inizializzo firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCW3XY0Dg3E27kaIFM4IfvITbl5pXyw3io",
  authDomain: "archimetra-72c69.firebaseapp.com",
  databaseURL: "https://archimetra-72c69.firebaseio.com",
  projectId: "archimetra-72c69",
  storageBucket: "archimetra-72c69.appspot.com",
  messagingSenderId: "267374463312",
  appId: "1:267374463312:web:bdcf27db9088ce82fb0455",
  measurementId: "G-1F4M1LF7NV"
});
const db = firebaseApp.firestore();
export { db };

class Home extends Component {
  constructor(props) {
    super(props);
    this.addProject = this.addProject.bind(this);
    this.state = {
      cubeVisibility: false
    };
  }
  notify = () => toast("Scroll to zoom and drag to move!");

  //cosi controllo la durata del caricamento

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cubeVisibility: true });
      this.notify();
    }, 1500);
    this.fetchProjects();
  }

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

  render() {
    //==handling css classes==
    // let className_1 = "boxPortfolio";
    // if (this.state.slide) {
    //   className_1 += " ";
    // }

    const { t } = this.props;

    return (
      <div className="boxHome">
        <div>
          <h1 className="home1 text-flicker-in-glow">Hey</h1>
          <h1 className="home2 tracking-in-expand">{t("this_is_downhill")}</h1>
          <h1 className="home3 swing-in-top-fwd">{t("what_we_love")}</h1>
          <Link
            className="mylink"
            onClick={() =>
              scrollToComponent(this.contactRef, {
                offset: 0,
                align: "top",
                duration: 1500
              })
            }
          >
            <div className="myBtnContact swing-in-top-fwd">{t("contacts")}</div>
          </Link>
          <div
            onClick={this.addProject}
            className="myBtnContact swing-in-top-fwd"
          >
            add project
          </div>
          <Contact
            ref={section => {
              this.contactRef = section;
            }}
          ></Contact>
        </div>

        <div className={`fade-in ${this.state.cubeVisibility && "visible"}`}>
          <Sphere></Sphere>
          <div>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(Home);
