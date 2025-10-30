import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", margin: "50px" }}>
        <div className="loader"></div>
        <p>Loading...</p>
        <style>
          {`
            .loader {
              border: 6px solid #f3f3f3;
              border-top: 6px solid #3498db;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }
}
