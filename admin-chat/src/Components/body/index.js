import React, { Fragment, PureComponent } from "react";

import Footer from "../footer";
import NavHead from "../navhead";

export default class Body extends PureComponent {
  render() {
    const { titlePage } = this.props;

    return (
      <Fragment>
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            <NavHead {...this.props} />

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- Page Heading --> */}
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{titlePage}</h1>
              </div>

              {/* <!-- Content Row --> */}
              <div className="column">{this.props.children}</div>
              {/* <!-- Content Row --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

          <Footer />
        </div>
        {/* <!-- End of Main Content --> */}
      </Fragment>
    );
  }
}
