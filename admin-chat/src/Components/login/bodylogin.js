import React, { Fragment, PureComponent } from "react";

export default class BodyLogin extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">{this.props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
