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
      showVideo: false
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.changeProj = this.changeProj.bind(this);
    this.showGallery = this.showGallery.bind(this);
    this.showVideo = this.showVideo.bind(this);
  }

  async fetchProjects(projID) {
    await db
      .collection("projects")
      .where("id", "==", projID)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        // console.log("=====PROJECTS in project====");
        // console.log(data[0].img[1]);
        // console.log("=====PROJECTS====");
        this.setState({
          project: data[0],
          images: data[0].img
        });
        // console.log(this.state.images);
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
      .where("id", ">", "0")
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
    // console.log(projID);
  }

  showVideo() {
    this.setState({
      showVideo: !this.state.showVideo
    });
  }

  showGallery() {
    this.setState({
      showGallery: !this.state.showGallery
    });
  }
  componentDidMount() {
    this.setProjId();
    this.countProjects();
  }

  render() {
    return (
      <div className="projBox">
        <Link
          to={{
            pathname: `/`
          }}
          className="mylink backBtn"
        >
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            className={`arrow_right ${this.state.navSlide &&
              "arrow_right_show"}`}
          />
        </Link>
        <div className="projContArrow">
          <div className="arrowCont">
            {this.state.projectId != 1 ? (
              <Link
                to={{
                  pathname: `/project/${parseInt(this.state.projectId) - 1}`
                }}
                className="mylink arrowBtn"
                onClick={this.changeProj}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={`arrow_right ${this.state.navSlide &&
                    "arrow_right_show"}`}
                />
                <h3 className="arrowText">Previous Project</h3>
              </Link>
            ) : null}
          </div>

          <div className="projCont">
            <div className="titleProj">
              <h1>{this.state.project.name}</h1>
              <h3>{this.state.project.description}</h3>
              {this.state.project.type === "web" ? (
                <a href={this.state.project.url} className="gotoProj">
                  <div className="btnProjText lineThrough">
                    Go to the website
                  </div>
                </a>
              ) : null}
              {this.state.project.video != null ? (
                <div className="gotoProj">
                  <div
                    className="btnProjText lineThrough"
                    onClick={this.showVideo}
                  >
                    {!this.state.showVideo ? "See the video" : "Hide the video"}
                  </div>
                </div>
              ) : null}
              {this.state.showVideo ? (
                <div className="reactPlayer">
                  <ReactPlayer url={this.state.project.video} playing />
                </div>
              ) : null}
            </div>
            <div className="imgContainer">
              {!this.state.imageLoaded && (
                <Spinner color="primary" className="imgSpinner" />
              )}
              <div className="immagine" onClick={this.showGallery}>
                <img
                  src={this.state.images[0]}
                  alt=""
                  onLoad={this.handleImageLoaded}
                  className="img1"
                />
              </div>
              {this.state.images[1] != null ? (
                <div className="immagine" onClick={this.showGallery}>
                  <img
                    src={this.state.images[1]}
                    alt=""
                    onLoad={this.handleImageLoaded}
                    className="img2"
                  />
                </div>
              ) : null}

              {this.state.showGallery ? (
                <div className="imgGalleryCont">
                  <div className="showGallery" onClick={this.showGallery}>
                    <FontAwesomeIcon
                      icon={faWindowClose}
                      className={`arrow_right ${this.state.navSlide &&
                        "arrow_right_show"}`}
                    />
                  </div>
                  <ImageGallery items={this.state.imagesForGallery} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="arrowCont">
            {this.state.projectId <= this.state.projectLenght - 1 ? (
              <Link
                to={{
                  pathname: `/project/${parseInt(this.state.projectId) + 1}`
                }}
                className="mylink arrowBtn"
                onClick={this.changeProj}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={`arrow_right ${this.state.navSlide &&
                    "arrow_right_show"}`}
                />
                <h3 className="arrowText">Next Project</h3>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
