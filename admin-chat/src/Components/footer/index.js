import React, { Fragment, PureComponent } from "react";

export default class Footer extends PureComponent {
  render() {
    return (
      <Fragment>
        {/* <!-- Footer --> */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2019</span>
            </div>
          </div>
        </footer>
        {/* <!-- End of Footer --> */}
      </Fragment>
    );
  }
}
