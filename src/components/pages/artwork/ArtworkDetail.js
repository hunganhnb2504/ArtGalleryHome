import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { isLoggedIn } from '../../../utils/auth';
import { getDecodedToken, removeAccessToken, getAccessToken } from "../../../utils/auth";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../css/artDetail.css"
import "../../../css/home.css"
import api from "../../../services/api";
import url from "../../../services/url";
import Swal from "sweetalert2";
import Modal from 'react-modal';
function ArtworkDetail() {
  const sliderRef1 = useRef(null);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const [artist, setArtists] = useState([]);
  const { id } = useParams();
  const [ArtWorkDetail, setArtWorkDetail] = useState({ artists: [], offers:[], schoolOfArts: [] });
  const [artistDetail, setArtistDetail] = useState({ artWork: [], schoolOfArts: [] });
  const artworks = artistDetail.artWork || [];
  const navigate = useNavigate();
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOffer = () => {
    if (!isLoggedIn()) {
      localStorage.setItem("redirectPath", window.location.pathname);
      navigate("/login");
    } else {
      navigate(`/offer/${id}`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Config token
  const userToken = getAccessToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  // Add to Favorite
  const handleAddFavorite = async (artworkId) => {
    try {
      const favoriteRequest = await api.post(url.FAVORITE.ADD, { artworkId }, config);

      setTimeout(() => {
      }, 2000);

      if (favoriteRequest.status === 201) {
        setTimeout(() => {
          Swal.fire({
            title: "Good job!",
            text: "Added Artwork to favorites list successfully.",
            icon: "success",
          });
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Oops...",
          text: "The Artwork is already in your favorites list.",
          icon: "warning",
        });
      } else if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please log in to add Artwork to your favorites list!",
          footer: '<a href="/login">Log in now?</a>',
        });
      } else {
        console.error("Error adding to favorites", error);
      }
    }
  };

  //hien thi thong tin chi tiet artwork
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    api.get(`${url.ARTWORK.DETAIL.replace("{}", id)}`)
      .then((response) => {
        setArtWorkDetail(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching promotion details:", error);
      });

  }, [id]);

  //hien thi thong tin artist
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    api.get(`${url.ARTIST.LIST}`)
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching promotion details:", error);
      });
  }, []);

  useEffect(() => {
    const fetchArtistDetail = async () => {
      if (ArtWorkDetail.artists.length > 0) {
        const artistId = ArtWorkDetail.artists[0].id;
        try {
          const response = await api.get(`${url.ARTIST.DETAIL.replace("{}", artistId)}`);
          setArtistDetail(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching artist details:", error);
        }
      }
    };

    fetchArtistDetail();
  }, [ArtWorkDetail]);

  // Hàm shuffle mảng
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


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

  const isAnyOfferPaid = ArtWorkDetail.offers.some(offer => offer.isPaid === 1);


  return (
    <div>
      <div className="ArtDetail-page">
        <div className="about-artwork">
          <div className="info-art_section">
            <div className="img-art_sec">
              <div className="img-art">
                <img className="anhgb" src={ArtWorkDetail.artWorkImage}></img>
              </div>
              <div className="otherServices">
                <button className="bonhai" onClick={() => handleAddFavorite(ArtWorkDetail.id)}>
                  <i class="fa-regular fa-heart"></i>Save
                </button>
                <button className="bonhai">
                  <i class="fa-solid fa-arrow-up-from-bracket"></i>Share
                </button>
              </div>
            </div>
            <div className="about_art-detail">
              <div className="title-tab_art">
                <div class="tablinks">About the work</div>
                {/* <button class="tablinks" onclick="openCity(event, 'Provenance')">
                Provenance
                </button> */}
              </div>
              <div className="content-tab_art">
                <div id="AboutWork" class="tabcontent">
                  <dl className="ecutre">
                    <dt className="fosan">Materials</dt>
                    <dd className="gozila">{ArtWorkDetail.materials}</dd>
                  </dl>
                  <dl className="ecutre">
                    <dt className="fosan">Size</dt>
                    <dd className="gozila">{ArtWorkDetail.size}</dd>
                  </dl>
                  <dl className="ecutre">
                    <dt className="fosan">Rarity</dt>
                    <dd className="gozila">{ArtWorkDetail.rarity}</dd>
                  </dl>
                  <dl className="ecutre">
                    <dt className="fosan">Medium</dt>
                    <dd className="gozila">{ArtWorkDetail.medium}</dd>
                  </dl>
                  <dl className="ecutre">
                    <dt className="fosan">Signature</dt>
                    <dd className="gozila">{ArtWorkDetail.signature}</dd>
                  </dl>
                  <dl className="ecutre">
                    <dt className="fosan">Frame</dt>
                    <dd className="gozila">{ArtWorkDetail.frame}</dd>
                  </dl>
                </div>
              </div>
              <div className="about-provenance">
                <div className="artist-section">
                  <div className="about-artist">
                    <div className="img-arttist">
                      {ArtWorkDetail.artists.map((artists) => {
                        return (
                          <img className="anhgbc" src={artists.image}></img>
                        );
                      })}
                    </div>
                    <div className="info-artist">
                      <a className="name-artist">
                        {ArtWorkDetail.artists.map((artist) => {
                          return (
                            <h1 className="name-artist">{artist.name}</h1>
                          );
                        })}
                      </a>
                      <p className="fdsghj">{artistDetail.description}</p>
                    </div>
                  </div>
                  <div className="button-follow">
                    <a className="mlb"> Follow</a>
                  </div>
                </div>
                <div className="exhibition-section">
                  <h3 className="title_exhibition-section">
                    Selected exhibitions
                  </h3>
                  <div className="content_exhibition">
                    <dl className="ecutre">
                      <dt className="fosan">2024</dt>
                      <dd className="gozila">
                        Rachel MacFarlane: Coming Events Cast Their Light Before
                        Them, Hollis Taggart
                      </dd>
                    </dl >
                    <dl className="ecutre">
                      <dt className="fosan">2023</dt>
                      <dd className="gozila">
                        Of the Past and Present: Estates and Contemporary
                        Artists at Hollis Taggart, Hollis Taggart
                      </dd>
                    </dl>
                    {/* <dl className="ecutre">
                      <dt className="fosan">2022</dt>
                      <dd className="gozila">Dimensions, Hollis Taggart</dd>
                    </dl> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="purchase-art_section">
            <div className="info-purchase_art">
              {ArtWorkDetail.artists.map((artist) => {
                return (
                  <h1 className="name-artist">{artist.name}</h1>
                );
              })}
              <h2 className="name-exhibition">{ArtWorkDetail.name} 2024</h2>
              <p className="masterial">Oil on canvas</p>
              <p className="size">24 × 18 in | 61 × 45.7 cm</p>
              <p className="rarity" onClick={openModal} style={{ cursor: 'pointer', color: 'rgb(112, 112, 112)', textDecoration: 'underline' }}>
                Unique work
              </p>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Rarity Classifications"
                className="customModal"
                overlayClassName="customOverlay"
                shouldCloseOnOverlayClick={true}
              >
                <h2>Rarity classifications</h2>
                <div className="modalContent">
                  <p><strong>Unique</strong><br />One-of-a-kind piece.</p>
                  <p><strong>Limited edition</strong><br />The edition run has ended; the number of works produced is known and included in the listing.</p>
                  <p><strong>Open edition</strong><br />The edition run is ongoing. New works are still being produced, which may be numbered. This includes made-to-order works.</p>
                  <p><strong>Unknown edition</strong><br />The edition run has ended; it is unclear how many works were produced.</p>
                  <p className="information">Our partners are responsible for providing accurate classification information for all works.</p>
                  <button className="closeButton" onClick={closeModal}>OK</button>
                </div>
              </Modal>
              <h1 className="price">${ArtWorkDetail.price}</h1>
            </div>
            <div className="button_purchase-sec">
            {isAnyOfferPaid ? (
                <button className="mlb" id="offer-button" disabled>
                  Sold
                </button>
              ) : (
                <a className="mlb" onClick={handleOffer} id="offer-button">
                  Make An Offer
                </a>
              )}
            </div>
            <div className="shipping-info">
              <h4>Shipping and Taxes</h4>
              <p className="pehatnb">Taxes may apply at checkout. </p>
              <br />
              <p className="pehatnb">Ships from New York, NY, US</p>
              <br />
              <p className="pehatnb">Shipping: Calculated in checkout</p>
            </div>
            <div className="other-artist">
              <div className="title_other-artist">
                <h3 className="hatbana">Related artists</h3>
                {/* <a className="viewmore">ViewMore</a> */}
              </div>
              <div className="info-other_artist">
                <div className="about-list_artist">
                  {shuffle(artist).slice(0, 4).map((item, index) => {
                    return (
                      <div className="artist-section">
                        <div className="about-artist">
                          <Link to={`/artist/${item.id}`}>
                            <div className="img-arttist">
                              <img className="anhgbc" src={item.image}></img>
                            </div>
                          </Link>
                          <div className="info-artist">
                            <a className="name-artist">{item.name}</a>
                            <p className="fdsghj">Canadian, b. 1986</p>
                          </div>
                        </div>
                        <div className="button-follow">
                          <a className="mlb"> Follow</a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="other-artwork_artPage">
          {/* other works by artist */}
          <div className="title_other-artwork">
            {ArtWorkDetail.artists.map((artist) => {
              return (
                <h2 className="hathainm">Other works by {artist.name}</h2>
              );
            })}
            <a className="mlb">View All</a>
          </div>
          <div className="carousel-controls">
            <i className="fa-solid fa-angle-left" onClick={goToPrev1}></i>
            <i className="fa-solid fa-angle-right" onClick={goToNext1}></i>
          </div>
          <div className="content-section_home">
            <Slider
              ref={sliderRef1}
              className="multiple-items1"
              infinite={true}
              slidesToShow={4}
              slidesToScroll={3}
            >
              {shuffle(artworks).slice(0, 6).map((artwork, index) => {
                return (
                  <Link to={`http://localhost:5000/artwork/${artwork.artWorkId}`}>
                    <div className="card-art_home">
                      <a className="mlb">
                        <img className="anhgb" src={artwork.artWorkImage} alt="Image 1" />
                        <h2 className="name-artist_carousel">{artwork.name}</h2>
                        <h2 className="exhibition">Perfomer, 2024</h2>
                        <span className="price-art_carousel">{artwork.price}</span>
                      </a>
                      <a className="button_add-product">Purchase</a>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetail;