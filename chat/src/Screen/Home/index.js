import React from "react";

import MessagesHistory from "../../Components/MessagesHistory";
import Login from "../../Components/Login";
import api from "../../services/api";
import {
  connect,
  disconnect,
  subscribeToNewMessage,
} from "../../services/socket";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      username: "",
      logado: false,
      blockButton: false,
      messages: [],
    };
  }

  disabledButtonSend = () => {
    this.setState({ blockButton: true });
  };

  enabledButtonSend = () => {
    this.setState({ blockButton: false });
  };

  setupWebSocket = (data = []) => {
    connect(data);
  };

  iCanSendMessage = () => {
    const { username, logado } = this.state;
    if (username !== "" && username !== null && logado === true) {
      return true;
    }
    return false;
  };

  msgUpDate = (e) => {
    const msg = e.target.value;
    this.setState({ msg });
  };

  getNextIdMessages = () => {
    const { messages } = this.state;
    const nextItem = messages.length + 1;
    return nextItem;
  };

  validateMessageReceived = (idbd) => {
    const { messages } = this.state;
    let isHas = false;
    if (messages) {
      // eslint-disable-next-line array-callback-return
      messages.map((item, index) => {
        if (item.idbd === idbd) {
          isHas = true;
        }
      });
    }
    return isHas;
  };

  addMessageOtheUser = (dados) => {
    const { _id, username, message, date } = dados;
    // console.log(dados);
    const useLogado = this.state.username;
    if (username !== useLogado && this.validateMessageReceived(_id) === false) {
      const newItem = {
        idbd: _id,
        id: this.getNextIdMessages(),
        text: message,
        username: username,
        date: date,
      };

      this.setState({ messages: this.state.messages.concat(newItem) });
    }
  };

  addMessage = async () => {
    const { msg, username } = this.state;
    if (this.iCanSendMessage()) {
      if (msg) {
        this.disabledButtonSend();
        const date = Date.now();
        const response = await api.post("/messages", {
          username,
          message: msg,
          date,
        });

        const { data } = response;
        const { _id } = data;

        const newItem = {
          idbd: _id,
          id: this.getNextIdMessages(),
          text: msg,
          username: username,
          date: date,
        };

        this.setState({
          msg: "",
          messages: this.state.messages.concat(newItem),
        });

        this.enabledButtonSend();

        await subscribeToNewMessage((dados) => {
          setTimeout(this.addMessageOtheUser(dados), 3000);
        });
      } else {
        alert("Por Favor Insira Um Texto");
      }
    } else {
      alert("Por Favor Fassa o Login");
    }
  };

  setLocalStorage = (username, logado) => {
    if (typeof Storage !== "undefined") {
      let auth = [
        {
          username,
          logado,
        },
      ];
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  };

  getLocalStorage = () => {
    if (typeof Storage !== "undefined") {
      return localStorage.getItem("auth");
    }
  };

  resetLocalStorage = () => {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
    }
  };

  deslogar = () => {
    this.resetLocalStorage();
    this.setState({ username: "", logado: false });
    disconnect();
    return { username: "", logado: false };
  };

  fazerLogin = async (username) => {
    if (username) {
      this.setLocalStorage(username, true);
      this.setState({ username: username, logado: true });

      //fazer conexao com sokect
      this.setupWebSocket({ username: username });
      await subscribeToNewMessage((dados) => {
        setTimeout(this.addMessageOtheUser(dados), 3000);
      });

      return {
        username,
        logado: true,
      };
    }

    return this.deslogar();
  };

  render() {
    const { messages, username, blockButton } = this.state;
    return (
      <div className="app">
        <div className="contact-list">
          <h1 className="title">Chat</h1>
          <Login fazerLogin={this.fazerLogin} deslogar={this.deslogar} />
        </div>
        <div className="messages">
          <div className="messages-history" id={"messages"}>
            <MessagesHistory userlogado={username} messages={messages} />
          </div>
          <div className="messages-inputs">
            <input
              type="text"
              placeholder="Envie uma mensagem"
              value={this.state.msg}
              onChange={this.msgUpDate}
            />
            <button disabled={blockButton} onClick={this.addMessage}>
              <i className="material-icons">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
