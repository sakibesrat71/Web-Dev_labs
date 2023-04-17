import React from 'react';
import loaderImage from "../../assets/img/loader2.gif";

export default function ScreenLoaderImage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={loaderImage}
            alt="screenLoader"
            style={{ width: "100%", maxWidth: "1000px" }}
          />
          <figcaption style={{ marginTop: "1em", textAlign: "center" }}>
            &nbsp;&nbsp;&nbsp;LMS loading...
          </figcaption>
        </div>
      </div>
    </>
  );
}