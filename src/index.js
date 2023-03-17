import "./styles/root.css";
import "./styles/app.css";
import "./styles/about.css";
import "./styles/circle.css";
import "./styles/controls.css";
import { notes, keyboard } from "./data/constants";
import controls from "./components/controls";
import circle from "./components/circle";
import Sampler from "./audio/sampler";
import handleNotes from "./audio/handleNotes";
const overlay = document.querySelector(".overlay");

const sampler = new Sampler(
  controls.getSampleArgs(),
  controls.getFilterArgs(),
);

const renderdom = () => {
  handleNotes.setBase(
    controls.getOctaves(), notes.chromatic, keyboard.all
  );
  circle.appendNotes(handleNotes.getNotesArray());
  circle.clearActiveNotes();
};

const initListeners = () => {

  // provide callback to controls for communication with circle
  controls.setCallback("setDom", renderdom);

  // provide callbacks to controls for communication with sampler
  controls.setCallback("loadSample",
    (sample, volume, attack, release) => {
      sampler.setSampler(sample, volume, attack, release);
    }
  );
  controls.setCallback("loadFilter",
    (lowpass, highpass, reverb, delay) => {
      sampler.setFilter(lowpass, highpass, reverb, delay);
    }
  );

  controls.handleClick();   // init controls onchange listeners
  controls.handleChange();  // init controls onchange listeners
  circle.togglekeys();      // toggle between keys/note names (circle)

  // listen for keydown and keyup events
  document.addEventListener("keydown", (e) => {
    const mode = controls.getPlaybackMode();
    const chord = controls.getChord();
    overlay.classList.remove("hide");
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
    overlay.classList.add("hide");
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

renderdom();
initListeners();