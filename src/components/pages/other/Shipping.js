import React, { useState } from "react";
import "../../../css/shipping.css";
function Shipping() {
  const [deliveryMethod, setDeliveryMethod] = useState("shipping");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleDeliveryMethodChange = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <link rel="stylesheet" href="assets/css/shipping.css" />

      <div className="Shipping-page">
        <div className="auction-steps_shipping" id="auction-steps_shipping">
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
          
        </div>
        <div className="main-shipping_page">
          <div className="shipping-content">
            <h2>Delivery method</h2>
            <div className="ship-method">
              <div>
                <input
                  type="radio"
                  id="shipping"
                  name="deliveryMethod"
                  value="shipping"
                  checked={deliveryMethod === "shipping"}
                  onChange={handleDeliveryMethodChange}
                />
                <label htmlFor="shipping">Shipping</label>
              </div>
              <div id="freeMethod">
                <input
                  type="radio"
                  id="pickup"
                  name="deliveryMethod"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={handleDeliveryMethodChange}
                />
                <label htmlFor="pickup">Arrange for pickup (free)</label>
              </div>
            </div>
            <div className="delivery-address">
               <h3>Delivery Address </h3>
              {deliveryMethod === "shipping" && (
                <div>
                  <div>
                    <label htmlFor="fullName">Full name</label>
                    <input type="text" id="fullName" name="fullName" />
                  </div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" />
                  </div>
                  <div>
                    <label htmlFor="streetAddress" >
                      Address line 1
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label htmlFor="aptFloorSuite">
                       Address line 2
                    </label>
                    <input
                      type="text"
                      id="aptFloorSuite"
                      name="aptFloorSuite"
                      placeholder="Apt, floor, suite, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" />
                  </div>
                  <div>
                    <label htmlFor="state">State, province, or region</label>
                    <input type="text" id="state" name="state" />
                  </div>
                  <div>
                    <label htmlFor="postalCode">ZIP/postal code</label>
                    <input type="text" id="postalCode" name="postalCode" />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                </div>
              )}

              {deliveryMethod === "pickup" && (
                <div>
                  <div>
                    <label htmlFor="phoneNumberPickup">Phone number</label>
                    <input
                      type="tel"
                      id="phoneNumberPickup"
                      name="phoneNumberPickup"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                </div>
              )}
            </div>
            
              <a href="/payment" className="next-offer">Continue</a>
            
          </div>
          

          <div className="offer-order">
            <div className="info-art">
              <img src="assets/images/artists/artist2.webp"></img>
              <div className="name-artist">Rachel MacFarlane</div>
              <div className="exhibition">Perfomer, 2024</div>
              <div className="address">New York, NY, US</div>
              <div className="price">$10,000-$15,000</div>
            </div>
            <div className="info-order">
              <div className="info-order_item">
                <div className="title-item">Your offer</div>
                <div className="content-item">US$15,000.00</div>
              </div>
              <div className="info-order_item">
                <div className="title-item">Shipping</div>
                <div className="content-item">Calculated in next steps</div>
              </div>
              <div className="info-order_item">
                <div className="title-item">Tax*</div>
                <div className="content-item">Calculated in next steps</div>
              </div>
              <div id="total-item" className="info-order_item">
                <div className="title-item">Total</div>
                <div className="content-item">Waiting for final costs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
