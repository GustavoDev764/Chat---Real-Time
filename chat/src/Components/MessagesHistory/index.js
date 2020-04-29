import React from "react";

export default class MessagesHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
    };
  }

  isMe = (user1, user2) => {
    if (user1 === user2) {
      return true;
    }
    return false;
  };

  getTime = (timems) => {
    timems = parseInt(timems);
    let time = new Date(timems);
    return time.toLocaleTimeString();
  };

  getDate = (timems) => {
    timems = parseInt(timems);
    let time = new Date(timems);
    return time.toLocaleDateString();
  };

  render() {
    const { userlogado } = this.props;
    return []
      .concat(this.props.messages)
      .reverse()
      .map((item, index) => {
        const { username, text, date, id } = item;
        let Message = this.isMe(username, userlogado);
        if (Message) {
          return (
            <div className={"message me"} key={id}>
              <div className="d-flex flex-column mb-3">
                <div className="p-2 bg-info">
                  <label className="name-user">{username}</label>
                </div>
                <div className="p-2 bg-warning">
                  <div className="message-body">{text}</div>
                </div>
                <div className="p-2 bg-primary">
                  <label className="date-msg">{this.getDate(date)}</label>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className={"message"} key={id}>
              <div className="d-flex flex-column mb-3">
                <div className="p-2 bg-info">
                  <label className="name-user">{username}</label>
                </div>
                <div className="p-2 bg-warning">
                  <div className="message-body">{text}</div>
                </div>
                <div className="p-2 bg-primary">
                  <label className="date-msg">{this.getDate(date)}</label>
                </div>
              </div>
            </div>
          );
        }
      });
  }
}
