import React from 'react'
import { Link } from 'react-router-dom';
import "../../../css/thank.css";
function ThankU() {
  return (
    <div>
      <div className='ThankPage'>
          <div className='left-sec_thank'>
               <img src='assets/images/home/thankU.png'></img>
          </div>
          <div className='right-sec_thank'>
          <h2>Thank You! <i class="fa-solid fa-clipboard-check"></i></h2>
          <div>Thank you for choosing to trust and accompany us. Please pay attention to your email, we will quickly ship the package to you. </div>
          <Link to="/" className="link-home"> <a>Go to Home</a></Link>
          </div>
          
      </div>
    </div>
  )
}

export default ThankU
