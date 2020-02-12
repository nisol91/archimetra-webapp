import React, { Component } from "react";
import axios from "axios";
import "./footer.scss";
import { translate } from "react-i18next";
import firebaseLogo from "../../img/firebase_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faFacebookF } from "@fortawesome/free-brands-svg-icons";
class Footer extends Component {
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

    return (
      <div className="footer">
        <div className="iconsContainer">
          <a
            href="https://it-it.facebook.com/Archimetra/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} className="socialIcon" />
          </a>
        </div>
        <div className="iconsContainer">
          <h5 className="footerText">App made with</h5>
          <FontAwesomeIcon icon={faReact} className="reactIcon" />
          <h5 className="footerText">and</h5>
          <img class="imgFooter" src={firebaseLogo} alt="" />
        </div>
        <div className="iconsContainer">
          <h5 className="footerText">Brewed by</h5>
          <a
            className="nsLink"
            href="https://nszdeveloper.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            nszdev
          </a>
        </div>
      </div>
    );
  }
}
// export default Contact;
export default translate()(Footer);
