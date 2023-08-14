import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import fetchTaps from "./common/fetchTaps";
import TapContainer from "./components/tapContainer/tapContainer";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [tapData, setTapData] = useState(null);

  const fetchTapData = async () => {
    try {
      const tapResponse = await fetchTaps();
      if (tapResponse.ok) {
        const tapData = await tapResponse.json();
        const filteredTapData = tapData.filter(
          (tap) => tap.current_keg !== null
        );
        setTapData(filteredTapData);
        setIsAuthorized(true); // Mark as authorized after fetching tap data
      } else {
        console.error(
          "An error occurred while fetching tap data:",
          tapResponse.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect called");
    console.log("isAuthorized:", isAuthorized);
    fetchTapData();
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <>
        <div className="app-container">
          <div className="header">
            <img className="logo" src="./logo.png" alt="Taplist Wizard" />
            <h1>Taplist Integration Wizard</h1>
          </div>
          <Routes>
            <Route path="/" element={isAuthorized ? null : <AuthForm />} />
          </Routes>
        </div>
        {isAuthorized && (
          <div className="tap-data-container">
            <TapContainer
              tapData={tapData}
              setTapData={setTapData}
              setIsAuthorized={setIsAuthorized} // Pass setIsAuthorized to update authorization status
              fetchTapData={fetchTapData}
            />
          </div>
        )}
      </>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
