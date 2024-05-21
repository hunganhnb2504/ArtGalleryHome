import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { isLoggedIn } from "../../../utils/auth";
import api from "../../../services/api";
import url from "../../../services/url";
import NotFound from "../other/NotFound";
import "../../../css/home.css"
import { getAccessToken} from "../../../utils/auth";
import Swal from "sweetalert2";
import { Height } from "@mui/icons-material";

function Home() {
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtworks] = useState([]);
  const [artist, setArtists] = useState([]);
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

  //hien thi thong tin artwork
  useEffect(() => {
    const userToken = localStorage.getItem("access_token");
    api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    api.get(`${url.ARTWORK.LIST}`)
      .then((response) => {
        setArtworks(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching promotion details:", error);
      });
  }, []);

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
    if (sliderRef1.current && sliderRef2.current) {
      sliderRef1.current.slickNext();
      sliderRef1.current.slickPrev();
      sliderRef2.current.slickNext();
      sliderRef2.current.slickPrev();
    }
  }, []);

  const goToNext1 = () => {
    sliderRef1.current.slickNext();
  };

  const goToPrev1 = () => {
    sliderRef1.current.slickPrev();
  };

  const goToNext2 = () => {
    sliderRef2.current.slickNext();
  };

  const goToPrev2 = () => {
    sliderRef2.current.slickPrev();
  };
  return (
    <div className="homepage">

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter&family=Lora:wght@600&family=Montserrat:ital,wght@0,100;1,100&family=Playfair+Display:ital@0;1&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter&family=Lora:wght@600&family=Montserrat:ital,wght@0,500;1,500&family=Playfair+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <div className="Header-hero">
        <div className="main_headerhero">
          <div className="title_header-hero">
            <p>Art Gallery, Where Creativity Blooms</p>
          </div>
          <div className="content_header-hero">
            <p>
              Embark on a journey through the captivating world of artistry.
              <br />
              Explore stunning and innovative artworks from talented artists.{" "}
              <br />
              <br />
              Join us in making life more beautiful with art!
            </p>
          </div>
        </div>

        <div className="img_header-hero">
          <div className="no_im-hero"></div>
          <div className="img-hero">
            <img
              className="img-home_hero"
              src="assets/images/home/Header-hero1.jpeg"
            ></img>
          </div>
        </div>
      </div>
      <div className="Featured-section_home">
        <div className="title-section_home">
          <h1>Featured</h1>
          <div className="vertical-line"></div>

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
            {artwork.map((item, index) => {
              return (
                <div className="item-card-art_home">
                  <Link to={`/artwork/${item.id}`}><a>
                    <div className="item-card-art_img">
                    <img src={item.artWorkImage} alt="Image 1" />
                    </div>
                    <h2 className="name-artist_carousel">{item.name}</h2>
                    <h2 id="exhibition-home">{item.series}</h2>
                    <span className="price-art_carousel">${item.price}</span>
                  </a>
                  <a className="button_add-product">Purchase</a>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>

      </div>



      <div className="Artist-section_home">
        <div className="title-section_home">
          <h1>Ours Artists</h1>
          <div className="vertical-line"></div>
        </div>
        <div className="carousel-controls">
          <i className="fa-solid fa-angle-left" onClick={goToPrev2}></i>
          <i className="fa-solid fa-angle-right" onClick={goToNext2}></i>
        </div>
        <div className="content-section_home">
          <Slider
            ref={sliderRef2}
            className="multiple-items2"
            infinite={true}
            slidesToShow={4}
            slidesToScroll={3}
            style={{height: "350px"}}
          >
            {artist.map((item, index) => {
              return (
            <div className="card-artist">
              <Link to={`/artist/${item.id}`}>
              <a className="item_img-artist">
                <img src={item.image} alt="Image 1" />
              </a>
              </Link>
              <a className="main-artist">
                 <div className="artist-info">{item.name}
                  <br/><p>Japenese, 1932-1005</p>
                 </div>
                 <div onClick={() => handleAddFollow(item.id)} className="button-follow">Follow</div>
              </a>
              
            </div>
            
          );
        })}
          </Slider>
        </div>
      </div>



      <div className="Events-section_home">
        <div className="title-section_home">
          <h1> Events & Programs</h1>
          {/* <div className="vertical-line"></div> */}

        </div>
        <div className="event-section_home">
          <div className="event-section_item">
            <div className="img-event">
              <img src="assets/images/arts/art7.jpeg"></img>
            </div>
            <div className="content-event">
              <div className="time-event">AUGUST 18</div>
              <div className="horizontal-linetime"></div>
              <div className="name-event" id="name-event">Peasant Scenes And Landscapes</div>
              <div className="demo-event">The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.</div>
            </div>

          </div>
          <div className="event-section_item">
            <div className="content-event">
              <div className="time-event">AUGUST 18</div>
              <div className="horizontal-linetime"></div>
              <div className="name-event" id="name-event" >Peasant Scenes And Landscapes</div>
              <div className="demo-event">The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.</div>
            </div>
            <div className="img-event">
              <img src="assets/images/arts/art9.jpeg"></img>
            </div>

          </div>
          <div className="event-section_item">
            <div className="img-event">
              <img src="assets/images/arts/art10.jpeg"></img>
            </div>
            <div className="content-event">
              <div className="time-event">AUGUST 20 </div>
              <div className="horizontal-linetime"></div>
              <div className="name-event" id="name-event">Rojo Y Negro - Latin American Art</div>
              <div className="demo-event">The exhibition is made possible by the Laura & C. Arnold Douglas Foundation.</div>
            </div>

          </div>

        </div>
      </div>

      {/* <div className="Viewingroon-section_home">
        <div className="title-section_home">
          <h1> Viewing Rooms</h1>
          

        </div>

      </div> */}


    </div>
  );
}

export default Home;
