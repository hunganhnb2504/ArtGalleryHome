import React, { useState } from "react";
import "../../../../css/registerartist.css";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import Swal from "sweetalert2";
function RegisterArtist() {
  const [formData, setFormData] = useState({
    nameArtist: "",
    biography: "",
    description: "",
    schoolOfArt: "",
    image: null,
    image_preview: null,
  });

  const [formErrors, setFormErrors] = useState({
    nameArtist: "",
    biography: "",
    description: "",
    schoolOfArt: "",
    image: null,
    image_preview: null,
  });

  const navigate = useNavigate();
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.nameArtist) {
      newErrors.nameArtist = "Please enter your full name.";
      valid = false;
    } else if (!formData.nameArtist) {
      newErrors.nameArtist = "Full name must have at least 3 characters";
      valid = false;
    }

    if (!formData.biography) {
      newErrors.biography = "Please enter your biography .";
      valid = false;
    } else if (!formData.biography) {
      newErrors.biography = "Please enter biography";
      valid = false;
    }

    if (formData.image === null) {
      newErrors.image = "Please choose photo";
      valid = false;
    }
    setFormErrors(newErrors);
    return valid;
  };

  const handleRegisterArtist = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        const registerRequest = await api.post(
          `https://localhost:7270/api/Admin/request-artist`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (registerRequest.status === 201) {
          Swal.fire({
            title: "Register Success",
            text: "Register Success!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/profile");
        } else if (registerRequest.status === 400) {
          Swal.fire({
            title: "User has already register to artist",
            text: "User has already register to artist!",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  //xử lý tải file ảnh
  const handleFileArtistChange = (e, fieldName) => {
    const { files } = e.target;
    const selectedImage = files.length > 0 ? URL.createObjectURL(files[0]) : null;
    setFormData({
      ...formData,
      [fieldName]: fieldName === "image" ? (files.length > 0 ? files[0] : null) : null,
      image_preview: selectedImage,
    });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === "image") {
      handleFileArtistChange(e, name);
    } else {
      const { value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="formedit">
      {/* <link rel="stylesheet" href="assets/css/registerartist.css" /> */}
      <div
        class="menu-left d-flex align-items-center"
        style={{ width: "300px", margin: "30px 0 0 50px" }}
      >
        <p>
          <a class="aaa" style={{ color: "#000" }} href="/profile">
            {" "}
            Profile
          </a>
        </p>
      </div>

      <hr className="hrdev" style={{ marginTop: "20px" }} />
      <form onSubmit={handleRegisterArtist}>
        <div style={{ display: "flex" }} class="edit">
          <div class="file">
            <h1 className="hatmotre">Register Artist</h1>

            <div class="kiong">
              <div class="container">
                <div class="entryarea">
                  <input
                    className="inrs"
                    type="text"
                    name="nameArtist"
                    value={formData.nameArtist}
                    onChange={handleChange}
                    autoFocus
                  />
                  <div class="labelline">Artist Name</div>
                </div>
              </div>
            </div>
            {formErrors.nameArtist && (
              <p className="invalid-feedback">{formErrors.nameArtist}</p>
            )}

            <div class="kiong">
              <div class="container">
                <div class="entryarea">
                  <input
                    className="inrs"
                    type="text"
                    name="biography"
                    // id="biography"
                    value={formData.biography}
                    onChange={handleChange}
                    autoFocus
                  />
                  <div class="labelline">Biography</div>
                </div>
              </div>
            </div>
            {formErrors.biography && (
              <p className="invalid-feedback">{formErrors.biography}</p>
            )}

            <div class="kiong">
              <div class="container">
                <div class="entryarea">
                  <input
                    className="inrs"
                    type="text"
                    name="description"
                    // id="biography"
                    value={formData.description}
                    onChange={handleChange}
                    autoFocus
                  />
                  <div class="labelline">Description</div>
                </div>
              </div>
            </div>
            {formErrors.description && (
              <p className="invalid-feedback">{formErrors.description}</p>
            )}

            <div className="kiong">
              <div className="container">
                <div className="entryarea">
                  <input
                    className="inrs"
                    type="text"
                    name="schoolOfArt"
                    value={formData.schoolOfArt}
                    onChange={handleChange}
                    autoFocus
                  />
                  <div className="labelline">School Of Arts</div>
                </div>
              </div>
              {formErrors.schoolOfArt && (
                <p className="invalid-feedback">{formErrors.schoolOfArt}</p>
              )}
            </div>

            <div class="menu-left-right ml-3" id="menu-left-right">
              <input
                className="upimgs"
                type="file"
                name="image"
                accept=".jpg, .png, .jpeg, .etc"
                onChange={handleChange}
              />

            </div>
            {formErrors.image && (
              <div className="text-danger">{formErrors.image}</div>
            )}
            <div className="col-lg-6 mb-2">
              <div className="mb-3">
                <label className="text-label form-label">Preview artist photo</label>
                {formData.image_preview && (
                  <img src={formData.image_preview} alt="Artist Preview" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
                )}
              </div>
            </div>
          </div>
        </div>
        <button type="submit" id="button-submit_registerPage">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterArtist;
