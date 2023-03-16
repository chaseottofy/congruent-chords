const notesContainer = document.querySelector(".circle__outer");
const activeNotesContainer = document.querySelector(".circle__inner");

class Circle {
  constructor () {
    this.notes = [];
    this.activeNotes = [];
  }

  createNote(note, degree) {
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
    notesContainer.innerText = "";
    const length = (360 / notes.length);
    notes.forEach((note, idx) => {
      notesContainer.append(this.createNote(note, idx * length));
    });
  }

  appendActiveNotes(notes) {
    activeNotesContainer.innerText = notes.join("\n");
  }

  clearActiveNotes() {
    activeNotesContainer.innerText = "";
  }

  getActiveNote(note) {
    return document.querySelector(`[data-note-name="${note}"]`);
  }

  setActiveNoteStyle(note) {
    this.getActiveNote(note).classList.add("active");
  }

  removeActiveNoteStyle(note) {
    this.getActiveNote(note).classList.remove("active");
  }

  setActiveChordStyle(notes) {
    notes.forEach(note => this.setActiveNoteStyle(note));
  }
}

const circle = new Circle();
export default circle;