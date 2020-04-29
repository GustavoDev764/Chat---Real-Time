/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, PureComponent } from "react";
import { Link } from "react-router-dom";

import { RotasWeb } from "../../Router";

export default class ItemMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  componentDidMount() {}

  render() {
    const { dashboard } = this.props;

    return (
      <Fragment>
        <li className={`nav-item ${dashboard}`}>
          <Link className="nav-link" to={RotasWeb.dashboard}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Utilities Collapse Menu --> */}

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </Fragment>
    );
  }
}
