import produce from 'immer';
import Tone from 'tone';

import Game, { gameEvent } from './logic/Game';
import levels from './logic/levels';

import MoveSynth from './synths/MoveSynth';
import DrumMachine from './synths/DrumMachine';

import { distance, normalize } from './utils/math';

const _drums = new DrumMachine();
const _moveSynth = new MoveSynth();
const _game = new Game();

const _levels = levels;

export const gamePhase = Object.freeze({
  PLAY_ON: 0,
  NEXT_LEVEL: 1,
  GAME_OVER: 2,
});

export const initialState = {
  buffers: {
    char: [],
    fg: [],
    bg: [],
  },
  bars: 1,
  steps: [],
  tick: -1,
  isPlaying: false,
  level: 0,
  phase: gamePhase.PLAY_ON,
  showHelp: true,
};

// Types
const INIT = 'game/INIT';
const RESTART = 'game/RESTART';
const NEXT_LEVEL = 'game/NEXT_LEVEL';
const TICK = 'game/TICK';
const UPDATE_STEP = 'game/UPDATE_STEP';
const TOGGLE_PLAY = 'game/TOGGLE_PLAY';
const SHOW_HELP = 'game/SHOW_HELP';
const HIDE_HELP = 'game/HIDE_HELP';

// Actions
export const init = onNoteTrigger => ({ type: INIT, onNoteTrigger });
export const restart = () => ({ type: RESTART });
export const nextLevel = () => ({ type: NEXT_LEVEL });
export const tick = () => ({ type: TICK });
export const updateStep = (stepIndex, dir) => ({
  type: UPDATE_STEP,
  stepIndex,
  dir,
});
export const togglePlay = () => ({ type: TOGGLE_PLAY });
export const showHelp = () => ({ type: SHOW_HELP });
export const hideHelp = () => ({ type: HIDE_HELP });

export default function reducer(state, action) {
  return produce(state, draft => {
    switch(action.type) {
      case INIT:
        _moveSynth.onNoteTrigger = action.onNoteTrigger;
        _loadLevel(state.level, draft);
        return;

      case RESTART:
        draft.level = 0;
        _loadLevel(0, draft);
        return;

      case NEXT_LEVEL:
        if (draft.level + 1 >= _levels.length) {
          draft.phase = gamePhase.GAME_OVER;
          _stopTick(draft);
          return;
        }
        draft.level++;
        _loadLevel(draft.level, draft);
        return;

      case TICK:
        if (!draft.isPlaying) {
          return;
        }

        for (const ev of _game.pumpEvents()) {
          if (ev === gameEvent.GAME_OVER) {
            draft.phase = gamePhase.GAME_OVER;
            _stopTick(draft);
            return;
          } else if (ev === gameEvent.LEVEL_EXIT) {
            draft.phase = gamePhase.NEXT_LEVEL;
            _stopTick(draft);
            return;
          }
        }

        // Adjust synth FX based on player distance from exit
        const player = _game.level.player;
        const exit = _game.level.exit;
        const d = distance(player.x, player.y, exit.x, exit.y);
        _moveSynth.fx = normalize(d, 0, 20);

        _updateTick(draft);
        return;

      case UPDATE_STEP:
        if (
          state.phase === gamePhase.GAME_OVER ||
          state.phase === gamePhase.NEXT_LEVEL
        ) {
          return;
        }

        _game.setMove(action.stepIndex, action.dir);
        _moveSynth.setNote(action.stepIndex, action.dir);
        draft.steps = _game.moves.slice(0);
        return;

      case TOGGLE_PLAY:
        if (state.phase === gamePhase.GAME_OVER) {
          return;
        }

        if (state.isPlaying) {
          _stopTick(draft);
        } else {
          _startTick(draft);
        }
        return;

      case SHOW_HELP:
        draft.showHelp = true;
        return;

      case HIDE_HELP:
        draft.showHelp = false;
        return;

      default:
        return;
    }
  });
}

function _startTick(state) {
  state.isPlaying = true;
  Tone.Transport.start('+0.1');
}

function _stopTick(state) {
  state.isPlaying = false;
  Tone.Transport.stop('+0.1');
  _game.resetLevel();
  _updateTick(state);
}

function _updateTick(state) {
  _writeToTerminal(state.buffers, _game.level.data);
  state.tick = _game.tickCount;
}

function _loadLevel(index, state) {
  // Reset play state
  state.isPlaying = false;

  // Make sure no audio is playing
  Tone.Transport.stop('+0.1');

  // Get level data
  const level = _levels[index];

  // Set the number of bars
  state.bars = level.bars;

  // Load drum pattern
  _drums.pattern = level.drums;

  // Clear and initialize synth
  _moveSynth.clear();
  _moveSynth.bars = level.bars;

  // Create new game state instance
  _game.loadLevel(level, level.bars * 8);

  // Reset the terminal buffers
  state.buffers.char = [];
  state.buffers.fg = [];
  state.buffers.bg = [];

  // Display initial game state
  _writeToTerminal(state.buffers, _game.level.data);

  // Set BPM
  Tone.Transport.bpm.value = level.bpm;

  // Reset the steps
  state.steps = [];

  // Reset sequencer tick
  state.tick = _game.tickCount;

  // Reset game phase
  state.phase = gamePhase.PLAY_ON;
}

function _writeToTerminal(buffers, data) {
  data.forEach((c, i) => {
    buffers.char[i] = c === null ? '.' : c.char;
    buffers.fg[i] = c === null ? 1 : c.fg;
    buffers.bg[i] = c === null ? 0 : c.bg;
  });
}