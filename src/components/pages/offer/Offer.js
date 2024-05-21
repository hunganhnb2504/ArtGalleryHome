import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccessToken, getDecodedToken } from "../../../utils/auth";
import "../../../css/offer.css";
import api from "../../../services/api";
import url from "../../../services/url";
import Swal from "sweetalert2";
function Offer() {
  const [showCustomPrice, setShowCustomPrice] = useState(false);
  const [note, setNote] = useState("");
  const { id } = useParams();
  const [ArtWorkDetail, setArtWorkDetail] = useState({ schoolOfArts: [] });
  const [offers, setOffers] = useState({});
  const decodedToken = getDecodedToken();
  const navigate = useNavigate();

  const priceData = {
    option1: ArtWorkDetail.price,
    option2: ArtWorkDetail.price * 1 / 2,
    option3: ArtWorkDetail.price * 1 / 4,
    option4: 0,
  };
  const [currentPrice, setCurrentPrice] = useState(priceData.option1);
  const [selectedOption, setSelectedOption] = useState('option1');


  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // Lấy giá từ phần dữ liệu và cập nhật giá mới
    const newPrice = priceData[selectedValue];
    setCurrentPrice(newPrice);
  };

  const handleDifferentOptionChange = (event) => {
    setShowCustomPrice(event.target.value === "different");
  }

  // Hàm xử lý sự kiện khi người dùng nhập giá cụ thể
  const handleCustomPriceChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    setCurrentPrice(newPrice);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
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

  // create order
  const createOrderData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    try {
      if (decodedToken) {
        const offerData = {
          artWorkId: ArtWorkDetail.id, // Thêm artWorkId vào dữ liệu của offer
          total: currentPrice, // Thêm total vào dữ liệu của offer
          offerPrice: ArtWorkDetail.price
        }
        const offerResponse = await api.post(url.OFFER.CREATE, offerData, config)
        if (offerResponse.status === 201) {
          Swal.fire({
            title: " Offer success",
            text: "You have Offer success!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/offer-history");
        }
        else if (offerResponse.status === 400) {
          Swal.fire({
            title: "Offer failed",
            text: "There have some problem!",
            icon: "warning",
            confirmButtonText: "OK",
          })
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleCreateOffer = async (details, data) => {
    await createOrderData();
  };

  return (
    <div>
      <div className="Offer-page">
        {/* <div className="auction-steps" id="auction-steps">
          <a id="offer" className="offer-section">
            <h3>Offer</h3>
            <i className="fa-solid fa-angle-right"></i>
          </a>
          <a id="shipping" className="shipping-section">
            <h3>Shipping</h3>
            <i className="fa-solid fa-angle-right"></i>{" "}
          </a>
          <a id="payment" className="payment-section">
            <h3>Payment</h3>
            <i className="fa-solid fa-angle-right"></i>
          </a>
        </div> */}
        <div className="main-offer_page">
          <div className="auction-content">
            <h2>Select an option</h2>
            <div className="table-offer">
              <h3>Your Offer</h3>
              <div className="list-offer">
                <label value={selectedOption}>
                  <input
                    type="radio"
                    name="price"
                    value="option1"
                    onChange={handleOptionChange}
                  />
                  <div className="text">
                    <br />
                    US${ArtWorkDetail.price}
                    <br />
                    Top-end of range (high chance of acceptance)
                  </div>
                </label>
                <br />
                <label value={selectedOption}>
                  <input
                    type="radio"
                    name="price"
                    value="option2"
                    onChange={handleOptionChange}
                  />
                  <div className="text">
                    US${ArtWorkDetail.price * 1 / 2}
                    <br />
                    Midpoint(good chance of acceptance)
                  </div>
                </label>
                <br />
                <label value={selectedOption}>
                  <input
                    type="radio"
                    name="price"
                    value="option3"
                    onChange={handleOptionChange}
                  />
                  <div className="text">
                    US${ArtWorkDetail.price * 1 / 4}
                    <br />
                    Low-end of range(lower chance of acceptance)
                  </div>
                </label>
                <br />
                <label id="diff-op">
                  <input
                    type="radio"
                    name="price"
                    value="different"
                    id="different-option"
                    onChange={handleDifferentOptionChange}
                  />
                  <div className="text">
                    Different amount
                    {showCustomPrice && (
                      <div id="custom-price">
                        <input type="number" id="custom-amount" onChange={handleCustomPriceChange} />
                        <br />
                        <div className="info-message">
                          Offers lower than the displayed price range are often
                          declined. We recommend increasing your offer to
                          US${ArtWorkDetail.price * 1 / 4}.
                        </div>
                      </div>
                    )}
                  </div>

                </label>
              </div>

              <div id="note-input">
                <label htmlFor="note">Note (Recommend)</label>
                <br />
                <input
                  type="text"
                  id="note"
                  placeholder="E.g. memberships of art institutions, artists or genres you collect, interest in the artist, etc."
                  value={note}
                  onChange={handleNoteChange}
                />
              </div>
              <div className="offer-binding">
                <p style={{ color: 'rgb(16, 35, 215' }}>All offers are binding</p>
                <p>
                  All offers are binding. If your offer is accepted, payment
                  will be processed immediately. Please note that this sale is
                  not final until your offer is accepted.
                </p>
              </div>
            </div>

            <a onClick={handleCreateOffer} className="next-offer">Make Offer</a>

          </div>
          <div className="offer-order">
            <div className="info-art">
              <img src={ArtWorkDetail.artWorkImage}></img>
              <div className="name-artist">Rachel MacFarlane</div>
              <div className="payment-exhibition">Perfomer, 2024</div>
              <div className="address">New York, NY, US</div>
              <div className="price">${ArtWorkDetail.price}</div>
            </div>
            <div className="info-order">
              <div className="info-order_item">
                <div className="title-item">Your offer</div>
                <div className="content-item">US${currentPrice}</div>
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
                <div className="content-item">US${currentPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
