import React, { Component } from "react";
import axios from "axios";
import { Spinner, Alert } from "reactstrap";
import "./contact.scss";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { translate } from "react-i18next";

const API_PATH = "http://localhost:4040/form/add";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoibmlzb2w5MSIsImEiOiJjazBjaWRvbTIwMWpmM2hvMDhlYWhhZGV0In0.wyRaVw6FXdw6g3wp3t9FNQ"
});

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
      mapVisibility: true
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${API_PATH}`,
      headers: { "content-type": "application/json" },
      data: this.state
    })
      .then(result => {
        this.setState({
          name: "",
          email: "",
          message: "",
          formVisibility: false,
          mapVisibility: false
        });

        this.onDismiss = this.onDismiss.bind(this);
      })
      .catch(error => this.setState({ error: error.message }));

    setTimeout(() => {
      this.setState({
        mailSent: true,
        formVisibility: true,
        visible: true,
        mapVisibility: true
      });
    }, 1000);
  };
  onDismiss() {
    this.setState({ visible: false });
  }
  componentDidMount() {}
  render() {
    const { t } = this.props;

    return (
      <div style={{ marginTop: 10 }}>
        {this.state.formVisibility === false && (
          <div className="charger_container">
            <Spinner
              color="primary"
              className={`App contactSpinner ${!this.state.formVisibility &&
                "showed"}`}
            />
            <h1>{t("sending")}</h1>
          </div>
        )}
        <div className={`App ${this.state.formVisibility && "showed"}`}>
          <div>
            {this.state.mailSent && (
              <Alert
                color="success"
                isOpen={this.state.visible}
                toggle={this.onDismiss}
              >
                {t("msg_sent")}
              </Alert>
            )}
          </div>
          <h1 className="contact2 tracking-in-expand">{t("contact_form")}</h1>

          <div
            className={`bounce-in-top  ${this.state.formShowEnter &&
              "visible"}`}
          >
            <form>
              <label>First Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name.."
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />

              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />

              <label>Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write something.."
                onChange={e => this.setState({ message: e.target.value })}
                value={this.state.message}
              ></textarea>
              <input
                type="submit"
                value="Submit"
                onClick={this.handleFormSubmit}
              />
            </form>
          </div>
        </div>
        {this.state.mapVisibility === true && (
          <Map
            // eslint-disable-next-line
            style="mapbox://styles/nisol91/ck0cimiej4lt91cljcimh64p5"
            containerStyle={{
              height: "400px",
              width: "85%",
              margin: "30px auto"
            }}
            className={`bounce-in-top  ${this.state.formShowEnter &&
              "visible"}`}
            center={[10.3, 44.8]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}
            >
              <Feature coordinates={[44.481747846041145, 16.3233379650232]} />
            </Layer>
          </Map>
        )}
      </div>
    );
  }
}
// export default Contact;
export default translate()(Contact);
