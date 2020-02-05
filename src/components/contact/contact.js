import React, { Component } from "react";
import axios from "axios";
import "./contact.scss";
import { translate } from "react-i18next";
// import { Spinner, Alert } from "reactstrap";

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

  onDismiss() {
    this.setState({ visible: false });
  }
  componentDidMount() {}
  render() {
    const { t } = this.props;

    return (
      <div className="contact">
        <h1 className="contact2 tracking-in-expand">Stay in touch</h1>

        <h1 className="contact2 tracking-in-expand">inlandsis871@gmail.com</h1>
      </div>
    );
  }
}
// export default Contact;
export default translate()(Contact);
