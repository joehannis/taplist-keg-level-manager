import './BrewfatherContainer.css';
import type { BrewFather } from '@taplist-keg-level-manager/shared';

interface BrewFatherContainerProps {
  brewFatherData: BrewFather[] | null;
}

const BrewFatherContainer = ({ brewFatherData }: BrewFatherContainerProps) => (
  <div className='brewfather-container'>
    <h2 className='brewfather-container-title'>Upcoming Batches</h2>
    <div className='scroll-wrapper'>
      <div className='brewfather-results'>
        {brewFatherData ? (
          brewFatherData.map((batch) => (
            <div key={batch.id} className='brewfather-batch'>
              <h3 className='recipe-name'>{batch.recipe.name}</h3>
              <p>Brewed: {new Date(batch.brewDate).toDateString()}</p>
              <p>Status: {batch.status}</p>
            </div>
          ))
        ) : (
          <p>No upcoming batches found.</p>
        )}
      </div>
    </div>
  </div>
);

export default BrewFatherContainer;
