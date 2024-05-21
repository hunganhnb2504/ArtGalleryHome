import { useState, useEffect } from "react";
import { getAccessToken, removeAccessToken } from "../../../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import url from "../../../../services/url";
import Swal from "sweetalert2";
import { format } from "date-fns";
import "../../../../css/edit.css";

function Edit() {
  const [anhs, setAnhs] = useState([]);
  const [info, setInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});

  const incacanh = () =>
    [...anhs].map((anh) => (
      <div>
        <img
          style={{ borderRadius: "50%", width: "100px", height: "100px", marginLeft:"450px" }}
          src={URL.createObjectURL(anh)}
        />
      </div>
    ));

  const handleSaveClick = async () => {
    try {
      const userToken = getAccessToken();

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const formData = new FormData();

      for (const key in editedInfo) {
        formData.append(key, editedInfo[key]);
      }

      // Send the request
      const isConfirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You want to update your information?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "I'm sure",
      });

      if (isConfirmed.isConfirmed) {
        const updateResponse = await api.put(
          url.AUTH.UPDATE_PROFILE,
          formData,
          config
        );

        if (updateResponse.status === 204) {
          console.log("Successfully updated");
        } else {
        }
      }

      // Update the local state with edited information
      setInfo(editedInfo);
      setIsEditing(false);
    } catch (error) {}
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
    } catch (error) {}
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onFileUploadHandler = (e) => {
    setAnhs(e.target.files);
  };
  return (
    <div className="formedit-editPage">
      {/* {/ <link rel="stylesheet" href="assets/css/edit.css" /> /} */}
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
      <nav style={{ marginTop: "50px" }} id="profile-navigation">
        <ul className="ghye">
          <li className="hjpk">
            <Link to={`/edit-profile`}>
              <a className="lkm">Edit Profile</a>
            </Link>
          </li>
          <li className="hjpk">
            <Link to={`/offer-history`}>
              <a className="lkm">Offer History</a>
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="hrdev" style={{ marginTop: "10px" }} />
      <div class="edit-section">
        <div class="edit-section_file">
          <div class="menu-left-right ml-3">
            <input
              className="upimg"
              type="file"
              accept="image/*"
              onChange={onFileUploadHandler}
            />
            <div className="image-gallery">{incacanh()}</div>
          </div>

          <div class="hhh">
            <div class="containeredit-editPage">
              <div class="entryarea">
                <input
                  className="inedit"
                  type="text"
                  value={editedInfo.fullname || ""}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, fullname: e.target.value })
                  }
                  required
                />
                <div class="labelline">Name</div>
              </div>
            </div>
          </div>

          <div class="hhh">
            <div class="containeredit-editPage">
              <div class="entryarea">
                <input
                  className="inedit"
                  type="tel"
                  value={editedInfo.phone || ""}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, phone: e.target.value })
                  }
                  required
                />
                <div class="labelline">Phone</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSaveClick}
        class="button-save_editPage-01"
      >
        Save
      </button>
    </div>
  );
}

export default Edit;
