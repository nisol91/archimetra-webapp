import React, { Component } from "react";
import axios from "axios";
import "./partners.scss";
import { translate } from "react-i18next";
import firebaseLogo from "../../img/firebase_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedinIn,
  faReact
} from "@fortawesome/free-brands-svg-icons";
class Partners extends Component {
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

    return <div className="partners">PARTNERS</div>;
  }
}
// export default Contact;
export default translate()(Partners);
