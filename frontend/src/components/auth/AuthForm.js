import React, { useState } from "react";

const AuthForm = (props) => {
  const [venue, setVenue] = useState("");
  const [auth_token, setAuth_Token] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/", {
      method: "post",
      body: JSON.stringify({
        venue: venue,
        auth_token: auth_token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        // Handle the response data as needed
      });
  };

  const handleVenueChange = (event) => {
    setVenue(event.target.value);
  };

  const handleAuthTokenChange = (event) => {
    setAuth_Token(event.target.value);
  };

  return (
    <>
      <h2>Enter your details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your venue name"
          value={venue}
          onChange={handleVenueChange}
        />
        <input
          type="text"
          placeholder="Enter your Auth Token"
          value={auth_token}
          onChange={handleAuthTokenChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AuthForm;
