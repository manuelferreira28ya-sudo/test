import React from 'react';
import {Composition} from 'remotion';
import {SailorPieceWalkthrough} from './SailorPieceWalkthrough';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="SailorPieceWalkthrough"
        component={SailorPieceWalkthrough}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
