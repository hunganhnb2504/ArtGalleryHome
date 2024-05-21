import { useState, useEffect } from "react";
import api from "../../../services/api";
import url from "../../../services/url";

function ListArtist() {

  const [artists, setArtists] = useState([]);
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

  const filterArtworksBySchoolOfArt = (soa) => {
    return artists.filter(artist => { 
      const schoolOfArt = artist.schoolOfArts.map(schoolOfArt => schoolOfArt.name);
      return schoolOfArt.includes(soa);
    });
  };
  const artistsWithGivenSchoolOfArt = filterArtworksBySchoolOfArt('c');
  const selectedSchoolOfArt = filterArtworksBySchoolOfArt(artistsWithGivenSchoolOfArt);

  return (
    <div>
      <link rel="stylesheet" href="assets/css/artist.css" />

      <div className="listArtist-page">
        <div className="top-page">
          <h1 className="title-artist_page">Our Artists</h1>
          <h3>{selectedSchoolOfArt}</h3>
        </div>
        <div className="section-content_artist">
        {artistsWithGivenSchoolOfArt.map(artist => (
          <div className="card-artist">
            <a href="/artistDetail" className="img-artist">
              <img src={artist.image} alt="Image 1" />
            </a>
            <a href="/artistDetail" className="main-artist">
              <div className="artist-info">
                {artist.name}
                <br />
                <p>{artist.description}</p>
              </div>
              <div className="button-follow">Follow</div>
            </a>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListArtist;
