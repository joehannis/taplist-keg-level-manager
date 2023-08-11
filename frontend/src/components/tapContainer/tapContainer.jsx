import React from "react";
import ServedForm from "../served/servedForm";

const TapContainer = ({
  tapData,
  setTapData,
  setShowAuthForm,
  fetchTapData,
}) => {
  console.log(tapData);
  return (
    <div className="tap-data-container">
      {tapData !== null &&
        tapData.map((tap) => (
          <div key={tap.current_keg.current_tap_number} className="tap-item">
            <img
              className="glass-image"
              src={tap.current_keg.beverage.glassware_illustration_url}
              alt="beer label"
            />
            <p>Tap Number: {tap.current_keg.current_tap_number}</p>
            <p>Beer Name: {tap.current_keg.beverage.name}</p>
            <p>ABV: {tap.current_keg.beverage.abv_percent}</p>
            <p>Style: {tap.current_keg.beverage.style.style}</p>
            <p>
              Remaining Keg Volume:
              {tap.current_keg.remaining_volume_ml} ml
            </p>
            <ServedForm
              currentTapNumber={tap.current_keg.current_tap_number}
              setTapData={setTapData}
              setShowAuthForm={setShowAuthForm}
              fetchTapData={fetchTapData}
            />
          </div>
        ))}
    </div>
  );
};

export default TapContainer;
