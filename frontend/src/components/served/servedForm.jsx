import fetchServed from "../../common/fetchServed";

const ServedForm = ({
  currentTapNumber,
  fetchTapData,
  setTapData,
  setShowAuthForm,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const served_amount = e.target.elements.served_amount.value;
    try {
      await fetchServed(currentTapNumber, served_amount);
      e.target.reset();
      fetchTapData(setTapData, setShowAuthForm);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="served-amount"
        type="number"
        placeholder="Enter served amount in ml"
        name="served_amount"
        onFocus={(e) => e.target.setAttribute("placeholder", "")}
        onBlur={(e) =>
          e.target.setAttribute("placeholder", "Enter served amount in ml")
        }
      />
      <button className="served-submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ServedForm;
