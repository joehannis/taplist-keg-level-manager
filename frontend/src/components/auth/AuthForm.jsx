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
      <h2>Enter your details</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your venue name" name="venue" />
        <input
          type="text"
          placeholder="Enter your Auth Token"
          name="auth_token"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AuthForm;
