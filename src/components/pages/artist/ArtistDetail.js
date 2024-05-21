import React, { useRef, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../css/artistDetail.css";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import Swal from "sweetalert2";
function ArtistDetail() {
  const sliderRef1 = useRef(null);
  const [artists, setArtists] = useState([])
  const { id } = useParams();
  const location = useLocation();
  const [artistDetail, setArtistDetail] = useState({ artWork: [], schoolOfArts: [] });
  useEffect(() => {
    if (sliderRef1.current) {
      sliderRef1.current.slickNext();
      sliderRef1.current.slickPrev();

    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const goToNext1 = () => {
    sliderRef1.current.slickNext();
  };

  const goToPrev1 = () => {
    sliderRef1.current.slickPrev();
  };
  ;

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

  //hien thi thong tin chi tiet artist
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    api.get(`${url.ARTIST.DETAIL.replace("{}", id)}`)
      .then((response) => {
        setArtistDetail(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching promotion details:", error);
      });
  }, [id]);

  // Config token
  const userToken = getAccessToken();

  const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
      },
  };

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

  return (
    <div>
      <div className="artistDetail-page">
        <div className="content-artist">
          <div className="img-artist">
            <img src={artistDetail.image} alt="Image 1" />
          </div>
          <div className="info-artist">
            <h2 className="name-artist" id="name-artist">{artistDetail.name}</h2>
            <p className="more-info"> Japenese, 1932-1005</p>
            <div className="follow-section">
              <a onClick={() => handleAddFollow(artistDetail.id)} className="button-follow">Follow</a>
              <span className="followers">1.5k Followers</span>
            </div>
            <div className="artist-style">
            {artistDetail.name} art invites you to embark on a visual odyssey,
              where each brushstroke tells a story and every color evokes a
              mood. From bold, dynamic compositions to subtle, introspective
              pieces, her diverse body of work reflects a deep exploration of
              the human experience and the world around us.
            </div>
          </div>
        </div>
        <div className="artist-biography">
          <h2>BIOGRAPHY</h2>
          <div>
          {artistDetail.name}, a visionary artist from Japan, has made
            groundbreaking contributions to contemporary art. Drawing
            inspiration from her rich cultural heritage, she redefines artistic
            expression with innovative techniques. From iconic wire sculptures
            to captivating performances, {artistDetail.name} versatility pushes the
            boundaries of creativity. Her works, imbued with profound symbolism,
            invite viewers to contemplate identity and spirituality. With a
            distinguished career spanning decades, {artistDetail.name} remains a trailblazer,
            inspiring audiences worldwide.
          </div>
          <div>
            Throughout her career, {artistDetail.name} has demonstrated an
            unparalleled versatility, experimenting with a diverse range of
            mediums and techniques. From her iconic electric wire sculptures to
            her mesmerizing performances, she has continually pushed the
            boundaries of artistic innovation.
          </div>
          <div> 
            {" "}
            {artistDetail.name} works are imbued with profound symbolism and a deep
            understanding of the human condition. Through her art, she explores
            themes of identity, spirituality, and the interconnectedness of all
            things, inviting viewers to contemplate the complexities of
            existence.
          </div>
          <div>
            {" "}
            With a distinguished career spanning decades and accolades from
            around the world, Atsuko Tanaka remains a trailblazing figure in the
            realm of contemporary art. Her visionary creations continue to
            inspire and captivate audiences, transcending cultural boundaries
            and leaving an enduring legacy for generations to come.
          </div>
        </div>

        <div className="other-artwork">
          {/* other works by artist */}
          <div className="title_other-artwork">
            <h2 >Artworks by {artistDetail.name}</h2>
            <a href="/byArtist">View All</a>
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
              {artistDetail.artWork.map((artwork) => {
                return (
              <div className="card-art_home">
                <Link to={`http://localhost:5000/artwork/${artwork.artWorkId}`}>
                  <img src={artwork.artWorkImage} alt="Image 1" />
                  <h2 className="name-artist_carousel">{artwork.name}</h2>
                  <h2 className="exhibition">Perfomer, 2024</h2>
                  <span className="price-art_carousel">${artwork.price}</span>
                </Link>
                <a className="button_add-product">Purchase</a>
              </div>
             );
            })}

            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;