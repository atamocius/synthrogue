import './index.scss';

import React from 'react';
import classNames from 'classnames';

export default function Arrow({
  rotation = 0,
  on = false,
}) {
  const arrowClass = classNames('sequencer__arrow', {
    'sequencer__arrow--on': on
  });

  return (
    <svg
      className={arrowClass}
      viewBox='-1 -1 2 2'
      transform={`rotate(${rotation})`}
    >
      <path d='M 0 -0.75 L 1 0.75 H -1 Z'/>
    </svg>
  );
}