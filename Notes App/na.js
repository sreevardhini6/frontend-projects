const PASSWORD = "mypassword";

function showOptions(optionsBtn) {
    const openMenus = document.querySelectorAll('.options-menu');
    openMenus.forEach(menu => {
        menu.style.display = 'none';
    });

    const optionsMenu = optionsBtn.nextElementSibling;
    optionsMenu.style.display = 'block';

    document.addEventListener('click', closeOptionsMenu);
}

function closeOptionsMenu() {
    const optionsMenus = document.querySelectorAll('.options-menu');
    optionsMenus.forEach(menu => {
        menu.style.display = 'none';
    });

    document.removeEventListener('click', closeOptionsMenu);
}

function addNote() {
    const notesContainer = document.getElementById('notesContainer');
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="note-header">
            <input type="text" class="note-title" placeholder="Title">
            <button class="options-btn">...</button>
            <div class="options-menu">
                <button class="option-btn reminder-btn">Set Reminder</button>
                <button class="option-btn hide-btn">Hide</button>
                <button class="option-btn delete-btn">Delete</button>
                <button class="option-btn save-btn">Save</button> <!-- Save option -->
            </div>
        </div>
        <textarea class="note-body" placeholder="Take a note..."></textarea>
    `;
    notesContainer.appendChild(note);

    const optionsBtn = note.querySelector('.options-btn');
    optionsBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        showOptions(optionsBtn);
    });

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if (savedNotes.length > 0) {
        const lastNote = savedNotes[savedNotes.length - 1];
        note.querySelector('.note-title').value = lastNote.title;
        note.querySelector('.note-body').value = lastNote.body;
    }

    const reminderBtn = note.querySelector('.reminder-btn');
    reminderBtn.addEventListener('click', () => {
        const reminder = prompt("Enter reminder:");
        if (reminder !== null) {

            alert('Reminder set for this note: ' + reminder);
        }
    });

    const hideBtn = note.querySelector('.hide-btn');
    hideBtn.addEventListener('click', () => {
        const password = prompt("Enter password to open hidden note:");
        if (password !== null && password === PASSWORD) {
            if (note.style.display === 'none') {
                note.style.display = 'block';
            } else {
                note.style.display = 'none';
            }
        } else {
            alert('Incorrect password. Cannot open hidden note.');
        }
    });

    const deleteBtn = note.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        notesContainer.removeChild(note);
        saveNotes();
    });

    const saveBtn = note.querySelector('.save-btn');
    saveBtn.addEventListener('click', () => {
        saveNotes();
    });
}

function saveNotes() {
    const notes = [];
    const noteElements = document.querySelectorAll('.note');
    noteElements.forEach(noteElement => {
        const title = noteElement.querySelector('.note-title').value;
        const body = noteElement.querySelector('.note-body').value;
        notes.push({ title, body });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if (savedNotes.length > 0) {
        savedNotes.forEach(note => {
            addNote();
        });
    }
}

function init() {
    const addNoteBtn = document.getElementById('addNoteBtn');

    addNoteBtn.addEventListener('click', addNote);

    loadNotes();

    const optionsBtns = document.querySelectorAll('.options-btn');
    optionsBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); 
            showOptions(btn);
        });
    });
}

window.onload = init;
