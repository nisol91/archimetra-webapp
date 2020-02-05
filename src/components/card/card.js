import React, { Component } from "react";
import "./card.scss";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import Project from "../project/project";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageLoaded: false,
      showProject: false
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  // showProject() {
  //   this.setState({
  //     showProject: !this.state.showProject
  //   });
  // }
  handleImageLoaded() {
    setTimeout(() => {
      this.setState({
        imageLoaded: true
      });
      // console.log(this.state.imageLoaded);
    }, 0);
  }
  componentDidMount() {}

  render() {
    return (
      <div className="cardCont">
        <div className="shape"></div>

        <div className="imgContainer">
          <Link
            to={{
              pathname: `/project/${this.props.datiPerCard.id}`,
              state: {
                name: this.props.datiPerCard.name,
                description: this.props.datiPerCard.description,
                img: this.props.datiPerCard.img
              }
            }}
            className="mylink"
          >
            <div className="show" onClick={this.showProject}>
              <h1 className="showText textCardColor">SHOW ME</h1>
            </div>
          </Link>
          {!this.state.imageLoaded && (
            <Spinner color="primary" className="imgSpinner" />
          )}
          <img
            className="projCardImg"
            src={this.props.datiPerCard.img[0]}
            alt=""
            onLoad={this.handleImageLoaded}
          />
        </div>

        {/* <h1 className="cardFont">{this.props.datiPerCard.id}</h1> */}
        {/* <h1 className="cardFont">{this.props.datiPerCard.project_date}</h1> */}
        {/* <h1 className="cardFont"> */}
        {/* {this.props.datiPerCard.project_description} */}
        {/* </h1> */}
      </div>
    );
  }
}
