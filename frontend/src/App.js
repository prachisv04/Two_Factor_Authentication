import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import QrCode from "./components/QrCode";
import VerifyCode from "./components/VerifyCode";
import './App.css';


function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Profile props={props} />} />
          <Route
            exact
            path="/login"
            element={<Signin props= {props} />}
          />
          <Route
            exact
            path="/register"
            element={<Signup props= {props} />}
          />
          <Route
            exact
            path="/verify"
            element={<VerifyCode props= {props} />}
          />
          <Route
            exact
            path="/qrcode"
            element={<QrCode props={props} />}
          />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;