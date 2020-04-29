/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, PureComponent } from "react";

import BodyLogin from "../../Components/login/bodylogin";
import FormLogin from "../../Components/login/formlogin";

export default class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    document.title = "Login";
    document.body.className = "bg-gradient-primary";
  }

  fazerlogin = async (email, pwd) => {
    const { authe } = this.props;
    return await authe(email, pwd);
  };

  render() {
    return (
      <Fragment>
        <BodyLogin>
          {/* <!-- Nested Row within Card Body --> */}
          <div className="row">
            {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}

            <div className="col-lg-12">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Acesso Restrito</h1>

                  <h6 className="h6 text-gray-900 mb-4">
                    Somente Pessoas Autorizada
                  </h6>
                </div>

                <FormLogin authe={this.fazerlogin} />

                <hr />

                <div className="text-center">
                  <a
                    target="_blank"
                    href="http://localhost:4000/creatUserRandom"
                  >
                    Clike aqui para Cria Conta
                  </a>
                  {/* <Link className="small" to={RotasWeb.forgotpassword}>
                    Esqueceu a senha?
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Nested Row within Card Body -->  */}
        </BodyLogin>
      </Fragment>
    );
  }
}
