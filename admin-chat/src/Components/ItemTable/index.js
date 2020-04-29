import React from "react";
export default class ItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteMessage = this.deleteMessage.bind(this);
  }
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

  async deleteMessage() {
    const { deleteItem, item } = this.props;
    const { _id } = item;
    await deleteItem(_id);
  }

  render() {
    const { item } = this.props;
    const { _id, username, message, date } = item;
    return (
      <tr>
        <td>
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="p-2 bd-highlight">{_id}</div>
          </div>
        </td>
        <td>
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="p-2 bd-highlight">{username}</div>
          </div>
        </td>
        <td>
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="p-2 bd-highlight">{message}</div>
          </div>
        </td>
        <td>
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="p-2 bd-highlight">
              {this.getDate(date) + " " + this.getTime(date)}
            </div>
          </div>
        </td>
        <td>
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="p-2 bd-highlight">
              <button
                onClick={this.deleteMessage}
                type="button"
                className="btn btn-danger"
              >
                Deletar
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
