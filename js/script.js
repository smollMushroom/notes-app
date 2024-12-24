import { NotesManager } from './NotesManager.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('add-note-form');
  const notes = document.querySelector('.notes');

  const notesManager = new NotesManager(notes);
  await notesManager.init()
  await notesManager.render();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    
    await notesManager.addNote(title, content)
    await notesManager.render();
    form.reset();

    if (history.pushState) {
      const newUrl = window.location.origin + window.location.pathname;
      history.pushState(null, '', newUrl);
    }
  });

  notes.addEventListener('click', async (event) => {
    if(event.target.closest('.delete-note')){
      event.preventDefault();

      const deleteButton = event.target.closest('.delete-note');
      const noteId = deleteButton.dataset.id;

      console.log(noteId);
      
      await notesManager.deleteNote(noteId.split('-')[1]);
      await notesManager.render();
    }
  })
});
