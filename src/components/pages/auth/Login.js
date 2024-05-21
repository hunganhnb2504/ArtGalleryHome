import React, { useState, useEffect } from "react";
import { setAccessToken } from "../../../utils/auth";
import { useNavigate, useLocation   } from "react-router-dom";
import url from "../../../services/url";
import api from "../../../services/api";
import Swal from "sweetalert2";
import "../../../css/login.css"
function LoginAndRegister() {
  const navigate = useNavigate();
  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []);

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const [formErrorsLogin, setFormErrorsLogin] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    fullname: "",
    phone:"",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullname: "",
    phone:"",
    email: "",
    password: "",
  });

  const parseQueryString = (query) => {
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormDataLogin({ ...formDataLogin, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.fullname) {
      newErrors.fullname = "Please enter your full name.";
      valid = false;
    } else if (formData.fullname.length < 3) {
      newErrors.fullname = "Full name must have at least 3 characters";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Please enter your email address.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password.";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    } else if (formData.password.length > 50) {
      newErrors.password = "Password must be less than 50 characters.";
      valid = false;
    }


    if (!formData.phone) {
      newErrors.phone = "Please enter your phone number.";
      valid = false;
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 characters.";
      valid = false;
    } else if (formData.phone.length > 10) {
      newErrors.phone = "Phone number must be less than 11 characters.";
      valid = false;
    }
    setFormErrors(newErrors);
    return valid;
  };

  const validateFormLogin = () => {
    let valid = true;
    const newErrors = {};

    if (!formDataLogin.email) {
      newErrors.email = "Please enter your email address.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDataLogin.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formDataLogin.password) {
      newErrors.password = "Please enter your password.";
      valid = false;
    } else if (formDataLogin.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    } else if (formDataLogin.password.length > 50) {
      newErrors.password = "Password must be less than 50 characters.";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const registerRequest = await api.post(url.AUTH.REGISTER, formData);

        if (registerRequest.status === 201) {
          Swal.fire({
            title: "Register Success",
            text: "Register Success!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/login");
        }
        else if (registerRequest.status === 400) {
          Swal.fire({
            title: "Email already exist",
            text: "Email already exist!",
            icon: "warning",
            confirmButtonText: "OK",
          })
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateFormLogin()) {
      try {
        const loginRequest = await api.post(url.AUTH.LOGIN, formData);

        if (loginRequest.status === 200 || loginRequest.status === 201) {
          const token = loginRequest.data.data;
          setAccessToken(token);

          const redirectPath = localStorage.getItem("redirectPath") || "/";
          localStorage.removeItem("redirectPath");
          navigate(redirectPath);
        } else {
          setFormErrors({
            email: "Invalid email or password.",
            password: "Invalid email or password.",
          });
        }
      } catch (error) {
        setFormErrors({
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        });
      }
    }
  };

  return (

    <div class="dip">
      <div class="containerst" id="container">
        <div class="form-container sign-up">
          <form className="natto" onSubmit={handleRegister}>
            <h1 style={{fontSize: '3rem'}}>Create Account</h1>
            {/* <div class="social-icons">
              <a href="#" class="icon">
                <i class="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#" class="icon">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for regiteration</span> */}
            <input
              className="lkjha"
              type="text"
              placeholder="Name"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              autoFocus
            />
            {formErrors.fullname && (
              <p className="invalid-feedback">{formErrors.fullname}</p>
            )}
            <input
            className="lkjha"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className="invalid-feedback">{formErrors.email}</p>
            )}
            <input
            className="lkjha"
              type="tel"
              placeholder="Phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && (
              <p className="invalid-feedback">{formErrors.phone}</p>
            )}
            <input
            className="lkjha"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />{" "}
            {formErrors.password && (
              <p className="invalid-feedback">{formErrors.password}</p>
            )}
            <button className="toon" type="submit">Sign Up</button>
          </form>
        </div>
        <div class="containerst" id="container">
          <div class="form-container sign-in">
            <form className="natto" onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <div class="social-icons">
                <a href="#" class="icon">
                  <i class="fa-brands fa-google-plus-g"></i>
                </a>
                <a href="#" class="icon">
                  <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" class="icon">
                  <i class="fa-brands fa-github"></i>
                </a>
                <a href="#" class="icon">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
              <span className="qir">or use your email password</span>
              <input
              className="lkjha"
                type="email"
                placeholder="Email"
                id="emaillogin"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <p className="invalid-feedback">{formErrors.email}</p>
              )}
              <input
              className="lkjha"
                type="password"
                placeholder="Password"
                id="passwordlogin"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <p className="invalid-feedback">{formErrors.password}</p>
              )}
              <a className="hjio" href="#">Forgot Your Password?</a>
              <button className="toon" type="submit">Sign In</button>
            </form>
          </div>
          <div class="toggle-container">
            <div class="toggle">
              <div class="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p className="ufo">Enter your personal details to use all of site features</p>
                <button class="hidden" id="login">
                  Sign In
                </button>
              </div>
              <div class="toggle-panel toggle-right">
                <h1>Hello, Friend</h1>
                <p className="ufo">
                  Register with your personal details to use all of site
                  features
                </p>
                <button class="hidden" id="register">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAndRegister;
