# Synthrogue 🤖⌨🎶🥁

Program a robot to escape using a sequencer

[Play the game](https://synthrogue--antonmata.repl.co/) 🚀

> ⛑ If you are having issues running the game, you can also use this link as an alternative: [mirror link](https://synthrogue.netlify.com/)

[Gameplay video](https://www.youtube.com/watch?v=bSB6KKsD4io) 📼

![synthrogue-gameplay-1](https://storage.googleapis.com/replit/images/1563808872541_24059064b24dd465434ee1aa9a43148c.gif)

## What is it?

_Synthrogue_ is a game where you indirectly control a robot by programming its moves in advance via a step sequencer.

Program the robot's moves to get the key and then find the exit to escape a level.

The challenge is to escape the levels, but have fun with the sequencer to find cool _melodies_ that go well with the _beats_ played by the accompanying _drum machine_ in the background.

> If you are a musician, you can think of this as a **programmable toy synth with a game visualizer** 😁.

## Get Started

Just press `[ play ]` to hear the beat and start adding notes! 😎

## How to play

- Use the step sequencer grid at the bottom of the page to place _notes_.
- The arrows on the leftmost part of the sequencer pertains to the _direction_ you want the robot to go.
- Click `[ play ]` to start (and stop) the sequencer.
- You can still place and remove notes while the sequencer is playing.
- Guide the robot to get the _key_ first before going to the _exit_.
- The game's display (The grid with lots of dots), is a _top-down_ view of a room (very similar to classic _roguelikes_).
- The 3 enemy types (Zombies, Skeletons, Vampires) _move in different speeds_ and have _varying sight ranges_. If your robot is within their sight range, they will try to _chase_ your robot.
- When the robot _touches any enemy_, the game ends.
- My suggestion is to _stop_ the sequencer if your robot is in any imminent danger. There are no limits to doing this.
- Details about the game's display characters can be found in the game's _splash screen_.
- Every level has a specific _drum pattern_ (and tempo) played by the _drum machine_ in the background.

## Legend

![legend](https://storage.googleapis.com/replit/images/1563783848856_8ad44ca50c455ec0b31105c252d8239b.png)

## Visual Components

### Display

![level2](https://storage.googleapis.com/replit/images/1563784223829_19086caaf65bd8f30a2a3c3dcdafd777.png)

> **Level 2** pictured above

### Sequencer

![sequencer-full](https://storage.googleapis.com/replit/images/1563785354774_210c0417377e4f0a6ec840f5a78e5e34.png)

> Hint: The sequencer pictured above is a _possible solution to **level 1**_ 😉

## Inspiration

The game was insipired by the minimalistic aesthetics of [_roguelikes_](https://en.wikipedia.org/wiki/Roguelike) and [_music trackers_](https://en.wikipedia.org/wiki/Music_tracker). The terminal-like UI was based on the visual programming language [Orca](https://100r.co/pages/orca.html).

The indirect gameplay is reminiscent of games from [Zachtronics](http://www.zachtronics.com/) (ie. TIS-100, EXAPUNKS, etc.) wherein planning and writing instructions is a huge gameplay component.

The sleek tutorial websites from Ableton also provided tons of inspiration ([learningmusic](https://learningmusic.ableton.com/), [learningsynths](https://learningsynths.ableton.com/)).

## Implementation Notes

- Tested in both _Chrome 75_ and _Firefox 68_ (I recommend you use Chrome)
- The game was designed for _desktop_ browsers.
- Developed using [React](https://reactjs.org/) and [Tone.js](https://tonejs.github.io/).
- Drum samples are from [TriSamples](https://trisamples.com)' free 808 sample packs ([1](https://trisamples.com/808-trapstep-pack-vol-1/), [2](http://trisamples.com/808-trapstep-pack-vol-2/)).

## Hack your own drum patterns and levels

Fork the project and start hacking!

Drum patterns are found in `src/logic/patterns.js`. There are 4 samples available: kick, clap, closed hi-hat, open hi-hat. Patterns are in 16th notes. Just make sure to add your new patterns to the `export default { ... }` object at the very bottom of the file.

To use your new patterns and also create new levels, you can edit `src/logic/levels.js`. Just follow the same style as how the other levels are created. Just also make sure to add your new levels to the `export default [ ... ]` list at the very bottom of the file.

The characters used in building the levels are the same as the _Legend_ listing above, however, the `exit` character is `x`.

## What's next?

I had fun writing the game and having a concrete target certainly focused me to finish it. But I did scope out a couple of features due to lack of time.

I have plans of improving on this prototype/jam version.

Please, feel free to provide feedback.

Hand made with ❤ by [anton](https://repl.it/@antonmata)
