import React from "react";

function Review() {
  return (
    <div className="Review-page">
           <link rel="stylesheet" href="assets/css/review.css" />

      <div >
        <div className="auction-steps">
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
          <a id="review" className="review-section">
            <h3>Review</h3>
            <i className="fa-solid fa-angle-right"></i>
          </a>
        </div>
        <div className="main-review">
          <div className="review-content">
            <div className="the-offer">
              <div className="title-section">
                <h1>Your offer</h1>
                <a> Change</a>
              </div>
              <div className="price-offer">
                <div>$12,500</div>
                <span>List price: $10,000-15,000</span>
              </div>
              <div className="note">
                <div>Your note</div>
                <span>I sent an offer for US$12,500.00</span>
              </div>
            </div>
            <div className="the-pickUp">
              <div className="title-section">
                <h1>Pick up (New York, NY, US)</h1>
                <a> Change</a>
              </div>
              <p>
                After your order is confirmed, a specialist will contact you to
                coordinate pickup.
              </p>
            </div>
            <div className="payment-method">
              <div className="title-section">
                <h1>Payment method</h1>
                <a> Change</a>
              </div>
              <div className="payment">
                <h1>Wire transfer</h1>
                <p>
                  • To pay by wire transfer, complete checkout and a member of
                  the Artsy team will contact you with next steps by email.
                </p>
                <p>
                  • Please inform your bank that you will be responsible for all
                  wire transfer fees.
                </p>
              </div>
            </div>
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
                <div className="content-item">$12,500.00</div>
              </div>
              <div className="info-order_item">
                <div className="title-item">Shipping</div>
                <div className="content-item">$0.00</div>
              </div>
              <div className="info-order_item">
                <div className="title-item">Tax*</div>
                <div className="content-item">$1,109.38</div>
              </div>
              <div id="total-item" className="info-order_item">
                <div className="title-item">Total</div>
                <div className="content-item">$13,609.38</div>
              </div>
            </div>
          </div>
        </div>
        
              <a className="next-offer">Completed</a>
            
      </div>
    </div>
  );
}

export default Review;
