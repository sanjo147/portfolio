const noteInput = document.getElementById('noteInput');
const addButton = document.getElementById('addButton');
const notesBody = document.getElementById('notesBody');

addButton.addEventListener('click', addNote);

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        const row = notesBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        
        cell1.textContent = noteText;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.onclick = function() {
            notesBody.removeChild(row);
        };
        
        cell2.appendChild(deleteButton);
        
        noteInput.value = '';
    }
}