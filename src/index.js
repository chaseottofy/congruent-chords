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

handleNotes.setDefaults(controls.getOctaves(), notes.chromatic, keyboard.all);
circle.appendNotes(handleNotes.getNotesArray());
const sampler = new Sampler(controls.getDefaults());

const initListeners = () => {
  controls.handleClick();
  controls.handleChange();

  document.addEventListener("keydown", (e) => {
    const mode = controls.getPlaybackMode();
    const chord = controls.getChord();
    const callback = (arg) => {
      if (mode === "chord") {
        sampler.chordon(arg);
        circle.setActiveChordStyle(arg);
      } else {
        sampler.noteon(arg);
        circle.setActiveNoteStyle(arg);
      }
    };
    handleNotes.handleKeydown(e.key, mode, chord, callback);
  });

  document.addEventListener("keyup", (e) => {
    const mode = controls.getPlaybackMode();
    const callback = (arg) => {
      if (mode === "chord") {
        sampler.chordoff();
        circle.removeActiveChordStyle();
      } else {
        sampler.noteoff(arg);
        circle.removeActiveNoteStyle(arg);
      }
    };
    handleNotes.handleKeyup(e.key, mode, callback);
  });
};


initListeners();