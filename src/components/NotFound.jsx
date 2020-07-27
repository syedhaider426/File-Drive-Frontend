import React from "react";

/* NotFound page is routed to when user goes to an invalid url */

const NotFound = () => {
  document.body.style.cursor = "default";
  return (
    <React.Fragment>
      <div className="container ">
        <div className="home-display ">
          <div className="col-sm-6 margin-center">
            <h1 className="text-center">Page Not Found</h1>
            <div className="text-center jumbotron ">
              <h2>Oops!</h2>
              <p>Visit our homepage to browse through our site</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;