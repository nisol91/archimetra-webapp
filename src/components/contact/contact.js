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
      lng: 10.209674,
      lat: 44.826727,
      zoom: 15
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
    var geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [10.209674, 44.826727]
          },
          properties: {
            title: "Mapbox",
            description: "Washington, D.C."
          }
        }
      ]
    };
    // add markers to map
    geojson.features.forEach(function(marker) {
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });
  }
  render() {
    const { t } = this.props;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoibmlzb2w5MSIsImEiOiJjazBjaWRvbTIwMWpmM2hvMDhlYWhhZGV0In0.wyRaVw6FXdw6g3wp3t9FNQ";

    return (
      <div className="contact">
        <div className="linearDivContacts tracking-in-expand"></div>
        <h1 className="contactTitle tracking-in-expand">CONTATTACI</h1>
        <div className="contactBody">
          <div className="contactSx tracking-in-expand">
            <h1 className="contactSubTitle">STUDIO ARCHIMETRA</h1>
            <div className="linearDivContactsII"></div>
            <h1 className="contactText">via Gramsci 16, Ponte Taro, PR</h1>
            <h1 className="contactText">Email: tecnico@archimetrastudio.it</h1>
            <h1 className="contactText">Phone: 0521 618082</h1>
            <img
              className="contactImg"
              src="https://firebasestorage.googleapis.com/v0/b/archimetra-72c69.appspot.com/o/contactsimg.jpg?alt=media&token=e1bbe7e8-200a-49bf-a0b0-21cf91363147"
              alt=""
            />
          </div>
          <div className="contactMap tracking-in-expand">
            <div
              ref={el => (this.mapContainer = el)}
              className="mapContainer tracking-in-expand"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
// export default Contact;
export default translate()(Contact);
