import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import fetchTapData from "./common/fetchTapData";
import isAuthValid from "./common/fetchIsAuthValid";
import TapContainer from "./components/tapContainer/tapContainer";

const App = () => {
  useEffect(() => {
    isAuthValid();
  }, []);

  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem("auth_token") !== null
  );
  const [tapData, setTapData] = useState(null);
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");

  useEffect(() => {
    if (isAuthorized) {
      fetchTapData(setTapData);
    }
  }, [isAuthorized]);

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    localStorage.setItem("unit", e.target.value);
  };

  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="header">
          <div className="logo-container">
            <img className="logo" src="./logo.png" alt="Taplist Wizard" />
            <h1 className="title">Taplist Keg Level Manager</h1>
          </div>
          {isAuthorized ? (
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
          ) : null}
        </div>
        {isAuthorized && (
          <div className="unit-container">
            <select value={unit} onChange={handleUnitChange}>
              <option value="metric">Metric</option>
              <option value="us-imperial">US Imperial</option>
              <option value="british-imperial">British Imperial</option>
            </select>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              isAuthorized ? (
                <TapContainer
                  tapData={tapData}
                  setTapData={setTapData}
                  setIsAuthorized={setIsAuthorized}
                  unit={unit}
                  setUnit={setUnit}
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
