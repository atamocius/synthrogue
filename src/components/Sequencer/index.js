import './index.scss';

import React from 'react';
import Step from './Step';
import Arrow from './Arrow';

export default function Sequencer({
  bars = 2,
  steps = [],
  currentBeat = -1,
  onNoteClick,
}) {
  const stepViews = [];

  const length = bars * 8;
  for (let i = 0; i < length; i++) {
    stepViews.push(
      <Step
        key={i}
        id={i}
        tracks={4}
        playing={currentBeat === i}
        noteOn={steps[i]}
        onNoteClick={onNoteClick}
      />
    );
  }

  return (
    <div className='sequencer'>
      <div className='sequencer__track-icons'>
        <div className='sequencer__track-icon'>
          <Arrow
            rotation={-90}
            on={currentBeat !== -1 && steps[currentBeat] === 3}
          />
        </div>
        <div className='sequencer__track-icon'>
          <Arrow
            rotation={90}
            on={currentBeat !== -1 && steps[currentBeat] === 2}
          />
        </div>
        <div className='sequencer__track-icon'>
          <Arrow
            rotation={180}
            on={currentBeat !== -1 && steps[currentBeat] === 1}
          />
        </div>
        <div className='sequencer__track-icon'>
          <Arrow
            on={currentBeat !== -1 && steps[currentBeat] === 0}
          />
        </div>
      </div>
      <div className='sequencer__steps'>
        {stepViews}
      </div>
    </div>
  );
}