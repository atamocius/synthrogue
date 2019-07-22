import Tone from 'tone';
import range from 'lodash/range';

import kick from '../assets/samples/kick.mp3';
import clap from '../assets/samples/clap.mp3';
import hh_o from '../assets/samples/hihat-open.mp3';
import hh_c from '../assets/samples/hihat-closed.mp3';

export default class DrumMachine {
  constructor() {
    const players = new Tone.Players(
      {
        bd: kick,
        cp: clap,
        oh: hh_o,
        ch: hh_c,
      },
      () => console.log('drum samples loaded')
    ).toMaster();

    const bdPlayer = players.get('bd');
    const cpPlayer = players.get('cp');
    const chPlayer = players.get('ch');
    const ohPlayer = players.get('oh');

    this._pattern = {
      bars: 1,
      bd: [],
      cp: [],
      oh: [],
      ch: [],
    };

    this._seq = new Tone.Sequence(
      (_, step) => {
        this._pattern.bd[step] && bdPlayer.start();
        this._pattern.cp[step] && cpPlayer.start();
        this._pattern.oh[step] && ohPlayer.start();
        if(this._pattern.ch[step]) {
          ohPlayer.stop();
          chPlayer.start();
        }
      },
      [],
      '16n'
    );
    this._seq.start(0);
    this._seq.loop = true;
    this._seq.loopEnd = '1m';
  }

  set pattern(pattern) {
    this._seq.removeAll();
    range(pattern.bars * 16).forEach(i => this._seq.at(i, i));
    this._seq.loopEnd = `${pattern.bars}m`;
    this._pattern = pattern;
  }
}