import createChord from "../utilities/createChord";

class HandleNotes {
  constructor () {
    this.activeNotes = [];
    this.activeKeys = [];
    this.notesArray = [];
    this.keyboardMap = {};
  }

  getActiveNotes() { return this.activeNotes; }
  getActiveKeys() { return this.activeKeys; }
  getNotesArray() { return this.notesArray; }
  getKeyboardMap() { return this.keyboardMap; }

  /**
   * @param {array} octaves [4, 5]
   * @param {array} base ['C', 'C#', ...]
   * @returns {array} - ['C4', 'C#5', ...]
   */
  setNotesArray(octaves, base) {
    this.notesArray = [];
    this.notesArray.push(...base.map(note => note + octaves[0]));
    this.notesArray.push(...base.map(note => note + octaves[1]));
  }

  /**
   * @param {string} base "zxcvbnm,./"...
   * @returns {object} - { z: C4, x: D4, ...}
   */
  setKeyboardMap(base) {
    const notes = this.getNotesArray();
    for (let i = 0; i < base.length; i++) {
      this.keyboardMap[base[i]] = notes[i];
    }
  }

  setDefaults(octaves, notesBase, keyboardBase) {
    this.setNotesArray(octaves, notesBase);
    this.setKeyboardMap(keyboardBase);
  }

  hasKey(key) { return this.activeKeys.includes(key); }
  keysLength() { return this.activeKeys.length; }
  notesLength() { return this.activeNotes.length; }

  addNote(note, key) {
    this.activeNotes.push(note);
    this.activeKeys.push(key);
  }
  addChord(notes) { this.activeNotes = [notes]; }

  removeNote(note, key) {
    this.activeNotes = this.activeNotes.filter(n => n !== note);
    this.activeKeys = this.activeKeys.filter(k => k !== key);
  }
  removeAll() {
    this.activeNotes = [];
    this.activeKeys = [];
  }

  handleKeydown(key, mode, chordType, on) {
    const mappedNote = this.getKeyboardMap()[key];
    if (!mappedNote) return;
    if (this.hasKey(key)) return;

    const activeNotesLength = this.notesLength();
    if (mode === "chord" && activeNotesLength > 0) return;
    if (mode === "chord") {
      const chord = createChord(mappedNote, chordType);
      on(chord);
      this.addChord(chord);
      return;
    } else {
      on(mappedNote);
      this.addNote(mappedNote, key);
      return;
    }
  };

  handleKeyup(key, mode, off) {
    const map = this.getKeyboardMap();
    const mappedNote = map[key];
    if (!mappedNote) return;

    if (mode === "chord") {
      off();
      this.removeAll();
      return;
    } else {
      off(mappedNote);
      this.removeNote(mappedNote, key);
      return;
    }
  }
}

const handleNotes = new HandleNotes();
export default handleNotes;