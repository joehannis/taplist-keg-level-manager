import fetchAuth from "../../common/fetchAuth";

const AuthForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const venue = event.target.elements.venue.value;
    const auth_token = event.target.elements.auth_token.value;

    try {
      await fetchAuth(venue, auth_token);
      event.target.reset();
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
              placeholder="Enter your Auth Token"
              name="auth_token"
            />
          </div>
          <div>
            <p>
              <button className="auth-submit" type="submit">
                Submit
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
