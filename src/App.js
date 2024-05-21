import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { getAccessToken } from "./utils/auth.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/common/Footer.js";
import Header from "./components/common/Header.js";
import Home from "./components/pages/homepage/Home.js";
import Artists from "./components/pages/artist/Artists.js";
import ContactUs from "./components/pages/aboutus/ContactUs.js";
import Event from "./components/pages/events/Event.js";
import ArtworkDetail from "./components/pages/artwork/ArtworkDetail.js";
import Offer from "./components/pages/offer/Offer.js";
import Shipping from "./components/pages/other/Shipping.js";
import Payment from "./components/pages/checkout/Payment.js";
import AboutUs from "./components/pages/aboutus/AboutUs.js";
import ViewingRooms from "./components/pages/viewingroom/ViewingRooms.js";
import ArtistDetail from "./components/pages/artist/ArtistDetail.js";
import Artwork from "./components/pages/artwork/Artwork.js";
import ListArt from "./components/pages/artist/ListArtist.js";
import LoginAndRegister from "./components/pages/auth/Login.js";
import authMiddleware from "./context/authMiddleware.js";
import Profile from "./components/pages/auth/profile/Profile.js";
import Edit from "./components/pages/auth/profile/Edit.js";
import RegisterArtist from "./components/pages/auth/profile/RegisterArtist.js";
// import New from "./components/pages/auth/profile/New.js";
import ThankU from "./components/pages/other/ThankU.js";
import NotFound from "./components/pages/other/NotFound.js";
import AccountSettings from "./components/pages/auth/profile/AccountSetting.js";
import Follows from "./components/pages/auth/profile/Follows.js";
import Saves from "./components/pages/auth/profile/Saves.js";
import EventDetail from "./components/pages/events/EventDetail.js";
import OrderHistory from "./components/pages/auth/profile/OrderHistory.js";
import ListArtWork from "./components/pages/artwork/ListArt.js";
function App() {

  const ProtectedRoute = authMiddleware(({ element }) => element);

  const ProtectedLoginRoute = ({ element }) => {
    const token = getAccessToken();
    const { isExpired, isInvalid } = useJwt(token);

    if (token && !isExpired && !isInvalid) {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Auth */}

          <Route path="/login" element={<ProtectedLoginRoute element={<LoginAndRegister />} />} />
          {/* End Auth */}
                                                                                      
          {/* Profile */}
          <Route path="/setting" element={<ProtectedRoute element={<AccountSettings />} />}/>
          <Route path="/artist-follow" element={<ProtectedRoute element={<Follows />} />} />
          <Route path="/artwork-saves" element={<ProtectedRoute element={<Saves />} />} />
          <Route path="/edit-profile" element={<ProtectedRoute element={<Edit />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/register-artist" element={<ProtectedRoute element={<RegisterArtist />} />} />

          {/* End Profile */}

          {/* Home */}

          <Route path="/" element={<Home />} />

          {/* End Home */}

          {/* Artist */}

          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path="/artist-list-filter" element={<ListArt />} />

          {/* End Artist */}

          {/* Artwork */}

          <Route path="/artwork" element={<Artwork />} />
          <Route path="/artwork-list-filter" element={<ListArtWork />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />

          {/* End Artwork */}

          {/* About Us */}

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />

          {/* End About Us */}

          {/* Offer */}

          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/offer-history" element={<ProtectedRoute element={<OrderHistory />} />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment/:offerCode" element={<Payment />} />

          {/* End Offer */}

          {/* Event */}

          <Route path="/event" element={<Event />} />
          <Route path="/eventDetail" element={<EventDetail />} />
          {/* End Event */}

          {/* Viewing Room */}

          <Route path="/viewingroom" element={<ViewingRooms />} />

          {/* End Viewing Room */}


          {/* Other */}

          <Route path="/notFound" element={<NotFound />} />
          <Route path="/thanks" element={<ThankU />} />

          {/* End Other */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;