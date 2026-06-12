import { Composition } from 'remotion';
import { Episode2 } from './Episode2';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Episode2"
      component={Episode2}
      durationInFrames={2400}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
