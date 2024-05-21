import React from "react";
import { useState } from "react";
import "../../../../css/upload.css";

function Upload() {
  return (
    <div>
      {/* <link rel="stylesheet" href="assets/css/profile/upload.css" /> */}
<div className="upload-page">
      <div  class="container-upload_page">
        <div
          class="menu"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            class="menu-left d-flex align-items-center"
            style={{ width: "300px" }}
          >
            <p class="peeee">
              <a style={{ color: "#000" }} href="/new">
                Back
              </a>
            </p>
          </div>
          <div class="menu-right">
            <a href="#">
              <button class="btn-1">Upload Artwork</button>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div class="form-add_art">
        <h2>Add Artwork Details </h2>
        <div class="input-row">
          <input class="ttt" type="text" placeholder="Artist" />
          <input class="ttt" type="text" placeholder="Title" />
        </div>
        <div style={{ display: "flex" }} class="re">
          <p class="peeee" style={{ fontSize: "small" }}>
            *Required
          </p>
          <p class="peeee" style={{ fontSize: "small", marginLeft: "660px" }}>
            *Required
          </p>
        </div>

        <div class="input-row">
          <input class="ttt" type="text" placeholder="Medium" />
          <input class="ttt" type="text" placeholder="Year" />
        </div>
        <p class="peeee" style={{ fontSize: "small" }}>
          *Required
        </p>
        <div class="input-row">
          <input class="ttt" type="text" placeholder="Metarials" />
        </div>
        <div class="input-row">
          <input class="ttt" type="text" placeholder="Rarity" />
        </div>
        <div class="input-row">
          <input class="ttt" type="text" placeholder="Size" />
          <p className="suggest">Suggest:</p>
          <p className="suggest">4x6 inch (10x15cm)</p>
          <p className="suggest">5x7 inch (13x18cm)</p>
          <p className="suggest">8x10 inch (20x25cm)</p>
          <p className="suggest">11x14 inch (28x35cm)</p>
          <p className="suggest">16x20 inch (40x50cm)</p>
        </div>
        <div class="input-row">
          <input
            class="ttt"
            type="text"
            placeholder="Price Paid                                                                                                                                                                 $USD"
          />
        </div>
        <div class="input-row">
          <input class="ttt" type="text" placeholder="Provenance" />
          <input class="ttt" type="text" placeholder="City" />
        </div>
      </div>
      <p class="plo">Upload Photos</p>
      <div class="drag">
        <h2 className="draghh">Drag and drop photos here</h2>
        <p class="peeee">Files supported:JPG, PNG</p>
        <p class="peeee">Total maximum size: 30MB</p>
        <div class="menu-right">
          <a href="#">
            <button class="menu-right-button">Add Photo</button>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Upload;
