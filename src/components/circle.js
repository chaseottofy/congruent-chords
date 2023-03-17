class Circle {
  constructor () {
    this.notesContainer = document.querySelector(".circle__outer");
    this.activeNotesContainer = document.querySelector(".circle__inner");
    this.notes = [];
    this.activeNotes = [];
  }

  #createNote(note, degree) {
    const noteWrapper = document.createElement("div");
    noteWrapper.classList.add("note-wrapper");
    noteWrapper.style.transform = `rotate(${degree}deg)`;

    const content = document.createElement("div");
    content.classList.add("note-content");
    content.setAttribute("data-note-name", note);
    content.style.transform = `rotate(${360 - degree}deg)`;

    noteWrapper.append(content);
    return noteWrapper;
  }

  appendNotes(notes) {
    this.notesContainer.innerText = "";
    const length = (360 / notes.length);
    notes.forEach((note, idx) => {
      this.notesContainer.append(this.#createNote(note, idx * length));
    });
  }

  appendActiveNotes(notes) {
    this.activeNotesContainer.innerText = notes.join("\n");
  }

  clearActiveNotes() {
    this.activeNotesContainer.innerText = "";
  }

  #getActiveNote(note) {
    return document.querySelector(`[data-note-name="${note}"]`);
  }

  setActiveNoteStyle(note) {
    this.#getActiveNote(note).classList.add("active");
  }

  removeActiveNoteStyle(note) {
    this.#getActiveNote(note).classList.remove("active");
  }

  setActiveChordStyle(notes) {
    notes.forEach(note => this.setActiveNoteStyle(note));
  }
}

const circle = new Circle();
export default circle;