import { createLevel, bakeSong } from './Level';
import patterns from './patterns';

const level0 = createLevel({
  bpm: 90,
  bars: 4,
  map: [
    '                                        ',
    '                                        ',
    '                k       x               ',
    '                                        ',
    '             #       #######            ',
    '             #             #            ',
    '             #             #            ',
    '             #      Z      #            ',
    '             #             #            ',
    '             #             #            ',
    '             #######       #            ',
    '                                        ',
    '                    @                   ',
    '                                        ',
    '                                        ',
    '                                        ',
  ].join(''),
  drums: bakeSong({
    arrangement: [0, 1],
    patterns: [patterns.hipHop1, patterns.hipHop2],
  }),
});

const level1 = createLevel({
  bpm: 140,
  bars: 8,
  map: [
    '                                        ',
    '                                        ',
    '     ##            k             ##     ',
    '     ##                          ##     ',
    '                 ######                 ',
    '                #      #                ',
    '   Z           #        #               ',
    '               #        #      @        ',
    '      x   Z    #        #               ',
    '               #        #               ',
    '   Z            #      #                ',
    '                 ######                 ',
    '     ##                          ##     ',
    '     ##                          ##     ',
    '                                        ',
    '                                        ',
  ].join(''),
  drums: bakeSong({
    arrangement: [0, 1],
    patterns: [patterns.dubstep1, patterns.dubstep2],
  }),
});

const level2 = createLevel({
  bpm: 180,
  bars: 12,
  map: [
    '      ####                    ####      ',
    '    ##                            ##  @ ',
    '  ##   S    ################            ',
    ' #        ##           S    ##          ',
    '#                             ##       #',
    '#              #####            #      #',
    '              #          #      #       ',
    '      #      #            #      #      ',
    '      #            k      #      #      ',
    '       #                 #      #       ',
    '#      #       ##########              #',
    '#       ##                             #',
    '          ##                ##        # ',
    '            ################        ##  ',
    ' x  ##        S                   ##    ',
    '      ####                    ####      ',
  ].join(''),
  drums: bakeSong({
    arrangement: [0, 1],
    patterns: [patterns.dnb1, patterns.dnb2],
  }),
});

const level3 = createLevel({
  bpm: 125,
  bars: 12,
  map: [
    '                   S                    ',
    '   #####   ####   ####   ####   #####   ',
    '   #                                #   ',
    '   #                                #   ',
    '   #    ##     ##     ##     #      #   ',
    '   #    ##     ##     ##     #      #   ',
    '                             #          ',
    ' @  k       V      S         #   x      ',
    '                             #          ',
    '   #    ##     ##     ##     #      #   ',
    '   #    ##     ##     ##     #      #   ',
    '   #                                #   ',
    '   #                                #   ',
    '   #####   ####   ####   ####   #####   ',
    '                   S                    ',
    '                                        ',
  ].join(''),
  drums: bakeSong({
    arrangement: [0],
    patterns: [patterns.deepHouse1],
  }),
});

const level4 = createLevel({
  bpm: 90,
  bars: 12,
  map: [
    '            #        Z         #        ',
    '   S  S  S  #                  #        ',
    '            #    ##      ##    #   S    ',
    '   S  S  S  #    #        #    #        ',
    '            #                  #        ',
    '     ########                  #        ',
    '     #           #        #             ',
    '  @  #     Z     ##      ##        k    ',
    '                               #        ',
    '                               #        ',
    '###################    #################',
    '                         #              ',
    '      #    #    #    #   #              ',
    '   V                             x      ',
    '      #    #    #    #                  ',
    '                         #              ',
  ].join(''),
  drums: bakeSong({
    arrangement: [0, 1],
    patterns: [patterns.basic1, patterns.basic2],
  }),
});

export default [level0, level1, level2, level3, level4];
