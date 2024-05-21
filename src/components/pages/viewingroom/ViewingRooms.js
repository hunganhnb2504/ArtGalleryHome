import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function ViewingRooms() {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      sliderRef.current.slickPrev();
    }
  }, []);

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div>
      <link rel="stylesheet" href="assets/css/view.css" />

      <div className="ViewingR-page">
        <div className="title-page">
          <h1>ViewingRooms</h1>
          <div className="demo-page">
            <p>
              Step into our Viewing Rooms and embark on a captivating journey
              through art. Explore curated exhibitions, discover diverse
              collections, and immerse yourself in the beauty of contemporary
              masterpieces—all from the comfort of your home. Experience art in
              a new light with our virtual gallery, where creativity knows no
              bounds and inspiration awaits.
            </p>
          </div>
        </div>
        <div className="featured-section">
          <h2 className="title-section">Featured</h2>
          <div className="carousel-controls">
            <i className="fa-solid fa-angle-left" onClick={goToPrev}></i>
            <i className="fa-solid fa-angle-right" onClick={goToNext}></i>
          </div>
          <div className="content-section_home">
            <Slider
              ref={sliderRef}
              className="multiple-items1"
              infinite={true}
              slidesToShow={4}
              slidesToScroll={3}
            >
              <div className="card-viewingrooms">
                <div className="img_featured-card">
                  <img
                    src="assets/images/viewingroom/room1.webp"
                    alt="Image 1"
                  />
                </div>
                <div className="content_featured-card">
                  <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                  <p className="name-artist">Almine Rech</p>
                </div>
              </div>

              <div className="card-viewingrooms">
                <div className="img_featured-card">
                  <img
                    src="assets/images/viewingroom/room1.webp"
                    alt="Image 1"
                  />
                </div>
                <div className="content_featured-card">
                  <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                  <p className="name-artist">Almine Rech</p>
                </div>
              </div>
              <div className="card-viewingrooms">
                <div className="img_featured-card">
                  <img
                    src="assets/images/viewingroom/room1.webp"
                    alt="Image 1"
                  />
                </div>
                <div className="content_featured-card">
                  <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                  <p className="name-artist">Almine Rech</p>
                </div>
              </div>
              <div className="card-viewingrooms">
                <div className="img_featured-card">
                  <img
                    src="assets/images/viewingroom/room1.webp"
                    alt="Image 1"
                  />
                </div>
                <div className="content_featured-card">
                  <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                  <p className="name-artist">Almine Rech</p>
                </div>
              </div>
              <div className="card-viewingrooms">
                <div className="img_featured-card">
                  <img
                    src="assets/images/viewingroom/room1.webp"
                    alt="Image 1"
                  />
                </div>
                <div className="content_featured-card">
                  <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                  <p className="name-artist">Almine Rech</p>
                </div>
              </div>
              <div className="card-viewingrooms">
                <div className="img_featured-card">
                  <img
                    src="assets/images/viewingroom/room1.webp"
                    alt="Image 1"
                  />
                </div>
                <div className="content_featured-card">
                  <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                  <p className="name-artist">Almine Rech</p>
                </div>
              </div>
              <div className="card-viewingrooms">
                <div className="img_featured-card">
                  <img
                    src="assets/images/viewingroom/room1.webp"
                    alt="Image 1"
                  />
                </div>
                <div className="content_featured-card">
                  <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                  <p className="name-artist">Almine Rech</p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="latest-section">
          <div className="top-section">
            <h2 className="title-section">Latest</h2>
            <a href="/listViewRoom" className="view-more_artist">View more</a>
          </div>
          <div className="lastest-card">
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            <div className="card-viewingrooms">
              <div className="img_featured-card">
                <img src="assets/images/viewingroom/room1.webp" alt="Image 1" />
              </div>
              <div className="content_featured-card">
                <h3 className="name-room">Allen Jones - 'From the Gods'</h3>
                <p className="name-artist">Almine Rech</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewingRooms;
