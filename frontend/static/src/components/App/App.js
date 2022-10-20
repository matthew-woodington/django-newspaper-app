import { useState } from "react";
import Header from "../Header/Header";
import "./App.css";
///
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../Login/LoginForm";
import RegistrationForm from "../Registration/RegistrationForm";
import ProfileForm from "../Profile/ProfileForm";
import Articles from "../Articles/Articles";

const INITIAL_STATE = {
  auth: false,
  admin: false,
  authorID: 0,
};

function App() {
  const [superState, setSuperState] = useState(INITIAL_STATE);
  return (
    <div className="App">
      <Header superState={superState} setSuperState={setSuperState} />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Articles />} />
            <Route
              path="login"
              element={<LoginForm superState={superState} setSuperState={setSuperState} />}
            />
            <Route
              path="register"
              element={<RegistrationForm superState={superState} setSuperState={setSuperState} />}
            />
            <Route path="profile" element={<ProfileForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
