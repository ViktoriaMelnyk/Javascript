const addBTn = document.getElementById('add');
const container = document.getElementById('notes__container');
const notes = JSON.parse(localStorage.getItem('notes'));

console.log(notes);
if(notes){
    notes.forEach(note => addNewNote(note));
}

addBTn.addEventListener('click', () => addNewNote('Hello'));

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('item');
    note.innerHTML = `
        <div class="tools">
            <div class="tools-left">
                <i class="fas fa-thumbtack" id='pinnNote'></i>
                <i class="fas fa-palette"></i>
                <i class="fas fa-pen-nib" id="edit"></i>
            </div>
            <i class="fas fa-times" id="delete" title="Usunąć notatkę"></i>
        </div>
        <div class="main ${text ? '' : 'hidden'}"></div>
        <textarea class = "${text ? 'hidden' : ''}"></textarea>
    `;
    const editNote = note.querySelector('#edit');
    const deleteNote = note.querySelector('#delete');
    const main =note.querySelector  ('.main');
    const textArea = note.querySelector('textarea');

    deleteNote.addEventListener('click', () =>{
        note.remove();
        updateLS();
    });
    editNote.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');  
    });


    updateLS();
    container.appendChild(note);
    
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes =[];
    notesText.forEach(note => notes.push(note.value));
    localStorage.setItem('notes', JSON.stringify(notes));
}


// console.log(notesFromLocalStorage);



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

