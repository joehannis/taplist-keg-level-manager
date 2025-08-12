import convertVolume from '../../utils/convertVolume';

type VolumeDisplayProps = {
  volumeMl: number;
  unit: 'us-imperial' | 'british-imperial' | 'metric';
  kegPercentFull: number;
};

const VolumeDisplay: React.FC<VolumeDisplayProps> = ({
  volumeMl,
  unit,
  kegPercentFull,
}) => {
  const { value, unit: unitLabel } = convertVolume(volumeMl, unit);
  return (
    <p>
      {value} {unitLabel} / {Math.trunc(kegPercentFull)}% full
    </p>
  );
};

export default VolumeDisplay;
