import './index.scss';

import React from 'react';
import classNames from 'classnames';

export default function Note({
  id,
  track = -1,
  step = -1,
  playing = false,
  on = false,
  onClick = (track, step, on) => {},
}) {
  const noteClass = classNames('sequencer__note', {
    'sequencer__note--on': on,
    'sequencer__note--playing': playing
  });

  return (
    <div
      id={id}
      className={noteClass}
      onClick={() => onClick(track, step, !on)}
    />
  );
}