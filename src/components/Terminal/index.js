import './index.scss';

import React from 'react';
import classNames from 'classnames';
import Char from './Char';

export default function Terminal({
  charBuffer = [],
  fgColorBuffer = [],
  bgColorBuffer = [],
  showGameOverModal = false,
  showNextLevelModal = false,
  onGameOverModalClick = () => {},
  onNextLevelModalClick = () => {},
}) {
  const chars = charBuffer.map((c, i) => (
    <Char
      key={i}
      value={c}
      fgColor={fgColorBuffer[i]}
      bgColor={bgColorBuffer[i]}
    />
  ));

  const modalClass = classNames('terminal__modal', {
    'terminal__modal--show': showNextLevelModal || showGameOverModal,
    'terminal__modal--transparent': !showGameOverModal,
  });

  let modalTitle = 'YOU FOUND THE EXIT';
  let modalSubtitle = 'Click here to go to next level';
  if (showGameOverModal) {
    modalTitle = 'GAME OVER';
    modalSubtitle = 'Click here to play again';
  }

  return (
    <div className='terminal'>
      <div className='terminal__chars'>
        {chars}
      </div>
      <div
        className={modalClass}
        onClick={() => {
          if (showGameOverModal) {
            onGameOverModalClick();
          } else if (showNextLevelModal) {
            onNextLevelModalClick();
          }
        }}
      >
        <div className='terminal__modal-text'>{modalTitle}</div>
        <div className='terminal__modal-text'>{modalSubtitle}</div>
      </div>
    </div>
  );
}