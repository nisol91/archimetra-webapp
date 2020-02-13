import React, { Component } from "react";
import "./team.scss";
import { translate } from "react-i18next";
import { db } from "../portfolio_single_page/portfolio_sp";

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: [],
      teamVisibility: false
    };
  }

  //get data only once the function is called
  // async fetchTeam() {
  //   await db
  //     .collection("team")
  //     .get()
  //     .then(querySnapshot => {
  //       const data = querySnapshot.docs.map(doc => doc.data());
  //       console.log(data);
  //       this.setState({ team: data });
  //       this.showTeam();
  //     });
  // }

  //fetch real time with listen to db changes
  async fetchTeamRealTime() {
    await db.collection("team").onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      // console.log(data);
      this.setState({ team: data });
      this.showTeam();
    });
  }

  showTeam() {
    setTimeout(() => {
      this.setState({
        teamVisibility: true
      });
    }, 200);
  }

  componentDidMount() {
    // this.fetchTeam();
    this.fetchTeamRealTime();
  }
  render() {
    const { t } = this.props;
    return (
      <div
        className={`boxTeam fade-in ${this.state.teamVisibility && "visible "}`}
      >
        <div className="teamcontainer">
          <h1 className="team1 text-flicker-in-glow">IL TEAM</h1>
          <div className="linearDiv"></div>

          <div className="fourPresentationDiv">
            {this.state.team.map((member, index) => (
              <React.Fragment key={index}>
                <div key={index} className="presentationDivTeam">
                  <div className="imgBox">
                    <div className="hoverDiv"></div>
                    <img className="memberImg" src={member.img} alt="" />
                  </div>
                  <h1 className="memberTitle">{member.name}</h1>
                  <div className="divisorio"></div>
                  <h1 className="memberDesc">{member.description}</h1>
                  <h1 className="memberStory">{member.story}</h1>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default translate()(Team);
