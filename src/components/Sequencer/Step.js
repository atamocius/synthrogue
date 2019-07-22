import './index.scss';

import React from 'react';
import Note from './Note';

export default function Step({
  id,
  tracks = 4,
  playing = false,
  noteOn = -1,
  onNoteClick,
}) {
  const notes = [];
  for (let i = tracks - 1; i >= 0; i--) {
    notes.push(
      <Note
        key={i}
        track={i}
        step={id}
        on={noteOn === i}
        playing={playing}
        onClick={onNoteClick}
      />
    );
  }

  return (
    <div className='sequencer__step'>{notes}</div>
  );
}