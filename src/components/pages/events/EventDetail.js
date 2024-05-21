import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../css/eDetail.css";
import api from "../../../services/api";
import url from "../../../services/url";
import "../../../css/eDetail.css";

function EventDetail() {
  const [activePanel, setActivePanel] = useState("overview");
  const sliderRef1 = useRef(null);

  useEffect(() => {
    if (sliderRef1.current) {
      sliderRef1.current.slickNext();
      sliderRef1.current.slickPrev();
    }
  }, []);

  const goToNext1 = () => {
    sliderRef1.current.slickNext();
  };

  const goToPrev1 = () => {
    sliderRef1.current.slickPrev();
  };

  const handlePanelClick = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div className="eventDetail-page">
      <div className="header-eventDetail_page">
        <div className="img-eventDetail">
          <img src="assets/images/arts/art-s1.png" alt="Event" />
        </div>
        <div className="info-eventDetail">
          <div className="image-profile_eDetail">
            <img src="assets/images/artists/artist1.webp" alt="Artist" />
          </div>
          <div className="other-info">
            <h2 className="name-eDetail">FOCUS Art Fair New York 2024</h2>
            <h3 className="time-eDetail">May 2 – 31, 2024</h3>
          </div>
        </div>
      </div>
      <div className="main-eventDetail_page">
        <div className="titles">
          <div
            className={`title ${activePanel === "overview" ? "active" : ""}`}
            onClick={() => handlePanelClick("overview")}
          >
            Overview
          </div>
          <div
            className={`title ${activePanel === "artworks" ? "active" : ""}`}
            onClick={() => handlePanelClick("artworks")}
          >
            Artworks
          </div>
        </div>
        <div className="content">
          {activePanel === "overview" && (
            <div className="panel">
          
              <div className="content-eDetail">
                <div className="countdown-time">Close In:</div>
                <div className="about-eDetail">
                  FOCUS is committed to pioneering a novel paradigm in the art
                  fair landscape, one that echoes the values and aspirations of
                  artists dedicated to fostering a planet founded on Love,
                  Equality, Sustainability, and Quality. Our mission is to
                  cultivate an inclusive platform where artists from both
                  physical and digital realms converge, transcending
                  medium-specific distinctions. At FOCUS, we champion the
                  narrative behind artists' intentions, … Read more
                </div>
              </div>
              <div className="booths-eDetail">
               <h2 className="booth-title">Booths</h2>
                <div className="carousel-controls">
                  <i className="fa-solid fa-angle-left" onClick={goToPrev1}></i>
                  <i
                    className="fa-solid fa-angle-right"
                    onClick={goToNext1}
                  ></i>
                </div>
                <div className="content-section_home">
                  <Slider
                    ref={sliderRef1}
                    className="multiple-items1"
                    infinite={true}
                    slidesToShow={4}
                    slidesToScroll={3}
                  >
                    <div className="card-art_home">
                      <a>
                        <img src="assets/images/arts/art1.jpeg" alt="Image 1" />
                        <h2 className="name-artist_carousel">
                          Gordian Knot Wood
                        </h2>
                        <h2 className="exhibition">Perfomer, 2024</h2>
                        <span className="price-art_carousel">
                          $10,000-$35,000
                        </span>
                      </a>
                      <a className="button_add-product">Purchase</a>
                    </div>
                    <div className="card-art_home">
                      <a>
                        <img src="assets/images/arts/art2.jpeg" alt="Image 2" />
                        <h2 className="name-artist_carousel">
                          Gordian Knot Wood
                        </h2>
                        <h2 className="exhibition">Perfomer, 2024</h2>
                        <span className="price-art_carousel">
                          $10,000-$35,000
                        </span>
                      </a>
                      <a className="button_add-product">Purchase</a>
                    </div>
                    <div className="card-art_home">
                      <a>
                        <img src="assets/images/arts/art3.jpeg" alt="Image 3" />
                        <h2 className="name-artist_carousel">
                          Gordian Knot Wood
                        </h2>
                        <h2 className="exhibition">Perfomer, 2024</h2>
                        <span className="price-art_carousel">
                          $10,000-$35,000
                        </span>
                      </a>
                      <a className="button_add-product">Purchase</a>
                    </div>
                    <div className="card-art_home">
                      <a>
                        <img src="assets/images/arts/art4.jpeg" alt="Image 4" />
                        <h2 className="name-artist_carousel">
                          Gordian Knot Wood
                        </h2>
                        <h2 className="exhibition">Perfomer, 2024</h2>
                        <span className="price-art_carousel">
                          $10,000-$35,000
                        </span>
                      </a>
                      <a className="button_add-product">Purchase</a>
                    </div>
                    <div className="card-art_home">
                      <a>
                        <img src="assets/images/arts/art5.jpeg" alt="Image 5" />
                        <h2 className="name-artist_carousel">
                          Gordian Knot Wood
                        </h2>
                        <h2 className="exhibition">Perfomer, 2024</h2>
                        <span className="price-art_carousel">
                          $10,000-$35,000
                        </span>
                      </a>
                      <a className="button_add-product">Purchase</a>
                    </div>
                    <div className="card-art_home">
                      <a>
                        <img src="assets/images/arts/art6.jpeg" alt="Image 6" />
                        <h2 className="name-artist_carousel">
                          Gordian Knot Wood
                        </h2>
                        <h2 className="exhibition">Perfomer, 2024</h2>
                        <span className="price-art_carousel">
                          $10,000-$35,000
                        </span>
                      </a>
                      <a className="button_add-product">Purchase</a>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          )}
          {activePanel === "artworks" && (
            <div className="panel">
              <div className="ListArt_page">
                
                <div id="artworks-container" className="content-section">
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a href="/artworkDetail">
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a>
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a>
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                  <div className="card-art_home">
                    <a>
                      <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                      <h2 className="name-artist_carousel">
                        Gordian Knot Wood
                      </h2>
                      <h2 className="exhibition">Perfomer, 2024</h2>
                      <span className="price-art_carousel">
                        $10,000-$35,000
                      </span>
                    </a>
                    <a className="button_add-product">Purchase</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
