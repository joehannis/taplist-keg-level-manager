import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../auth/AuthForm";

const App = () => {
  const [showAuthForm, setShowAuthForm] = useState(true);
  const [tapData, setTapData] = useState(null);

  const navigate = useNavigate();

  const closeAuthForm = () => {
    setShowAuthForm(false);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Taplist Integration Wizard</h1>
      </div>

      {showAuthForm && (
        <AuthForm
          navigate={navigate}
          onClose={closeAuthForm}
          setTapData={setTapData}
        />
      )}
    </div>
  );
};

export default App;
