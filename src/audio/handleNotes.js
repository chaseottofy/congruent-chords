class HandleNotes {
  constructor () {
    this.notesArray = [];
    this.keyboardMap = {};
    this.activeNotes = [];
    this.activeKeys = [];
  }

  getNotesArray() { return this.notesArray; }
  getActiveNotes() { return this.activeNotes; }
  getKeyboardMap() { return this.keyboardMap; }
  getActiveKeys() { return this.activeKeys; }

  setNotesArray(octaves, base) {
    this.notesArray = [];
    console.log(base)
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

  clearActive() {
    this.activeNotes = [];
    this.activeKeys = [];
  }
}

const handleNotes = new HandleNotes();
export default handleNotes;