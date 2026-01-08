import React from "react";

function People() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className=" text-center">Company</h1>
      </div>
      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-5 p-5  text-center mt-4">
          <img
            src="images\logos\Long_logo.png"
            style={{ border: "2px solid black" , width: "80%" }} className="p-4"
          />
        </div>
        <div className="col-7 p-5">
          <p>
            We are a forward-looking civic technology startup passionate about
            connecting rural and urban communities through smart digital
            solutions. From local governance tools to AI-driven rural
            automation, we aim to build technology that improves lives and
            enhances access for everyone.
          </p>
          <p>
            At our core, we believe innovation should be inclusive — accessible
            to small businesses, farmers, and community leaders just as much as
            large enterprises.
          </p>
          <p>
            Connect on{" "}
            <a href="" style={{ textDecoration: "none" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "none" }}>
              Linkedin
            </a>{" "}
            /{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default People;
