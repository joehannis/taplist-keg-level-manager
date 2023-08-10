import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import fetchTaps from "./common/fetchTaps";

const App = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [tapData, setTapData] = useState(null);

  useEffect(() => {
    const fetchTapData = async () => {
      try {
        const tapResponse = await fetchTaps();
        if (tapResponse.ok) {
          const tapData = await tapResponse.json();
          console.log(tapData);

          // Filter out items that don't have a current_keg property
          const validTapData = tapData.filter((tap) => tap.current_keg);

          // Map to get the current_keg objects
          const sortTapData = validTapData.map((tap) => tap.current_keg);

          setTapData(sortTapData);
          setShowAuthForm(false);
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

    fetchTapData();
  }, []);

  return (
    <BrowserRouter>
      <>
        <div className="app-container">
          <div className="header">
            <h1>Taplist Integration Wizard</h1>
          </div>
          <Routes>
            <Route path="/" element={showAuthForm ? <AuthForm /> : null} />
          </Routes>
        </div>
        <div className="tap-data-container">
          {tapData !== null &&
            tapData.map(
              (tap) => (
                console.log(tap),
                (
                  <div key={tap.current_tap_number} className="tap-item">
                    <p>Tap Number: {tap.current_tap_number}</p>
                    <p>Beer Name: {tap.beverage.name}</p>
                    <p>ABV: {tap.beverage.abv_percent}</p>
                    <p>Style: {tap.beverage.style.style}</p>
                    {/* <p>Beer Name: {tap.current_keg.name}</p> */}
                  </div>
                )
              )
            )}
        </div>
      </>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
