import React, { useState } from "react";

const AuthForm = (setTapData) => {
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

  return (
    <>
      <h2>Enter your details</h2>
      <form>
        <input type="text" placeholder="Enter your venue name" value={venue} />
        <input
          type="text"
          placeholder="Enter your Auth Token"
          value={auth_token}
        />
        <button type="submit" onSubmit={handleSubmit(venue, auth_token)}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AuthForm;
