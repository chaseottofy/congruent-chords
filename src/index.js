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
    handleNotes.handleKeydown(
      e.key,
      mode,
      controls.getChord(),
      mode === "chord"
        ? (arg) => sampler.chordon(arg)
        : (arg) => sampler.noteon(arg)
    );
  });

  document.addEventListener("keyup", (e) => {
    const mode = controls.getPlaybackMode();
    handleNotes.handleKeyup(
      e.key,
      mode,
      mode === "chord"
        ? () => sampler.chordoff()
        : (arg) => sampler.noteoff(arg)
    );
  });
};


initListeners();