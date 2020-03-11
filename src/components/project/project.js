import React, { Component } from "react";
import "./project.scss";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { db } from "../portfolio_single_page/portfolio_sp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faArrowAltCircleLeft,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "react-image-gallery";
import ReactPlayer from "react-player";

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageLoaded: false,
      projectId: null,
      project: [],
      projectLenght: 0,
      images: [],
      showGallery: false,
      imagesForGallery: [],
      showVideo: false,
      name: "",
      content: []
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.changeProj = this.changeProj.bind(this);
  }

  async fetchProjects(projID) {
    await db
      .collection("projects")
      .where("index", "==", projID)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("=====PROJECTS in project====");
        console.log(data[0].content);
        this.setState({
          project: data[0],
          content: data[0].content,
          images: data[0].img
        });
        // console.log("=====images====");
        // console.log(this.state.images);

        // this creates an array with all urls of the images, for the image gallery
        var arr = [];
        var len = this.state.images.length;
        for (var i = 0; i < len; i++) {
          arr.push({
            original: this.state.images[i],
            thumbnail: this.state.images[i]
          });
        }
        this.setState({
          imagesForGallery: arr
        });

        // console.log(arr);
      });
  }

  async countProjects() {
    await db
      .collection("projects")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        // console.log("=====QUANTI PROGETTI?====");
        // console.log(data.length);
        this.setState({ projectLenght: data.length });
      });
  }
  handleImageLoaded() {
    setTimeout(() => {
      this.setState({
        imageLoaded: true
      });
      // console.log(this.state.imageLoaded);
    }, 0);
  }
  changeProj() {
    this.setState({
      showGallery: false
    });

    setTimeout(() => {
      this.setProjId();
    }, 200);
  }
  setProjId() {
    const { projID } = this.props.match.params;
    this.setState({
      projectId: projID
    });
    this.fetchProjects(projID);
    setTimeout(() => {
      // console.log("projID=====----");
      // console.log(projID);
    }, 200);
  }

  componentDidMount() {
    this.setProjId();
    this.countProjects();
  }

  render() {
    return (
      <div className="projBox">
        <div className="textContainer">
          <div className="projTitle titleProj">{this.state.project.name}</div>
          <div className="projDesc subtitleProj">
            {this.state.project.description}
          </div>
          <div className="projCont">
            <span className="boldProj">Anno:</span> {this.state.content[0]}
          </div>
          <div className="projCont">
            <span className="boldProj">Realizzazione:</span>{" "}
            {this.state.content[1]}
          </div>
          <div className="projCont">
            <span className="boldProj">Superficie:</span>{" "}
            {this.state.content[2]}
          </div>
          <div className="projCont">
            <span className="boldProj">Committente:</span>{" "}
            {this.state.content[3]}
          </div>
          <div className="projCont">
            <span className="boldProj">Prestazione:</span>{" "}
            {this.state.content[4]}
          </div>
          <div className="projCont">{this.state.content[5]}</div>
        </div>

        <div className="imagesContainer">
          {this.state.images.map((image, index) => (
            <React.Fragment key={index}>
              <div className="imageBox">
                <img src={image} alt="" className="image" />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
