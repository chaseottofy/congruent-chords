import { notes } from "../data/constants";
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