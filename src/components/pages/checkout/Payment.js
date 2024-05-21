import { useCallback, useEffect, useState, useRef } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { getAccessToken, getDecodedToken } from "../../../utils/auth";
import PayPalButton from "../../../payment/PaypalButton";
import Swal from "sweetalert2";
import "../../../css/payment.css"
function Payment() {
  const { offerCode } = useParams();
  const [offerDetail, setOfferDetail] = useState([]);
  const decodedToken = getDecodedToken();
  const location = useLocation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadOffer = useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    try {
      const offerResponse = await api.get(url.PAYPAL.DETAIL + `/${offerCode}`, config);
      setOfferDetail(offerResponse.data);
    } catch (error) {
      setError(true);
    }
  }, [offerCode]);

  useEffect(() => {
    loadOffer();

    setTimeout(() => {

    }, 2000);
  }, [loadOffer]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <div className="Payment-page">
        <div className="auction-steps_payment">
          {/* <a id="offer" className="offer-section">
            <h3>Offer</h3>
            <i className="fa-solid fa-angle-right"></i>
          </a>
          <a id="shipping" className="shipping-section">
            <h3>Shipping</h3>
            <i className="fa-solid fa-angle-right"></i>{" "}
          </a> */}
          <a id="payment" className="payment-section">
            <h3 id="h3-payment">Payment</h3>
            <i className="fa-solid fa-angle-right"></i>
          </a>

        </div>
        <div className="main-payment_page">
          <div className="offer-order_payment">
            <div className="info-art">
              <img src={offerDetail.artWorkImages}></img>
              <div className="name-artist">{offerDetail.artWorkNames}</div>
              <div className="exhibition-payment">Perfomer, 2024</div>
              <div className="address">New York, NY, US</div>
              <div className="price">${offerDetail.offerPrice}</div>
            </div>
            <div className="info-order">
              <div className="info-order_item">
                <div className="title-item">Your offer</div>
                <div className="content-item">US${offerDetail.toTal}</div>
              </div>
              {/* <div className="info-order_item">
                <div className="title-item">Shipping</div>
                <div className="content-item">Calculated in next steps</div>
              </div>
              <div className="info-order_item">
                <div className="title-item">Tax*</div>
                <div className="content-item">Calculated in next steps</div>
              </div> */}
              <div id="total-item" className="info-order_item">
                <div className="title-item">Total</div>
                <div className="content-item">US${offerDetail.toTal}</div>
              </div>
            </div>
          </div>
        </div>
        <PayPalButton
          amount={offerDetail.toTal}
        />
      </div>
    </div>
  );
}

export default Payment;
