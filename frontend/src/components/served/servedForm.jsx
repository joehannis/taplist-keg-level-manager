import fetchServed from "../../common/fetchServed";
import fetchReset from "../../common/fetchReset";

const ServedForm = ({
  currentTapNumber,
  fetchTapData,
  setTapData,
  setIsAuthorised,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const served_amount = e.target.elements.served_amount.value;
    try {
      await fetchServed(currentTapNumber, served_amount);
      e.target.reset();
      fetchTapData(setTapData, setIsAuthorised);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const confirmReset = window.confirm(
      "Are you sure you want to reset the keg volume?"
    );
    if (confirmReset) {
      try {
        await fetchReset(currentTapNumber);
        fetchTapData(setTapData, setIsAuthorised);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          className="served-text"
          type="number"
          placeholder="Enter served amount in ml"
          name="served-text"
          onFocus={(e) => e.target.setAttribute("placeholder", "")}
          onBlur={(e) =>
            e.target.setAttribute("placeholder", "Enter served amount in ml")
          }
        />
      </div>
      <button className="served-submit" type="submit">
        Submit
      </button>
      <p>
        <button className="served-submit" onClick={handleReset} type="submit">
          Reset
        </button>
      </p>
    </form>
  );
};

export default ServedForm;
