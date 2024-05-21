import { useState, useEffect } from "react";
import "../../../../css/profile.css"
import "../../../../css/bootstrap.css"
import { getAccessToken, removeAccessToken } from "../../../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../services/api"
import url from "../../../../services/url"
import "../../../../css/bootstrap.css"
import Swal from "sweetalert2";
function AccountSettings() {
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Please enter your password.";
      valid = false;
    } else if (formData.currentPassword.length < 6) {
      newErrors.currentPassword = "Password must be at least 6 characters.";
      valid = false;
    } else if (formData.currentPassword.length > 50) {
      newErrors.currentPassword = "Password must be less than 50 characters.";
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Please enter a new password.";
      valid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters.";
      valid = false;
    } else if (formData.newPassword.length > 50) {
      newErrors.newPassword = "New password must be less than 50 characters.";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      valid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userToken = getAccessToken();

      if (userToken) {
        const isConfirmed = await Swal.fire({
          title: "Are you sure?",
          text: "you want to change your password?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "I'm sure",
        });
        if (isConfirmed.isConfirmed) {
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            };

            const requestData = {
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword,
              confirmPassword: formData.confirmPassword,
            };

            const passwordResponse = await api.post(url.AUTH.CHANGE_PASSWORD, requestData, config);

            if (passwordResponse.data.success) {
              removeAccessToken();

              navigate("/login");
            }
          } catch (error) {
            Swal.fire({
              title: "Change Password Fail",
              text: "Password error!",
              icon: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Done",
            });
          }
        }
      } else {
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const loadProfile = async () => {
    const userToken = getAccessToken();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const profileResponse = await api.get(url.AUTH.PROFILE, config);
      setInfo(profileResponse.data);
    } catch (error) { }
  };

  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <div class="passet-page">
      <link rel="stylesheet" href="assets/css/profile/accountsetting.css" />

      <div class="container-passet">
      <div
          class="menu"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            class="menu-left d-flex align-items-center"
            style={{ width: "300px" }}
          >
            <img
              className="igh"
              src="./assets/images/home/4.jpeg"
              alt=""
              style={{ borderRadius: "50%", width: "100px" }}
            />
            <div class="menu-left-right ml-3">
              <h3>{info.fullname}</h3>
              <p className="poi" style={{ color: "#707070" }}>
                Member since 2024
              </p>
            </div>
          </div>
          <div class="menu-right">
            <Link to={`/edit-profile`}>
            <a>
              <button class="btn-1">Settings</button>
            </a>
            </Link>
          </div>
        </div>
        <div class="menu-bottom">
          {/* <p className="poi">{info.fullname}</p> */}
          <p className="poi" style={{ color: "#707070", margin:"20px 0 0 10px" }}>
            <i class="fa-solid fa-location-dot"></i> VietNam
          </p>
        </div>
        <div class="navbar">
          <nav class="navbar navbar-expand-lg navbar-light w-100">
            <div class="container-fluid">
              <div
                class="collapse navbar-collapse nav-fill"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav w-100 justify-content-between">
                  <li class="nav-item">
                    <a
                      style={{ color: "#000" }}
                      class="nav-link"
                      href="/profile"
                    >
                      Profile
                    </a>
                  </li>
                  <li class="nav-item">
                    <Link to={`/artwork-saves`}>
                      <a class="nav-link">
                        Saves
                      </a>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to={`/artist-follow`}>
                      <a class="nav-link">
                        Follows
                      </a>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to={`/setting`}>
                      <a class="nav-link">
                        Password Setting
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <hr />
        </div>
        <div class="information">
          <h3>Password</h3>
          <form className="comment-form" onSubmit={handleChangePassword}>
            <div class="input-row">
              <input
                className={`ttt ${formErrors.currentPassword ? "is-invalid" : ""}`}
                type="password"
                id="password"
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              {formErrors.currentPassword && <p className="invalid-feedback">{formErrors.currentPassword}</p>}
            </div>
            <div class="input-row">
              <input
                className={`ttt ${formErrors.newPassword ? "is-invalid" : ""}`}
                type="password"
                id="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              {formErrors.newPassword && <p className="invalid-feedback">{formErrors.newPassword}</p>}
            </div>
            <div class="input-row">
              <input
                className={`ttt ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                type="password"
                id="password"
                placeholder="Confirm your Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formErrors.confirmPassword && <p className="invalid-feedback">{formErrors.confirmPassword}</p>}
            </div>
            <div  class="button-edit_pass">
              <button
                style={{ backgroundColor: "#000", color: "#fff" }}
                type="submit"
                class="button-edit_pass2"
                value="Change Password"
              >
                Save Changes
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
