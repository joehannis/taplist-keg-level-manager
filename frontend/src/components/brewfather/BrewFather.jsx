import './brewfather.css';

const BrewFather = ({ brewFatherData }) => (
  <div className='brewfather-results'>
    {brewFatherData &&
      brewFatherData.map((batch) => (
        <div key={batch._id} className='brewfather-batch'>
          <h3 className='recipe-name'>{batch.recipe.name}</h3>
          <p>Started: {new Date(batch.brewDate).toDateString()}</p>
        </div>
      ))}
  </div>
);

export default BrewFather;
