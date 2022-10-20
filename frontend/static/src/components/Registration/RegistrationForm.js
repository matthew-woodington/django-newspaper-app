import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
///
import { useNavigate } from "react-router-dom";

function RegistrationForm({ superState, setSuperState }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const checkSamePass = (e) => {
    if (user.password1 !== user.password2) {
      alert("Please enter matching passwords.");
      return;
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      navigate("/profile");
      setSuperState({ ...superState, auth: true, admin: data.is_superuser, authorID: data.id });
    }
  };

  return (
    <Form onSubmit={checkSamePass}>
      <h1>Register</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={user.username}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password1"
          value={user.password1}
          onChange={handleInput}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password2">
        <Form.Control
          type="password"
          placeholder="Enter password again"
          name="password2"
          value={user.password2}
          onChange={handleInput}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}

export default RegistrationForm;
