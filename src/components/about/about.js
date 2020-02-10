import React, { Component } from "react";
import "./about.scss";
import { translate } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShapes,
  faRulerCombined
} from "@fortawesome/free-solid-svg-icons";

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
          <h1 className="about1 text-flicker-in-glow">LO STUDIO</h1>
          <div className="dottedDiv"></div>
          <h1 className="about2 swing-in-top-fwd">
            Lo studio è stato fondato nel marzo 2010 dall’ARCHItetto Caterina
            Carboni e dal GeoMETRA Fabio Agosti. Provenienti da esperienze
            professionali diverse, decidono di unire le forze per fornire un
            servizio completo ed unico al cliente.
          </h1>
          <div className="threePresentationDiv">
            <div className="presentationDiv">
              <div className="iconContainer">
                <FontAwesomeIcon icon={faShapes} className="aboutIcon" />
              </div>
              <h1 className="about3 swing-in-top-fwd">ARCHITETTI</h1>
              <h1 className="about4 swing-in-top-fwd">
                Progettazione architettonica e direzione lavori
              </h1>
            </div>
            <div className="presentationDiv">
              <div className="iconContainer">
                <FontAwesomeIcon icon={faHome} className="aboutIcon" />
              </div>
              <h1 className="about3 swing-in-top-fwd">DESIGNERS</h1>
              <h1 className="about4 swing-in-top-fwd">
                Interior Design e product Design
              </h1>
            </div>
            <div className="presentationDiv">
              <div className="iconContainer">
                <FontAwesomeIcon icon={faRulerCombined} className="aboutIcon" />
              </div>
              <h1 className="about3 swing-in-top-fwd">GEOMETRI</h1>
              <h1 className="about4 swing-in-top-fwd">
                Pratiche catastali, Sicurezza in fase di progetto e di
                esecuzione, Rilievi ed elaborazioni grafiche
              </h1>
            </div>
          </div>
        </div>
        <div
          className={`fade-in ${this.state.cubeVisibility && "visible"}`}
        ></div>
      </div>
    );
  }
}
export default translate()(About);
