import React from 'react'
import "../../css/footer.css"
import { NavLink, Link, useNavigate } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <link rel="stylesheet" href="assets/css/footer.css" />
      <footer className="ct-footer" >
        <div className="container-fluids">
          <nav id="footer-navigation">
            <ul id="menu-menu-1" className="menu">
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-114"
              >
                <Link to={`/artwork`}>
                <a >Artworks</a></Link>
              </li>
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-176"
              >
                <Link to={`/artists`}><a href="/artists">Artists</a></Link>
              </li>
              {/* <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-299"
              >
                <a href="/viewingroom">ViewingRooms</a>
              </li> */}
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-113"
              >
                <Link to={`/event`}>
                <a href="/event">Events</a></Link>
              </li>
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-109"
              >
                <Link to={`/about`}>
                <a href="/about">About Us</a></Link>
              </li>
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"
              >
                <Link to={`/contact`}><a href="/contact">Contact Us</a></Link>
              </li>
            </ul>
            <a href="#top" className="ct-smooth-scroll" id="ct-scroll-top"
              ><em className="ti-angle-up"></em> <i class="fa-solid fa-angle-up"></i>Back to top of the page</a
            >
          </nav>
          <div id="absolute-footer">
            <div className="row">
              <aside
                id="text-1"
                className="col-12 col-md-2 text-center text-md-left sidebar-widget widget_text"
              >
                <div className="textwidget">
                <p>
                <a href="#">
                  <i className="far fa-fw fa-facebook fab fa-lg"></i>
                </a>
                <a href="#" target="_self" className="nice-scroll" rel="noopener">
                  <i className="far fa-fw fa-twitter fab fa-lg"></i>
                </a>
                <a href="#" target="_self" className="nice-scroll" rel="noopener">
                  <i className="far fa-fw fa-instagram fab fa-lg"></i>
                </a>
                <a href="#" target="_self" className="nice-scroll" rel="noopener">
                  <i className="far fa-fw fa-pinterest fab fa-lg"></i>
                </a>
              </p>
                </div>
              </aside>
              <aside
                id="text-2"
                className="col-12 col-md-4 text-center text-md-left sidebar-widget widget_text"
              >
                <div className="textwidget">
                  <p>
                    Morbi odio eros, volutpat ut pharetra vitae, lobortis sed
                    nibh. Donec sed odio operae, eu vulputate felis rhoncus. Quo
                    usque tandem abutere, Catilina, patientia nostra? Etiam
                    habebis sem dicantur.
                  </p>
                </div>
              </aside>
              <aside
                id="text-3"
                className="col-6 col-md-2 offset-md-2 text-center text-md-left ml-auto sidebar-widget widget_text"
              >
                <div className="textwidget">
                  <p>
                    Art Gallery WP<br />
                    36 Battersea Square, London<br />
                    Tel: 01624-621440
                  </p>
                </div>
              </aside>
              <aside
                id="text-4"
                className="col-6 col-md-2 offset-md-1 text-center text-md-left sidebar-widget widget_text"
              >
                <div className="textwidget">
                  <p>
                    Terms &#038; conditions<br />
                    Privacy policy &#038; cookies<br />
                    Terms of use
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
