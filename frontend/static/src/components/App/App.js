import Articles from "../Articles/Articles";
import LoginForm from "../Login/LoginForm";
import RegistrationForm from "../Registration/RegistrationForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <LoginForm />
      <RegistrationForm />
      <Articles />
    </div>
  );
}

export default App;
