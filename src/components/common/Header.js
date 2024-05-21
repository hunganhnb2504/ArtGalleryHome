import React, { useState, useEffect, useCallback, useRef } from "react";
import { isLoggedIn, removeAccessToken } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import "../../css/header.css";
import "../../css/dropdown.css";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeAccessToken();
    navigate("/");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ artists: [], artworks: [] });
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const fetchResults = async (term) => {
    if (term.trim() === "") {
      setResults({ artists: [], artworks: [] });
      return;
    }

    try {
      const [artistsResponse, artworksResponse] = await Promise.all([
        fetch(`https://localhost:7270/api/Artists?search=${term}`),
        fetch(`https://localhost:7270/api/ArtWorks?search=${term}`),
      ]);

      if (!artistsResponse.ok || !artworksResponse.ok) {
        throw new Error("Error fetching search results");
      }

      const artists = await artistsResponse.json();
      const artworks = await artworksResponse.json();

      setResults({ artists, artworks });
      setError(null);
    } catch (error) {
      setError("Error fetching search results");
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedFetchResults = useCallback(_.debounce(fetchResults, 300), []);

  useEffect(() => {
    debouncedFetchResults(searchTerm);
    // Cancel the debounce on useEffect cleanup.
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [searchTerm, debouncedFetchResults]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() !== "") {
      setShowResults(true); // Hiển thị kết quả khi có kí tự nhập vào
      setSearchClicked(true); // Đánh dấu rằng ô tìm kiếm đã được nhấn
    } else {
      setShowResults(false); // Ẩn kết quả khi không có kí tự nào nhập vào
      setSearchClicked(false); // Đánh dấu rằng ô tìm kiếm đã không được nhấn
    }
    // Thêm logic tìm kiếm ở đây
  };

  useEffect(() => {
    // Bắt sự kiện click trên body để ẩn kết quả tìm kiếm
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".search-section")) {
        setShowResults(false);
        setSearchClicked(false); // Đặt lại trạng thái của ô tìm kiếm khi người dùng nhấp ra ngoài
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <header className="ct-header">
        <div className="ct-header__wrapper">
          <div className="ct-header__toolbar">
            <div className="socialWidget">
              <p>
                <a href="#">
                  <i className="far fa-fw fa-facebook fab fa-lg"></i>
                </a>
                <a
                  href="#"
                  target="_self"
                  className="nice-scroll"
                  rel="noopener"
                >
                  <i className="far fa-fw fa-twitter fab fa-lg"></i>
                </a>
                <a
                  href="#"
                  target="_self"
                  className="nice-scroll"
                  rel="noopener"
                >
                  <i className="far fa-fw fa-instagram fab fa-lg"></i>
                </a>
                <a
                  href="#"
                  target="_self"
                  className="nice-scroll"
                  rel="noopener"
                >
                  <i className="far fa-fw fa-pinterest fab fa-lg"></i>
                </a>
              </p>
            </div>

            <div className="search-section" ref={searchContainerRef}>
              <form id="search-box" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  id="search-text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onClick={() => setSearchClicked(true)}
                />
                <button type="submit" id="search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              {/* Phần kết quả tìm kiếm */}
              {showResults && (
                <div
                  id="search-results"
                  className={
                    results.artists.length > 0 || results.artworks.length > 0
                      ? "active"
                      : ""
                  }
                >
                  <div className="list-result_section">
                    <div className="search-results_section">
                      <h2 id="artist-result_h2">Artist </h2>
                      <ul>
                        {results.artists.map((artist) => (
                          <Link to={`/artist/${artist.id}`}>
                            <li key={artist.id}>{artist.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                    <div className="search-results_section">
                      <h2 id="art-result_h2">Artwork </h2>
                      <ul>
                        {results.artworks.map((artwork) => (
                          <Link to={`/artwork/${artwork.id}`}>
                            <li key={artwork.id}>{artwork.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn() ? (
              <div className="dropdown">
                <button className="dropbtn">
                  <i className="fa-solid fa-user"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">
                    <i className="fa-regular fa-image"></i> Profile
                  </Link>
                  <a onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Log
                    out
                  </a>
                </div>
              </div>
            ) : (
              <div className="login-area">
                <a className="loginButton" href="/login">
                  Login
                </a>
                <a className="registerButton" href="/register">
                  Register
                </a>
              </div>
            )}
          </div>

          <div className="container-fluid-head" style={{ paddingLeft: "55px" }}>
            <div className="ct-header__logo-nav" style={{ paddingTop: "30px" }}>
              <Link to="/" className="ct-logo">
                <img
                  className="ct-logo__image"
                  src="assets/images/home/logo.png"
                  alt="Art Gallery"
                />
              </Link>

              <div id="ct-main-nav">
                <input
                  type="checkbox"
                  hidden
                  id="ct-main-nav__toggle-navigation-main"
                />
                <nav id="ct-main-nav__wrapper">
                  <ul id="menu-menu" className="ct-main-navigation">
                    <li
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-114"
                      id="menu-item-114"
                    >
                      <Link to="/artwork">
                        Artworks<i className="fa-solid fa-angle-down"></i>
                      </Link>
                      {/* <ul className="sub-menu" id="sub-menu_artworks">
                        <div className="sub-menu_item">
                          Price
                          <a href="#">Find Under $1,000</a>
                          <a href="#">Find Under $5,000</a>
                          <a href="#">Find Under $10,000</a>
                        </div>
                        <div className="sub-menu_item">
                          Curators’ Picks
                          <a href="#">Contemporary Abstraction</a>
                          <a href="#">Top Auction Lots</a>
                          <a href="#">Best of Prints & Editions</a>
                        </div>
                        <div className="sub-menu_item">
                          Categories
                          <a href="#">Contemporary Art</a>
                          <a href="#">Emerging Art</a>
                          <a href="#">Street Art</a>
                          <a href="#">Abstract Art</a>
                          <a href="#">Pop Art</a>
                          <a href="#">Minimalism</a>
                          <a href="#">Impressionist and Modern Art</a>
                        </div>
                        <div className="sub-menu_item">
                          Mediums
                          <a href="#">Painting</a>
                          <a href="#">Prints</a>
                          <a href="#">Works on Paper</a>
                          <a href="#">Photography</a>
                          <a href="#">Sculpture</a>
                          <a href="#">Ceramics</a>
                          <a href="#">Design</a>
                          <a href="#">NFTs</a>
                        </div>
                      </ul> */}
                    </li>
                    <li
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-176"
                      id="menu-item-176"
                    >
                      <Link to="/Artists">Artists</Link>
                    </li>
                    <li
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-113"
                      id="menu-item-113"
                    >
                      <Link to="/event">Events</Link>
                    </li>
                    <li
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-109"
                      id="menu-item-109"
                    >
                      <Link to="/about">About Us</Link>
                    </li>
                    <li
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"
                      id="menu-item-112"
                    >
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;