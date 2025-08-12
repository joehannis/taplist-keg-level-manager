const convertVolume = (
  volumeMl: number,
  unit: 'us-imperial' | 'british-imperial' | 'metric'
) => {
  switch (unit) {
    case 'us-imperial':
      return { value: Math.trunc(volumeMl / 29.6), unit: 'oz' };
    case 'british-imperial':
      return { value: Math.trunc(volumeMl / 568), unit: 'pints' };
    case 'metric':
    default:
      return { value: Math.trunc(volumeMl), unit: 'ml' };
  }
};

export default convertVolume;
