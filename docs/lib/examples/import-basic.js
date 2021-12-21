import React from 'react';
import { Player } from '../../../src/index';

export default props => {
  return (
    <Player
      canSeekTime={20}
      playsInline
      poster="/assets/poster.png"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  );
};
