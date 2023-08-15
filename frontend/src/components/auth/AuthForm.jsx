import fetchAuth from "../../common/fetchAuth";

const AuthForm = ({ setIsAuthorized }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const venue = event.target.elements.venue.value;
    const auth_token = event.target.elements.auth_token.value;

    try {
      await fetchAuth(venue, auth_token);
      event.target.reset();
      localStorage.setItem("venue", venue);
      localStorage.setItem("auth_token", auth_token);
      setIsAuthorized(true);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="auth-title">Enter your details</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="auth-text"
              type="text"
              placeholder="Enter your venue name"
              name="venue"
            />
            <input
              className="auth-text"
              type="text"
              placeholder="Enter your API key"
              name="auth_token"
            />
          </div>
          <div>
            <button className="auth-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
