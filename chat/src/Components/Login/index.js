import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logado: false,
      username: "",
      userChangeName: "",
      erromessage: false,
    };
  }

  userChangeNameUpDate = (e) => {
    const userChangeName = e.target.value;
    this.setState({ userChangeName });
  };

  loginIn = async () => {
    const { userChangeName } = this.state;
    if (userChangeName) {
      this.setState({ erromessage: false });
      const { fazerLogin } = this.props;
      const data = await fazerLogin(userChangeName);

      const { username, logado } = data;
      this.setState({ username, logado, userChangeName: "" });
    } else {
      this.setState({ erromessage: true });
    }
  };

  logout = () => {
    const { deslogar } = this.props;
    const data = deslogar();
    const { username, logado } = data;
    this.setState({ username, logado, userChangeName: "" });
  };

  formLogin = (userChangeName) => {
    const { erromessage } = this.state;
    return (
      <>
        <div className="form-group">
          <label className="label-title" htmlFor="usr">
            Nome:
          </label>
          <input
            type="text"
            value={userChangeName}
            onChange={this.userChangeNameUpDate}
            className="form-control"
            id="usr"
          />
          <span className="alert-msg">
            {erromessage ? "Porfavo Digite Seu Nome!" : null}
          </span>
        </div>
        <div className="form-group">
          <p onClick={this.loginIn} className="btn btn-primary">
            Fazer Login
          </p>
        </div>
      </>
    );
  };

  InforUser = (username) => {
    return (
      <div className="form-group">
        <label className="label-title" htmlFor="usr">
          Bem-vindo {username}
        </label>
        <div className="form-group">
          <p onClick={this.logout} className="btn btn-danger">
            Deslogar
          </p>
        </div>
      </div>
    );
  };

  render() {
    const { userChangeName, logado, username } = this.state;
    return (
      <div className="form">
        {logado === false
          ? this.formLogin(userChangeName)
          : this.InforUser(username)}
      </div>
    );
  }
}
