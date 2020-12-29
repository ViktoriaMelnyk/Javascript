const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');
const container = document.getElementById('notes__container');
//const deleteIcon = document.getElementById('delete');

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
        const { title, text, createDate} = note;
        console.log(title, text, createDate);
        //Item
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
            <div class="tools">
                <div class="tools-left">
                    <i class="fas fa-thumbtack" id='pinnNote'></i>
                    <i class="fas fa-palette" id='colour'></i>
                    <i class="fas fa-edit"></i>
                </div>
                <div class="date">${createDate.toLocaleString()}</div>
                <i class="fas fa-times" id="delete" title="Usunąć notatkę"></i>
            </div>
            <div class="title">${title}</div>
            <textarea class="note-textarea" maxlenght=“10”>${text}</textarea>
        `;
        
        container.appendChild(item);
    });
}
// delete note

//fetch Notes
function fetchNotes() {
    //get notes from LS
    if (localStorage.getItem('notatki')) {
        notes = JSON.parse(localStorage.getItem('notatki'));
    } else {
        notes = [
            {
                title: 'To jest twój notatnik',
                text:
              ' Tu morzesz tworzyć notatki w różnych kolorach, najważniejsze przypinać, jeżeli zamkniesz stronę, to zawsze możesz wrócic i zobaczyć swoje notatki',
                createDate: new Date(),
            },
        ];
        localStorage.setItem('notatki', JSON.stringify(notes));
    }
    buildNotes();
}
//Handle data from form
function storeNote(e) {
    e.preventDefault();
    const titleValue = noteTitle.value;
    let textValue = noteText.value;
    console.log(titleValue, textValue);
    const note = {
        title: titleValue,
        text: textValue,
        createDate: new Date(),
        // colour: true
    };
    notes.push(note);
    console.log(notes);
    localStorage.setItem('notatki', JSON.stringify(notes));
    fetchNotes();
    noteForm.reset();
    noteTitle.focus();
}

// event listener
noteForm.addEventListener('submit', storeNote);

fetchNotes();

// console.log(notes);
// if(notes){
//     notes.forEach(note => addNewNote(note));
// }

// addBTn.addEventListener('click', () => addNewNote());

// function addNewNote() {
//     const note = document.createElement('div');
//     note.classList.add('item');
//     note.innerHTML = `
//         <div class="tools">
//             <div class="tools-left">
//                 <i class="fas fa-thumbtack" id='pinnNote'></i>
//                 <i class="fas fa-palette" id='colour'></i>
//             </div>
//             <i class="fas fa-times" id="delete" title="Usunąć notatkę"></i>
//         </div>
//         <div class="colours"></div>

//         <textarea class="note-textarea" maxlenght=“10”></textarea>
//     `;
//     const deleteNote = note.querySelector('#delete');
//     deleteNote.addEventListener('click', () =>{
//         note.remove();
//         updateLS();
//     });

//     updateLS();
//     container.appendChild(note);

// }


// // 1. zapisywanie notatki i tablicy notatek w localStorage

// // notatka: title, content, colour, pinned, createDate
// const notes = [];

// const note = {
//   title: "pierwsza notatka",
//   content: "pierwsza notatka",
//   colour: "#ff1280",
//   pinned: false,
//   createDate: new Date(),
// };

// notes.push(note);
// notes.push(note);
// notes.push(note);

// localStorage.setItem(lsKey, );

// // 2. wczytywanie z localStorage
//

// const mappedNotes = notesFromLocalStorage.map((note) => {
//   note.createDate = new Date(note.createDate);
//   return note;
// });

// //3. modyfkowanie struktury htmla
// function showNotes() {
//   const notesContainer = document.querySelector("main");
//   // pierwszy sposób
//   // for(const note of mappedNotes) {
//   //     // console.log(note.createDate.toLocaleString());
//   //     const htmlNote =
//   //         `<section class="note">
//   //             <h1>${note.title}</h1>
//   //             <p>${note.content}</p>
//   //             <h4>${note.createDate.toLocaleString()}</h4>
//   //             <button>usuń</button>
//   //         </section>`;
//   //     notesContainer.innerHTML += htmlNote;
//   // }

//   // drugi sposób
//   for (const note of mappedNotes) {
//     // console.log(note.createDate.toLocaleString());
//     const htmlNote = document.createElement("section");
//     const htmlTitle = document.createElement("h1");
//     const htmlContent = document.createElement("p");
//     const htmlDate = document.createElement("h4");
//     const htmlRemoveBtn = document.createElement("button");

//     htmlTitle.innerHTML = note.title;
//     htmlContent.innerHTML = note.content;
//     htmlDate.innerHTML = note.createDate.toLocaleString();
//     htmlRemoveBtn.innerHTML = "usuń";

//     // htmlRemoveBtn.addEventListener()

//     htmlNote.classList.add("note");
//     htmlNote.appendChild(htmlTitle);
//     htmlNote.appendChild(htmlContent);
//     htmlNote.appendChild(htmlDate);
//     htmlNote.appendChild(htmlRemoveBtn);

//     notesContainer.appendChild(htmlNote);
//   }
// }

// // usuwanie elementu ze struktury html
// // notesContainer.removeChild()

// // 4. pobieranie danych z formularzy
// document.querySelector("#noteAdd").addEventListener("click", onNewNote);

// function onNewNote() {
//   const title = document.querySelector("#noteTitle").value;
//   const content = document.querySelector("#noteContent").value;
//   console.log(title, content);
// }
