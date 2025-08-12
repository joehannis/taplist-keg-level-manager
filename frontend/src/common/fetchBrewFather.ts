import type { BrewFather } from '@taplist-keg-level-manager/shared';
const fetchBrewFather = async (): Promise<BrewFather[] | undefined> => {
  console.log('fetchBrewFather triggered');

  try {
    const response: Response = await fetch('http://localhost:3000/brewfather');
    const data: BrewFather[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching BrewFather data:', error);
    return undefined;
  }
};

export default fetchBrewFather;
