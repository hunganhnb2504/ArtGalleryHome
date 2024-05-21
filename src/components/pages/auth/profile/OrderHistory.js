import { useCallback, useEffect, useState } from "react";
import "../../../../css/orderhistory.css";
import { Link, useLocation } from "react-router-dom";
import { getAccessToken } from "../../../../utils/auth";
import api from "../../../../services/api";
import url from "../../../../services/url";
import { format } from "date-fns";

function OrderHistory() {
  const [myOffer, setMyOffer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const [offersPerPage] = useState(1);
  const [hasOffer, setHasOffer] = useState(false); // Thêm state mới

  const loadOffer = useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    try {
      const offerResponse = await api.get(url.OFFER.MY_OFFER, config);
      setMyOffer(offerResponse.data);
      setHasOffer(offerResponse.data.length > 0); // Kiểm tra xem có offer nào được tìm thấy không
    } catch (error) {}
  }, []);

  useEffect(() => {
    loadOffer();
  }, [loadOffer]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Group offers by creation date
  const groupOffersByDate = () => {
    const groupedOffers = {};
    myOffer.forEach((offer) => {
      const date = format(new Date(offer.createdAt), "MMMM dd, yyyy"); // Format creationDate
      if (!groupedOffers[date]) {
        groupedOffers[date] = [];
      }
      groupedOffers[date].push(offer);
    });
    return groupedOffers;
  };

  const groupedOffers = groupOffersByDate();

  // Get current offers
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = Object.entries(groupedOffers).slice(
    indexOfFirstOffer,
    indexOfLastOffer
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div class="oderdetaill">
      <div
        class="menu-left d-flex align-items-center"
        style={{ width: "300px", margin: "30px 0 0 50px" }}
      >
        <p>
          <a class="aaa" style={{ color: "#000" }} href="/profile">
            {" "}
            Profile
          </a>
        </p>
      </div>
      <hr className="hrdev" style={{ marginTop: "20px" }} />
      <nav style={{ marginTop: "50px" }} id="profile-navigation">
        <ul className="ghye">
          <li className="hjpk">
            <Link to={`/edit-profile`}>
              <a className="lkm">Edit Profile</a>
            </Link>
          </li>
          <li className="hjpk">
            <Link to={`/offer-history`}>
              <a className="lkm">Offer History</a>
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="hrdev" style={{ marginTop: "10px" }} />
      {!hasOffer && (
        <div className="no-offers">
          <p>
            No offers found.{" "}
            <Link to="/artwork" className="link-to-place-order">
              Place an order
            </Link>
          </p>
        </div>
      )}
      {currentOffers.map(([date, offers]) => (
        <div class="card">
          <div class="card-header">
            <p>{date}</p>
          </div>
          {offers.map((offer) => (
            <div className="nmbj" key={offer.id}>
              <p>Offer Code: #{offer.offerCode}</p>
              <div class="card-body">
                <div className="card-body_image-product">
                <img
                  src={offer.artWorkImages}
                  alt="Product Image"
                  class="product-image"
                />
                </div>
                <div class="product-details">
                  <h2>{offer.artWorkNames}</h2>
                  <p>
                    {offer.artWorkNames} has become one of the most highly
                    regarded American self-taught artists and this work is
                    historically important as it was executed in 1970.
                  </p>
                  <h3>${offer.toTal}</h3>
                </div>
              </div>
              {offer.isPaid === 1 ? (
                <div class="card-footer">
                  <p>Đã thanh toán</p>
                </div>
              ) : offer.status === 1 ? (
                <div class="card-footer">
                
                  <Link to={`/payment/${offer.offerCode}`} className="card-footer_button-payment">
                    Payment
                  </Link>
                 
                </div>
              ) : (
                <div class="card-footer">
                  <p>Wait for artist accpet offer</p>
                </div>
              )}
            </div>
          ))}
          <hr></hr>
        </div>
      ))}
      {hasOffer && (
        <div className="pagination-container">
          <nav>
            <ul className="pagination">
              {Object.keys(groupedOffers).length > 0 &&
                Array.from({
                  length: Math.ceil(
                    Object.keys(groupedOffers).length / offersPerPage
                  ),
                }).map((_, index) => (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
