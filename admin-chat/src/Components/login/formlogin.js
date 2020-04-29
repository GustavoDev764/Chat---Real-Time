import React, { Fragment, PureComponent } from "react";

export default class FormLogin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
    };
  }

  onChangerFazerLogin = async () => {
    const { email, password } = this.state;
    const { authe } = this.props;
    const response = await authe(email, password);
    const { msg } = response;
    if (msg) {
      this.setState({ msg });
    }
  };

  onChangerEmail = (e) => {
    const email = e.target.value;
    this.setState({ email });
  };
  onChangerPassword = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };

  render() {
    const { email, password, msg } = this.state;
    return (
      <Fragment>
        <form action="home" method="POST" className="user">
          {msg !== "" ? (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{msg}</strong>
            </div>
          ) : null}

          <div className="form-group">
            <input
              type="email"
              onChange={this.onChangerEmail}
              className="form-control form-control-user"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              onChange={this.onChangerPassword}
              className="form-control form-control-user"
              id="exampleInputPassword"
              placeholder="Digite sua senha"
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox small">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck"
              />
              <label className="custom-control-label" htmlFor="customCheck">
                Lembre de mim
              </label>
            </div>
          </div>

          <p
            onClick={this.onChangerFazerLogin}
            className="btn btn-primary btn-user btn-block"
          >
            Login
          </p>
        </form>
      </Fragment>
    );
  }
}
