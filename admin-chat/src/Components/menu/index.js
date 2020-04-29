import React, { Fragment, PureComponent } from "react";

import ItemMenu from "../../Components/menu/item";
import "./menu.css";

export default class MenuSidebar extends PureComponent {
  render() {
    return (
      <Fragment>
        {/* <!-- Sidebar --> */}

        <ul
          className="navbar-nav navbar-nav-animation bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">
              SB Admin <sup>2</sup>
            </div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <ItemMenu {...this.props} />
        </ul>
        {/* <!-- End of Sidebar --> */}
      </Fragment>
    );
  }
}
