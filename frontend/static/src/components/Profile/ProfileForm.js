import "../../styles/Form.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Images/default-profile.jpg";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const [profile, setProfile] = useState({
    avatar: null,
  });
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const handleError = (err) => {
    console.warm(err);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setProfile({
      ...profile,
      [e.target.name]: file,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", profile.avatar);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("/api/v1/profiles/", options).catch(handleError);
    const data = await response.json();
    console.log(data);
    navigate("/");
  };

  return (
    <div className="main-display-area">
      <Form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Profile</h1>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Choose a Profile Picture</Form.Label>
          <Form.Control type="file" name="avatar" onChange={handleImage} />
        </Form.Group>
        <section className="form-footer image-section">
          <div className="image-container">
            {profile.avatar && <img className="form-image" src={preview} alt="" />}
          </div>
        </section>
        <div className="form-footer">
          <Button className="form-button" type="submit" variant="dark">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProfileForm;
