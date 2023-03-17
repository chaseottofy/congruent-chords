const notes = {
  chromatic: [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ],
  major: [
    'C', 'D', 'E', 'F', 'G', 'A', 'B'
  ],
  minor: [
    'C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'
  ],
};

const arpTypes = ['none', 'up', 'down', 'updown', 'downup', 'random'];
const chordTypes = ['major5', 'major7', 'minor5', 'minor7', 'random'];

const keyboard = {
  lower: "zsxdcvgbhnjm",
  upper: "q2w3er5t6y7u",
  all: "q2w3er5t6y7uzsxdcvgbhnjm",
  rev: "zsxdcvgbhnjmq2w3er5t6y7u"
}

export { notes, arpTypes, chordTypes, keyboard };