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
          <div className="logo-container">
            <div className="logo">
              <img src="./logo.png" alt="Taplist Wizard" />
            </div>
            <h1 className="title">Taplist Keg Level Manager</h1>
          </div>
          <div className="icon-container">
            <div className="venue">
              <h5>
                {tapData
                  ? tapData[0]?.current_keg?.beverage?.producer?.name
                  : null}
              </h5>
              <img
                className="venue-logo"
                src={
                  tapData
                    ? tapData[0]?.current_keg?.beverage?.producer?.picture
                        ?.thumbnail_url
                    : null
                }
                alt="logo"
              />
            </div>
          </div>
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
