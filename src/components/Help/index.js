import './index.scss';

import React from 'react';
import classNames from 'classnames';
import Sequencer from '../Sequencer';

export default function Help({
  show = false,
  onClick = () => {},
}) {
  const helpClass = classNames('help', {
    'help--show': show,
  });

  return (
    <div
      className={helpClass}
      onClick={() => onClick()}
    >
      <h1 className='help__h1'>
        welcome to <span className='help__brand'>synthrogue</span>
      </h1>
      <p>
        program a robot to escape using a sequencer
      </p>

      <h2 className='help__h2'>how to play</h2>

      <h3 className='help__h3'>your robot</h3>
      <p>
        <span>robot</span>
        &nbsp;
        <span className='help__char help__char--robot'>@</span>
      </p>

      <h3 className='help__h3 help__h3--extra'>use sequencer to program moves then press [ play ]</h3>
      <div>
        <Sequencer
          bars={1}
          steps={[0, -1, 0, 2, 2, 1, -1, 3,]}
          currentBeat={5}
          onNoteClick={() => {}}
        />
      </div>

      <h3 className='help__h3'>find key to unlock exit</h3>
      <p>
        <span>key</span>
        &nbsp;
        <span className='help__char help__char--key'>k</span>
        &nbsp;&nbsp;&nbsp;
        &nbsp;
        <span>exit</span>
        &nbsp;
        <span className='help__char help__char--exit'>k</span>
      </p>

      <h3 className='help__h3'>avoid enemies</h3>
      <p>
        <span>zombie</span>
        &nbsp;
        <span className='help__char help__char--zombie'>Z</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>skeleton</span>
        &nbsp;
        <span className='help__char help__char--skeleton'>S</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>vampire</span>
        &nbsp;
        <span className='help__char help__char--vampire'>V</span>
      </p>

      <h3 className='help__h3'>navigate around obstacles</h3>
      <p>
        &nbsp;
        <span>wall</span>
        &nbsp;
        <span className='help__char help__char--wall'>#</span>
        &nbsp;&nbsp;&nbsp;
      </p>

      <h4 className='help__about'>
        [ hand made with <span className='help__accented'>❤</span> by <a href='https://antonmata.me' target='_blank' rel='noopener noreferrer'>anton</a> ]
      </h4>

      <p className='help__footer'>[ click anywhere to dismiss ]</p>
    </div>
  );
}