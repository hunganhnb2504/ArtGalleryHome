import React from "react";
import "../../../css/about.css";
function AboutUs() {
  return (
    <div>
      {/* <link rel="stylesheet" href="assets/css/about.css" /> */}

      <div className="About-page">
        <div className="aboutUs-section">
          <div className="main-about">
            <h2 className="title-about_section">About Us</h2>
            <div className="content-about_section">
              <p className="peoia">
                Welcome to Art Gallery - the realm of wonder and ceaseless
                creativity. At Art Gallery, we are passionate about exploring
                and experiencing unique and diverse artworks from around the
                world.
              </p>
              <div className="more-info">
                <div className="repdip">
                  At Art Gallery, we're dedicated to weaving a tapestry of
                  cultural convergence through the language of art. We celebrate
                  talent, curate exquisite experiences, and invite all to
                  explore the boundless beauty of creativity with us.
                </div>
                <div className="repdip">
                  Art Gallery is more than just an art display space; it is a
                  community where everyone can find passion and inspiration in
                  art. Our team consists of art experts, event organizers, and
                  art enthusiasts who are eager to share their passion and
                  knowledge with you.
                </div>
                <div className="repdip">
                  Join us at Art Gallery to embark on a journey of artistic
                  exploration, to seek inspiration, and to create beautiful
                  memories in our world of art.
                </div>
                <div className="repdip">Sir Marcus McKellen Founder & Artist (HFC)</div>
              </div>
            </div>
          </div>
          <div className="img-about">
            <img className="imgabout" src="assets/images/about.jpeg"></img>
          </div>
        </div>
        <div className="staff-section">
        
          <div className="main-staff_section">
            <h2 className="title-about_section">Staff & Board</h2>
            

            <p className="peoia">
              Art Gallery is led by co-CEOs, Artistic Director John Crawford and
              Executive Producer William Thompson. The Executives are supported
              by the core artistic team: Samuel Olivier (Resident Dramaturg),
              Jordan Tyson (Associate Producer), Martin Scott (Director in
              Residence) and Susan Brown (Resident Artist).
            </p>
            <span className="hdgbad">
              BOARD MEMBERS / Adam Auster (Chair), Ben Miller (Deputy Chair),
              Heidi Lana AM, Andrew Johnson QC, Ronnie Brown, Michelle May, John
              Stevenson AM, Angelina Rey, Amy Tyson, Martin Bell, Tasha Rufus,
              Laura Lanzeti AO & Rodrigo Gomez.
            </span>
            <div className="staff-img">
               <img className="imgstaff" src="assets/images/team-staff.jpeg"></img>
          </div>
            <div className="more-info">
              <div className="left-sec">
                <div>
                  <h3 className="hatbabe">ARTISTIC & PROGRAMMING</h3>
                  <p className="peoan">
                    ARTISTIC DIRECTOR & CO-CEO / John Crawford EXECUTIVE
                    PRODUCER & CO-CEO / William Thompson RESIDENT ARTIST /
                    Samuel Olivier DIRECTOR IN RESIDENCE / Martin Scott RESIDENT
                    ARTIST / Susan Brown RESIDENT DESIGNER / Tony Rufus PRODUCER
                    / Andrew McNamara ASSOCIATE PRODUCER / Jordan Tyson COMPANY
                    MANAGER / Amanda Fields
                  </p>
                </div>
                <div>
                  <h3 className="hatbabe">FINANCE & ADMINISTRATION</h3>
                  <p className="peoan">
                    FINANCE MANAGER / Adam Scarlett FINANCE ADMINISTRATOR /
                    Debbie Fox GENERAL MANAGER / Liz Gaudini
                  </p>
                </div>
              </div>
              <div className="right-sec">
                <div>
                  <h3 className="hatbabe">PRODUCTION</h3>
                  <p className="peoan">
                    PRODUCTION MANAGER / Ernst Pynchon WORKSHOP MANAGER / Daniel
                    Auster TECHNICAL MANAGER / William Twain OPERATIONS MANAGER
                    / Tony Miller HEAD TECHNICIAN / Jason Lanzeti HEAD CARPENTER
                    / Michelle Lana
                  </p>
                </div>
                <div>
                  <h3 className="hatbabe">EDUCATION</h3>
                  <p className="peoan">YOUTH & EDUCATION MANAGER / Tatiana Alexis</p>
                </div>
                <div>
                  <h3 className="hatbabe">VENUE MANAGEMENT</h3>
                  <p className="peoan">
                    VENUE MANAGER / James Bell FRONT OF HOUSE MANAGERS / Harry
                    Olivier & Marta Crawford
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
