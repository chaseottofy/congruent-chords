class HandleNotes {
  constructor () {
    this.notesArr = [];
    this.keyboardMap = {};
    this.activeNotes = [];
    this.activeKeys = [];
  }

  getNotesArr() { return this.notesArr; }
  getActiveNotes() { return this.activeNotes; }
  getKeyboardMap() { return this.keyboardMap; }
  getActiveKeys() { return this.activeKeys; }

  setNotesArr(octaves, base) {
    this.notesArr = [];
    const [lower, upper] = octaves;
    this.notesArr.push(...base.map(note => note + lower));
    this.notesArr.push(...base.map(note => note + upper));
  }

  /**
   * setKeyboardMap
   * @param {string} base "zxcvbnm,./"...
   * @returns {object} - { z: C4, x: D4, ...}
   */
  setKeyboardMap(base) {
    const notes = this.getNotesArr();
    for (let i = 0; i < base.length; i++) {
      this.keyboardMap[base[i]] = notes[i];
    }
  }

  setDefaults(octaves, notesBase, keyboardBase) {
    this.setNotesArr(octaves, notesBase);
    this.setKeyboardMap(keyboardBase);
  }

  clearActive() {
    this.activeNotes = [];
    this.activeKeys = [];
  }
}

const handleNotes = new HandleNotes();
export default handleNotes;