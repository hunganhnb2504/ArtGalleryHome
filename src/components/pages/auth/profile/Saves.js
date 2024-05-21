import { useState, useMemo, useEffect, useCallback } from "react";
// import "../../../../css/bootstrap.css";
import { getAccessToken } from "../../../../utils/auth";
import { Link } from "react-router-dom";
import api from "../../../../services/api"
import url from "../../../../services/url"
import Swal from "sweetalert2";
import "../../../../css/saves.css";
function Saves() {
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
    } catch (error) { }
  };

  useEffect(() => {
    loadProfile();
  }, []);
  const [favorite, setFavorite] = useState([]);

  const userToken = getAccessToken();

  const config = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
  }, [userToken]);

  // Get favorite by user
  const loadFavorite = useCallback(async () => {
    try {
      const favoriteResponse = await api.get(url.FAVORITE.BY_USER, config);
      setFavorite(favoriteResponse.data);
    } catch (error) { }
  }, [config]);

  useEffect(() => {
    loadFavorite();
  }, [loadFavorite]);

  // Remove favorite
  const handleRemoveFavoriteItem = async (artWorkId) => {
    try {
      const isConfirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You want to remove it from your favorites list?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "I'm sure",
      });

      if (isConfirmed.isConfirmed) {
        const removeResponse = await api.delete(url.FAVORITE.REMOVE + `?id=${artWorkId}`, config);
        if (removeResponse.status === 200) {
          loadFavorite();
        }
      }

      setTimeout(() => {
      }, 2000);
    } catch (error) { }
  };
  return (
    <div  class="ko">
      {/* <link rel="stylesheet" href="assets/css/saves.css" /> */}

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

      <div class="container">
        <h1>Save Arwork</h1>
        <div class="artworks">
          {favorite.length > 0 ? (
            favorite.map((item, index) => (
              <div class="artwork">
                <Link to={`http://localhost:5000/artwork/${item.artWorkId}`}>
                  <img
                    src={item.artWorkImage}
                    alt="Painting Brush, 2018"
                  />
                </Link>
                <div style={{ display: "flex" }} class="artwork-details">
                  <div>
                    <p class="artwork-title">{item.artWorkName}</p>
                    <p>Villa Domus</p>
                    <p class="artwork-price">$5,000</p>
                  </div>
                  <div class="icon-container">
                    <button class="icon-button" onClick={() => handleRemoveFavoriteItem(item.id)}>
                    <i class="fa-solid fa-heart icon" id={item.id}></i>
                    </button>
                   
                  </div>
                </div>
              </div>
            ))
          )
            : (
              <div className="favorite-not">
                <img src="./assets/images/home/404.png" alt="Not Found" style={{ width: "100%" }} />
                <p>You don't have any Artwork in your favorites list yet.</p>
                <a class="custom-button back-button" href="/artwork">
                  <i class="far fa-reply"></i> Offer Artwork now
                </a>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Saves;
