import React from "react";

function ViewDetail() {
  return (
    <div>
        <link rel="stylesheet" href="assets/css/art.css" />
        <link rel="stylesheet" href="assets/css/viewDetail.css" />

      <div className="ViewDetail-page">
        <div className="top-viewPage">
          <div className="img-viewRoom">
            <img src="assets/images/viewingroom/room1.webp"></img>
          </div>
          <div className="info-viewRoom">
            <h2>Nene: Untold Tales</h2>
            <h4>Kouichi Fine Arts</h4>
          </div>
        </div>
        <div className="main-viewPage">
          <div className="introduction">
            Kouichi Fine Arts is pleased to present Nene's solo exhibition
            "Untold Tales." We welcome you to experience the unique world of
            Nene's art, where each canvas becomes a window into the artist's
            world of Untold Tales.
          </div>
          <div className="artworkViewRoom">
            <div className="content-section">
              <div className="card-art_home">
                <a>
                  <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                  <h2 className="name-artist_carousel">Gordian Knot Wood</h2>
                  <h2 className="exhibition">Perfomer, 2024</h2>
                  <span className="price-art_carousel">$10,000-$35,000</span>
                </a>
                <a className="button_add-product">Purchase</a>
              </div>
              <div className="card-art_home">
                <a>
                  <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                  <h2 className="name-artist_carousel">Gordian Knot Wood</h2>
                  <h2 className="exhibition">Perfomer, 2024</h2>
                  <span className="price-art_carousel">$10,000-$35,000</span>
                </a>
                <a className="button_add-product">Purchase</a>
              </div>
              <div className="card-art_home">
                <a>
                  <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
                  <h2 className="name-artist_carousel">Gordian Knot Wood</h2>
                  <h2 className="exhibition">Perfomer, 2024</h2>
                  <span className="price-art_carousel">$10,000-$35,000</span>
                </a>
                <a className="button_add-product">Purchase</a>
              </div>
            </div>
            <a className="view-all">View all artworks</a>
          </div>
          <div className="content-viewRoom">
            <div>
              Nene's works resonate deeply with viewers, transcending the need
              for verbal captions. Instead, they speak directly to the soul,
              evoking emotions and stirring the imagination without the
              constraints of language.
            </div>
            <div>
              From fleeting glimpses of daily life to the imaginary world,
              Nene's artistry embodies a universal language that speaks to the
              heart of each viewer. Through sophisticated compositions and
              beautiful colors, Nene invites viewers on a journey of
              self-discovery and introspection, where words become unnecessary
              in the presence of such profound visual narratives.
            </div>
            <div>
              We welcome you to experience the unique world of Nene's art, where
              each canvas becomes a window into the artist's world of Untold
              Tales.
            </div>
          </div>
          <div className="view-featureArt">
            <div className="art-demo_viewRoom">
              <div className="img-art_demo">
                <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
              </div>
              <p className="basic-info">
                On a Blue Moon / 2024 / oil, acrylic on canvas / 45.5 × 38.1 cm
              </p>
            </div>
            <div className="art-demo_viewRoom">
              <div className="img-art_demo">
                <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
              </div>
              <p className="basic-info">
                On a Blue Moon / 2024 / oil, acrylic on canvas / 45.5 × 38.1 cm
              </p>
            </div>
            <div className="art-demo_viewRoom">
              <div className="img-art_demo">
                <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
              </div>
              <p className="basic-info">
                On a Blue Moon / 2024 / oil, acrylic on canvas / 45.5 × 38.1 cm
              </p>
            </div>
            <div className="art-demo_viewRoom">
              <div className="img-art_demo">
                <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
              </div>
              <p className="basic-info">
                On a Blue Moon / 2024 / oil, acrylic on canvas / 45.5 × 38.1 cm
              </p>
            </div>
            <div className="art-demo_viewRoom">
              <div className="img-art_demo">
                <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
              </div>
              <p className="basic-info">
                On a Blue Moon / 2024 / oil, acrylic on canvas / 45.5 × 38.1 cm
              </p>
            </div>
            <div className="art-demo_viewRoom">
              <div className="img-art_demo">
                <img src="assets/images/arts/art2.jpeg" alt="Image 1" />
              </div>
              <p className="basic-info">
                On a Blue Moon / 2024 / oil, acrylic on canvas / 45.5 × 38.1 cm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetail;
