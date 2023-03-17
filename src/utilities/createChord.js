import { notes } from "../data/constants";
// function midiToNoteName(midi) {
//   const noteMap = {
//     0: "C",
//     1: "C#",
//     2: "D",
//     3: "D#",
//     4: "E",
//     5: "F",
//     6: "F#",
//     7: "G",
//     8: "G#",
//     9: "A",
//     10: "A#",
//     11: "B",
//   };
//   const octave = Math.floor(midi / 12);
//   const noteName = noteMap[midi % 12];
//   return noteName + octave;
// }
// function noteToMidi(note) {
//   const noteMap = {
//     "C": 0,
//     "C#": 1,
//     "D": 2,
//     "D#": 3,
//     "E": 4,
//     "F": 5,
//     "F#": 6,
//     "G": 7,
//     "G#": 8,
//     "A": 9,
//     "A#": 10,
//     "B": 11,
//   };
//   const regex = /^([A-G]#?)(\d)$/;
//   const match = regex.exec(note);
//   if (match) {
//     const noteName = match[1];
//     const octave = parseInt(match[2], 10);
//     const midiNumber = noteMap[noteName] + octave * 12;
//     if (midiNumber >= 12 && midiNumber <= 96) {
//       return midiNumber;
//     }
//   }
//   throw new Error("Invalid note: " + note);
// }
// export default function createChord(rootNote, chordType) {
//   const chordIntervals = {
//     major5: [0, 7, 16],
//     major7: [0, 4, 7, 11],
//     minor5: [0, 7, 15],
//     minor7: [0, 3, 7, 10],
//   };

//   // check if the chord type is valid, or use a random chord type
//   const validChordTypes = Object.keys(chordIntervals);
//   chordType = validChordTypes.includes(chordType) ? chordType
//     : validChordTypes[Math.floor(Math.random() * validChordTypes.length)];

//   const intervals = chordIntervals[chordType];
//   const rootMidi = noteToMidi(rootNote);
//   const midiNotes = intervals.map(interval => rootMidi + interval);
//   const notes = midiNotes.map(midi => midiToNoteName(midi));

//   // return the notes in the chord
//   return notes;
// }

export default function createChord(note, type) {
  const [root, octave] = [note.slice(0, -1), +note.slice(-1)];
  const chromatic = notes.chromatic;
  const rootIndex = chromatic.indexOf(root);
  
  switch (type) {
    case "major5":
      return [
        note,
        chromatic[(rootIndex + 4) % 12] + octave,
        chromatic[(rootIndex + 7) % 12] + octave
      ];
    case "major7":
      return [
        note,
        chromatic[(rootIndex + 4) % 12] + octave,
        chromatic[(rootIndex + 7) % 12] + octave,
        chromatic[(rootIndex + 11) % 12] + octave
      ];
    case "minor5":
      return [
        note,
        chromatic[(rootIndex + 3) % 12] + octave,
        chromatic[(rootIndex + 7) % 12] + octave
      ];
    case "minor7":
      return [
        note,
        chromatic[(rootIndex + 3) % 12] + octave,
        chromatic[(rootIndex + 7) % 12] + octave,
        chromatic[(rootIndex + 10) % 12] + octave
      ];
    case "random":
      return [
        note,
        chromatic[(rootIndex + Math.floor(Math.random() * 12)) % 12] + octave,
        chromatic[(rootIndex + Math.floor(Math.random() * 12)) % 12] + octave,
      ];
    default:
      return [note];
  }
}