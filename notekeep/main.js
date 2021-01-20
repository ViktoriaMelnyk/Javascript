const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');
const container = document.getElementById('notes__container');
const noteColor = document.getElementById('note-color');

let notes = [];

//Show modal

function showModal() {
    modal.classList.add('show-modal');
    noteTitle.focus();
}

//modal event listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () =>
    modal.classList.remove('show-modal')
);
window.addEventListener('click', (e) =>
    e.target === modal ? modal.classList.remove('show-modal') : false
);
//Build notes DOM
function buildNotes() {
    //clear 
    container.textContent = '';
    //Build items
    notes.forEach((note) => {
        const { title, text, createDate,color } = note;
        console.log(title, text, createDate, color);

        //Item
        const item = document.createElement('div');
        item.classList.add('item');
        //tools
        const tools = document.createElement('div');
        tools.classList.add('tools');
        //tools-left
        const toolsLeft = document.createElement('div');
        toolsLeft.classList.add('tools-left');
        //icons
        const pinnIcon = document.createElement('i');
        pinnIcon.classList.add('fas', 'fa-thumbtack');
        pinnIcon.setAttribute('onclick', `pinnNote('${createDate}')`);
    
        //date
        const date = document.createElement('div');
        date.classList.add('date');
        date.textContent = createDate;
        //delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-times');
        deleteIcon.setAttribute('title','Usunąć notatkę');
        deleteIcon.setAttribute('id','delete');
        deleteIcon.setAttribute('onclick',`deleteNote('${createDate}')`);

        //title
        const Title = document.createElement('div');
        Title.classList.add('title');
        Title.textContent= title;
        const Text = document.createElement('textarea');
        Text.classList.add('note-textarea');
        Text.textContent= text;

        // append
        toolsLeft.append(pinnIcon);
        tools.append(toolsLeft, date, deleteIcon);
        item.append(tools,Title,Text);
        container.appendChild(item);
        //item.style.background =`rgba('${color}',.5)`;
        item.style.background = color;
        item.style.opacity = '0.8';
        
    });
}


//fetch Notes
function fetchNotes() {
    //get notes from LS
    if (localStorage.getItem('notatki')) {
        notes = JSON.parse(localStorage.getItem('notatki'));
    } else {
        notes = [];
        localStorage.setItem('notatki', JSON.stringify(notes));
    }
    buildNotes();
}
//delete note

// eslint-disable-next-line no-unused-vars
function deleteNote(createDate) {
    notes.forEach((note,i) =>{
        if(note.createDate===createDate){
            notes.splice(i,1);
        }
    });
    //update LS
    localStorage.setItem('notatki',JSON.stringify(notes));
    fetchNotes();
}
// eslint-disable-next-line no-unused-vars
function pinnNote(createDate) {
    notes.forEach((note, i) => {
        if (note.createDate === createDate) {
            notes.splice(i, 1);
            notes.unshift(note);
        }
    });
    //update LS
    localStorage.setItem('notatki', JSON.stringify(notes));
    fetchNotes();
}
//Handle data from form
function storeNote(e) {
    e.preventDefault();
    const titleValue = noteTitle.value;
    let textValue = noteText.value;
    let colorValue = noteColor.value;
    console.log(titleValue, textValue,colorValue);
    const note = {
        title: titleValue,
        text: textValue,
        createDate: new Date().toLocaleString(),
        color: colorValue,
    };
    notes.push(note);
    //console.log(notes);
    localStorage.setItem('notatki', JSON.stringify(notes));
    fetchNotes();
    noteForm.reset();
    noteTitle.focus();
}

// event listener


noteForm.addEventListener('submit', storeNote);

fetchNotes();

