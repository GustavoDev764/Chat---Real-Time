/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, PureComponent } from "react";
import { Link } from "react-router-dom";

import { RotasWeb } from "../../Router";

export default class NavHead extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  getLocalStorage = () => {
    if (typeof Storage !== "undefined") {
      return localStorage.getItem("authAdmin");
    }
  };

  getName = () => {
    const data = JSON.parse(this.getLocalStorage());
    if (data) {
      const { email } = data[0];

      if (email) {
        return email;
      }
    }
  };

  resetLocalStorage = () => {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  render() {
    return (
      <Fragment>
        {/* <!-- Topbar --> */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block"></div>

            {/* <!-- Nav Item - User Information --> */}
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {this.getName()}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                />
              </a>
              {/* <!-- Dropdown - User Information --> */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <div className="dropdown-divider"></div>

                <p onClick={this.resetLocalStorage}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </p>
              </div>
            </li>
          </ul>
        </nav>
        {/* <!-- End of Topbar --> */}
      </Fragment>
    );
  }
}
