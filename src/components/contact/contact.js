import React, { Component } from "react";
import axios from "axios";
import "./contact.scss";
import { translate } from "react-i18next";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1Ijoibmlzb2w5MSIsImEiOiJjazBjaWRvbTIwMWpmM2hvMDhlYWhhZGV0In0.wyRaVw6FXdw6g3wp3t9FNQ";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      mailSent: false,
      error: null,
      formVisibility: true,
      visible: false,
      formShowEnter: true,
      mapVisibility: true,
      lng: 11,
      lat: 45,
      zoom: 10
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
  }
  render() {
    const { t } = this.props;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoibmlzb2w5MSIsImEiOiJjazBjaWRvbTIwMWpmM2hvMDhlYWhhZGV0In0.wyRaVw6FXdw6g3wp3t9FNQ";

    return (
      <div className="contact">
        <h1 className="contactTitle tracking-in-expand">CONTATTACI</h1>
        <div className="linearDivContacts tracking-in-expand"></div>
        <div className="contactBody">
          <div className="contactSx tracking-in-expand">
            <img
              className="contactImg"
              src="https://firebasestorage.googleapis.com/v0/b/archimetra-72c69.appspot.com/o/contactsimg.jpg?alt=media&token=e1bbe7e8-200a-49bf-a0b0-21cf91363147"
              alt=""
            />
            <h1 className="contactSubTitle">STUDIO ARCHIMETRA</h1>
            <div className="linearDivContacts"></div>
            <h1 className="contactText">via Gramsci 16, Ponte Taro, PR</h1>
            <h1 className="contactText">Email: tecnico@archimetrastudio.it</h1>
            <h1 className="contactText">Phone: 0521 618082</h1>
          </div>
          <div className="contactMap tracking-in-expand">
            <div
              ref={el => (this.mapContainer = el)}
              className="mapContainer"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
// export default Contact;
export default translate()(Contact);
