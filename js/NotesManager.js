import { formatDate } from '../utils/date.js';
import { IDBNoteManager } from './IDBNoteManager.js';

export class NotesManager {
  constructor(target) {
    this.target = target;
    this.idbManager = new IDBNoteManager('IDBNotes', 'notes', 1);
    this.init();
  }

  async init() {
    await this.idbManager.init();
  }

  async addNote(title, contents) {
    try {
      const addToIdb = await this.idbManager.add({
        title,
        contents,
        createAt: formatDate(true),
      });
      if (!addToIdb) {
        console.log('Something Wrong!');
        return;
      }

      this.render();
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  }

  formatNoteContent(contents) {
    const arrayContents = contents.split('\n');
    const formatHTMLElement = arrayContents
      .map((contents) => (contents === '' ? '</br>' : `<p>${contents}</p>`))
      .join('');
    return formatHTMLElement;
  }

  async render() {
    try {
      const notesData = await this.idbManager.getAll();
      const noteTemplate = notesData
        .map((note) => {
          return `
        <article class="note" id="note-${note.id}">
          <h3>${note.title}</h3>
          <p>${note.createAt}</p>
          <p>${this.formatNoteContent(note.contents)}</p>
          <a href="##" class="delete-note" data-id="delete-${note.id}">
            <img src="/assets/delete.png" alt="delete-button" />
          </a>
          </article>
        `;
        })
        .join('');
      this.target.innerHTML = noteTemplate;
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }

  async deleteNote(id) {
    try {
      await this.idbManager.delete(Number(id));
      console.log(`Note with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }
}
