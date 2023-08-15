import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import fetchTapData from "./common/fetchTapData";
import TapContainer from "./components/tapContainer/tapContainer";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem("auth_token") !== null
  );
  const [tapData, setTapData] = useState(null);

  useEffect(() => {
    if (isAuthorized) {
      fetchTapData({ setTapData, setIsAuthorized });
    }
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="header">
          <img className="logo" src="./logo.png" alt="Taplist Wizard" />
          <h1>Taplist Integration Wizard</h1>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthorized ? (
                <TapContainer
                  tapData={tapData}
                  setTapData={setTapData}
                  setIsAuthorized={setIsAuthorized}
                />
              ) : (
                <AuthForm
                  setTapData={setTapData}
                  setIsAuthorized={setIsAuthorized}
                />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
