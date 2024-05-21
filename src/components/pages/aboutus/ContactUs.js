import React from "react";
import "../../../css/contact.css";
function ContactUs() {
  return (
    <div className="contact-page">
      {/* <link rel="stylesheet" href="assets/css/contact.css" /> */}

      <div className="top-page">
        <h1 className="title-contact_page">Contact Us</h1>

        {/* <div className="vertical-line"></div> */}
        <div className="demo-page">
          <p>
            Our Contact page is the direct line to reach us. We're eager to hear
            from you and ready to address any inquiries or feedback you may
            have. Don't hesitate to drop us a message to share your thoughts,
            request assistance, or simply say "Hello." We're always here to
            support you!
          </p>
        </div>
      </div>
      <div className="content-contact_page">
        <div className="img-contact">
          <img src="assets/images/home/contact.jpeg"></img>
        </div>
        <div className="main-content_contact">
          <div className="time-event-contact">
            <h3>Hours</h3>
            <p>DAYS WITH AN EVENT</p>
            <br />
            <p>Open until 30 minutes into the event</p>
            <br />
            <p>REGULAR EXHIBITION HOURS</p>
            <br />
            <br />
            <p>Monday to Friday / 9.30am–5pm </p>
            <br />
            <p>Saturday / 10.30am–5pm</p>
            <br />
            <p>Sunday / 1 hour before events</p>
            <br />
          </div>
          <form id="contact-form" method="post" action="/submit">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            {/* <div class="form-group">
              <label for="subject">Subject:</label>
              <input type="text" id="subject" name="subject" required />
            </div> */}
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button className="butcontact" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
