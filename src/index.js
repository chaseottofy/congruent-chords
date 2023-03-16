import "./styles/root.css";
import "./styles/app.css";
import "./styles/about.css";
import "./styles/circle.css";
import "./styles/controls.css";
import { notes, arpTypes, chordTypes, keyboard } from "./data/constants";

import controls from "./components/controls";
import circle from "./components/circle";
import Sampler from "./audio/sampler";
import handleNotes from "./audio/handleNotes";

const sampler = new Sampler(controls.getSample());
handleNotes.setDefaults(
  controls.getOctaves(),
  notes.chromatic,
  keyboard.all
);

console.log(controls.getPlaybackMode())
controls.setPlaybackMode('note')
console.log(controls.getPlaybackMode())
console.log(handleNotes.getKeyboardMap());