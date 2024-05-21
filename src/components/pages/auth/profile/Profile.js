import { useState, useMemo,useEffect, useCallback } from "react";
import "../../../../css/profile.css"
import "../../../../css/bootstrap.css"
import { getAccessToken } from "../../../../utils/auth";
import { Link } from "react-router-dom";
import api from "../../../../services/api"
import url from "../../../../services/url"
function Profile() {


  const [info, setInfo] = useState("");
  const loadProfile = async () => {
    const userToken = getAccessToken();

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };

        const profileResponse = await api.get(url.AUTH.PROFILE, config);
        setInfo(profileResponse.data);
    } catch (error) {}
};

useEffect(() => {
    loadProfile();
}, []);

  return (
    <div class="ko">
      <div  class="haho">
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
            <img
              className="igh"
              src="./assets/images/home/4.jpeg"
              alt=""
              style={{ borderRadius: "50%", width: "100px" }}
            />
            <div class="menu-left-right ml-3">
              <h3>{info.fullname}</h3>
              <p className="poi" style={{ color: "#707070" }}>
                Member since 2024
              </p>
            </div>
          </div>
          <div class="menu-right">
            <Link to={`/edit-profile`}>
            <a>
              <button class="btn-1">Settings</button>
            </a>
            </Link>
          </div>
        </div>
        <div class="menu-bottom">
          {/* <p className="poi">{info.fullname}</p> */}
          <p className="poi" style={{ color: "#707070", margin:"20px 0 0 10px" }}>
            <i class="fa-solid fa-location-dot"></i> VietNam
          </p>
        </div>
        <div class="navbar">
          <nav class="navbar navbar-expand-lg navbar-light w-100">
            <div class="container-fluid">
              <div
                class="collapse navbar-collapse nav-fill"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav w-100 justify-content-between">
                  <li class="nav-item">
                    <a
                      style={{ color: "#000" }}
                      class="nav-link"
                      href="/profile"
                    >
                      Profile
                    </a>
                  </li>
                  <li class="nav-item">
                  <Link to={`/artwork-saves`}>
                    <a class="nav-link">
                      Saves
                    </a>
                    </Link>
                  </li>
                  <li class="nav-item">
                  <Link to={`/artist-follow`}>
                    <a class="nav-link">
                      Follows
                    </a>
                    </Link>
                  </li>
                  <li class="nav-item">
                  <Link to={`/setting`}>
                    <a class="nav-link">
                      Password Setting
                    </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <hr />
        </div>
        <section class="hero">
          <div class="containers">
            <div class="hero-content">
              <h2 className="cto">Do you want to become our artist to get many benefits?</h2>
              <p className="poi">
              Click below to update artist details.
              </p>
              <Link to={`/register-artist`}>
              <a>
                <button class="cta-button">Become Artist</button>
              </a>
              </Link>
            </div>
            <div class="hero-image">
              <img
                className="igh"
                src="./assets/images/home/4.jpeg"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
