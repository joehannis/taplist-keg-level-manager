import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../auth/AuthForm";

const App = () => {
  const [showAuthForm, setShowAuthForm] = useState(true); // Set the initial state to true

  const navigate = useNavigate();

  const closeAuthForm = () => {
    setShowAuthForm(false);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Taplist Integration Wizard</h1>
      </div>

      {showAuthForm && <AuthForm navigate={navigate} onClose={closeAuthForm} />}
    </div>
  );
};

export default App;
