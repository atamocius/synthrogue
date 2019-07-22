import range from 'lodash/range';
import clamp from 'lodash/clamp';
import Tone from 'tone';
import { scale } from '../utils/math';

const notes = ['C2', 'E2', 'G2', 'A#2'];

export default class MoveSynth {
  constructor(bars = 1, onNoteTrigger) {
    this._onNoteTrigger = onNoteTrigger;

    const filter = new Tone.Filter().toMaster();
    const synth = new Tone.MonoSynth().connect(filter);

    this._setVol = v => synth.volume.value = v;
    this._getVol = () => synth.volume.value;

    this._setFx = q => {
      q = 1 - clamp(q, 0, 1);
      this._fx = q;
      filter.frequency.value = scale(q, 500, 10000);
      synth.filterEnvelope.octaves = scale(q, 3, 8);
    };

    this._setVol(-10);
    this._setFx(0.5);

    this._initNoteSequence(synth);
    this._initEventSequence();

    this.bars = bars;
  }

  set onNoteTrigger(handler) {
    this._onNoteTrigger = handler;
  }

  set volume(decibels) {
    this._setVol(decibels);
  }

  get volume() {
    return this._getVol();
  }

  set fx(value) {
    this._setFx(value);
  }

  get fx() {
    return this._fx;
  }

  set bars(bars) {
    this._bars = bars;
    range(bars * 8).forEach(i => this._eventSequence.at(i, i));
    this._noteSequence.loopEnd = `${bars}m`;
    this._eventSequence.loopEnd = `${bars}m`;
  }

  get bars() {
    return this._bars;
  }

  setNote(step, move) {
    this._noteSequence.at(step, move === -1 ? null : notes[move]);
  }

  clear() {
    this._noteSequence.removeAll();
    this._eventSequence.removeAll();
    this.bars = this._bars;
  }

  _initNoteSequence(synth) {
    this._noteSequence = new Tone.Sequence(
      (time, note) => {
        note !== null && synth.triggerAttackRelease(note, '8n', time);
      },
      [],
      '8n'
    );
    this._noteSequence.start(0);
    this._noteSequence.loop = true;
  }

  _initEventSequence() {
    this._eventSequence = new Tone.Sequence(
      (time, step) => {
        Tone.Draw.schedule(() => {
          const note = this._noteSequence.at(step);
          this._onNoteTrigger && this._onNoteTrigger(step, note ? note.value : null);
        }, time);
      },
      [],
      '8n'
    );
    this._eventSequence.start(0);
    this._eventSequence.loop = true;
  }
}