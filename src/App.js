import './App.scss';

import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';

import Sequencer from './components/Sequencer';
import Terminal from './components/Terminal';
import Help from './components/Help';

import reducer, {
  gamePhase,
  initialState,
  init,
  restart,
  nextLevel,
  tick,
  updateStep,
  togglePlay,
  showHelp,
  hideHelp,
} from './duck';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(init(() => dispatch(tick())));
  }, []);

  const gameClass = classNames('app__game', {
    'app__game--blur': state.showHelp,
  });

  return (
    <div className='app'>
      <div className={gameClass}>
        <div className='app__header'>
          <div>synthrogue</div>
          <div
            className='app__help-button'
            onClick={() => dispatch(showHelp())}
          >
            [ ? ]
          </div>
        </div>
        <div className='app__display'>
          <Terminal
            charBuffer={state.buffers.char}
            fgColorBuffer={state.buffers.fg}
            bgColorBuffer={state.buffers.bg}
            showNextLevelModal={state.phase === gamePhase.NEXT_LEVEL}
            showGameOverModal={state.phase === gamePhase.GAME_OVER}
            onNextLevelModalClick={() => dispatch(nextLevel())}
            onGameOverModalClick={() => dispatch(restart())}
          />
        </div>
        <div className='app__info'>
          <div>level: {state.level + 1}</div>
        </div>
        <div className='app__controls'>
          <div
            className='app__play-toggle'
            onClick={() => dispatch(togglePlay())}
          >
            {`[ ${ state.isPlaying ? 'stop' : 'play' } ]`}
          </div>
        </div>
        <div className='app__sequencer'>
          <Sequencer
            bars={state.bars}
            steps={state.steps}
            currentBeat={state.tick}
            onNoteClick={(track, step, on) => {
              dispatch(updateStep(step, on ? track : -1));
            }}
          />
        </div>
      </div>
      <div className='app__help'>
        <Help
          show={state.showHelp}
          onClick={() => dispatch(hideHelp())}
        />
      </div>
    </div>
  );
}
