import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { getAccessToken } from "../../../utils/auth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../../services/api";
import url from "../../../services/url";
import Swal from "sweetalert2";
function Artists() {
  const sliderRef = useRef(null);
  const [artists, setArtists] = useState([]);
  const userToken = getAccessToken();

  const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
      },
  };

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

  // Hàm để sắp xếp mảng nghệ sĩ theo thứ tự ngẫu nhiên
  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // Lấy danh sách nghệ sĩ và sắp xếp ngẫu nhiên
  const shuffledArtists = shuffleArray(artists);

  const filterArtistsBySchoolOfArt = (soa) => {
    return artists.filter(artist => { 
      const schoolOfArt = artist.schoolOfArts.map(schoolOfArt => schoolOfArt.name);
      return schoolOfArt.includes(soa);
    });
  };
  const artistsAbstarct = filterArtistsBySchoolOfArt('Abstract Art');
  const artistsContemporary = filterArtistsBySchoolOfArt('Contemporary Art');
  const artistsEmerging = filterArtistsBySchoolOfArt('Emerging Art');
  const artistsStreet = filterArtistsBySchoolOfArt('Street Art');
  const artistsPop = filterArtistsBySchoolOfArt('Pop Art');
  const artistsMinimalist = filterArtistsBySchoolOfArt('Minimalist Art');
  const artistsImpressionistModern = filterArtistsBySchoolOfArt('Impressionist and Modern Art');


  // Add to Follow
  const handleAddFollow = async (artistId) => {
    try {
        const response = await api.post(url.FOLLOW.ADD, { artistId }, config);

        // setTimeout(() => {
        // }, 2000);

        if (response.status === 201) {
            setTimeout(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Added Artist to follow list successfully.",
                    icon: "success",
                });
            }, 2000);
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
          
            Swal.fire({
                title: "Oops...",
                text: "The Artist is already in your follows list.",
                icon: "warning",
            });
        } else if (error.response && error.response.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please log in to add Artist to your follows list!",
                footer: '<a href="/login">Log in now?</a>',
            });
        } else {
            console.error("Error adding to favorites", error);
        }
    }
};

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
    <div className="artist-page">
      <link rel="stylesheet" href="assets/css/artist.css" />

      <div className="top-page">
        <h1 className="title-artist_page">Our Artists</h1>

        <div className="demo-page">
          <p>
            Explore our Artists page to discover a curated selection of talented
            creators and their captivating artists. Join us in celebrating
            artistic diversity and creativity from around the globe!
          </p>
        </div>
      </div>
      <div className="main-content_page">
        <section className="featured-artists_carousel">
          <div className="top-section">
            <h3 className="title-section">Featured Artists</h3>
            <Link><a className="view-more_artist">View more</a></Link>
          </div>
          <div className="carousel-controls">
            <i className="fa-solid fa-angle-left" onClick={goToPrev}></i>
            <i className="fa-solid fa-angle-right" onClick={goToNext}></i>
          </div>
          <div className="content-section_home">
            <Slider
              ref={sliderRef}
              className="multiple-items2"
              infinite={true}
              slidesToShow={4}
              slidesToScroll={3}
            >
              {shuffledArtists.map(artist => (
                <div className="card-artist">
                  <Link to={`/artist/${artist.id}`}>
                  <a className="img-artist">
                    <img src={artist.image} alt="Image 1" />
                  </a>
                  </Link>
                  <a className="main-artist">
                    <div className="artist-info">
                      {artist.name}
                      <br />
                      <p>Japenese, 1932-1005</p>
                    </div>
                    <div onClick={() => handleAddFollow(artist.id)} className="button-follow">Follow</div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section className="artists-section">
          <div className="top-section">
            <h3 className="title-section">Abstract Expressionism</h3>
            <a href="/artwork-list-filter" className="view-more_artist">View more</a>
          </div>
          <div className="section-content_artist">
          {artistsAbstarct.map(artist => (
            <div className="card-artist">
              <Link to={`/artist/${artist.id}`} className="img-artist">
                <img src={artist.image} alt="Image 1" />
              </Link>
              <a  className="main-artist">
                <div className="artist-info">
                  {artist.name}
                  <br />
                  <p>{artist.description}</p>
                </div>
                <div onClick={() => handleAddFollow(artist.id)} className="button-follow">Follow</div>
              </a>
            </div>
            ))}
          </div>
        </section>
        <section className="artists-section">
          <div className="top-section">
            <h3 className="title-section">Contemporary Art</h3>
            <a className="view-more_artist">View more</a>
          </div>
          <div className="section-content_artist">
          {artistsContemporary.map(artist => (
            <div className="card-artist">
              <Link to={`/artist/${artist.id}`} className="img-artist">
                <img src={artist.image} alt="Image 1" />
              </Link>
              <a  className="main-artist">
                <div className="artist-info">
                  {artist.name}
                  <br />
                  <p>{artist.description}</p>
                </div>
                <div onClick={() => handleAddFollow(artist.id)} className="button-follow">Follow</div>
              </a>
            </div>
            ))}
          </div>
        </section>
        <section className="artists-section">
          <div className="top-section">
            <h3 className="title-section">Minimalist Art</h3>
            <a className="view-more_artist">View more</a>
          </div>
          <div className="section-content_artist">
          {artistsMinimalist.map(artist => (
            <div className="card-artist">
              <Link to={`/artist/${artist.id}`} className="img-artist">
                <img src={artist.image} alt="Image 1" />
              </Link>
              <a  className="main-artist">
                <div className="artist-info">
                  {artist.name}
                  <br />
                  <p>{artist.description}</p>
                </div>
                <div onClick={() => handleAddFollow(artist.id)} className="button-follow">Follow</div>
              </a>
            </div>
            ))}
          </div>
        </section>
        <section className="artists-section">
          <div className="top-section">
            <h3 className="title-section">Pop Art</h3>
            <a className="view-more_artist">View more</a>
          </div>
          <div className="section-content_artist">
          {artistsPop.map(artist => (
            <div className="card-artist">
              <Link to={`/artist/${artist.id}`} className="img-artist">
                <img src={artist.image} alt="Image 1" />
              </Link>
              <a  className="main-artist">
                <div className="artist-info">
                  {artist.name}
                  <br />
                  <p>{artist.description}</p>
                </div>
                <div onClick={() => handleAddFollow(artist.id)} className="button-follow">Follow</div>
              </a>
            </div>
            ))}
          </div>
        </section>
        <section className="artists-section">
          <div className="top-section">
            <h3 className="title-section">Street Art</h3>
            <a className="view-more_artist">View more</a>
          </div>
          <div className="section-content_artist">
          {artistsStreet.map(artist => (
            <div className="card-artist">
              <Link to={`/artist/${artist.id}`} className="img-artist">
                <img src={artist.image} alt="Image 1" />
              </Link>
              <a  className="main-artist">
                <div className="artist-info">
                  {artist.name}
                  <br />
                  <p>{artist.description}</p>
                </div>
                <div onClick={() => handleAddFollow(artist.id)} className="button-follow">Follow</div>
              </a>
            </div>
            ))}
          </div>
        </section>
        <section className="artists-section">
          <div className="top-section">
            <h3 className="title-section">Emerging Art</h3>
            <a className="view-more_artist">View more</a>
          </div>
          <div className="section-content_artist">
          {artistsEmerging.map(artist => (
            <div className="card-artist">
              <Link to={`/artist/${artist.id}`} className="img-artist">
                <img src={artist.image} alt="Image 1" />
              </Link>
              <a  className="main-artist">
                <div className="artist-info">
                  {artist.name}
                  <br />
                  <p>{artist.description}</p>
                </div>
                <div onClick={() => handleAddFollow(artist.id)} className="button-follow">Follow</div>
              </a>
            </div>
            ))}
          </div>
        </section>
        
        
      </div>
    </div>
  );
}

export default Artists;