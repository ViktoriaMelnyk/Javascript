const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');
const container = document.getElementById('notes__container');


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
        const { title, text, createDate } = note;
        console.log(title, text, createDate);

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
        //pinnIcon.setAttribute('onclick', pinnNote());
        const paletteIcon = document.createElement('i');
        paletteIcon.classList.add('fas', 'fa-palette');
        //paletteIcon.setAttribute('onclick', chengeColour());
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit');
        
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
        toolsLeft.append(pinnIcon, paletteIcon, editIcon);
        tools.append(toolsLeft, date, deleteIcon);
        item.append(tools,Title,Text);
        container.appendChild(item);


        //pinnIcon.setAttribute('onclick', pinnNote());
        // item.innerHTML = `
        //     <div class="tools">
        //         <div class="tools-left">
        //             <i class="fas fa-thumbtack" id='pinnNote'></i>
        //             <i class="fas fa-palette" id='colour'></i>
        //             <i class="fas fa-edit"></i>
        //         </div>
        //         <div class="date">${createDate.toLocaleString()}</div>
        //         <i class="fas fa-times" id="delete" title="Usunąć notatkę"></i>
        //     </div>
        //     <div class="title">${title}</div>
        //     <textarea class="note-textarea" maxlenght=“10”>${text}</textarea>
        // `;

        // container.appendChild(item);
        // const deleteNote = item.querySelector('#delete');
        // deleteNote.addEventListener('click',()=>{
        //     item.remove();

        // });
    });
}


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
                createDate: new Date().toLocaleString(),
            },
        ];
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
//Handle data from form
function storeNote(e) {
    e.preventDefault();
    const titleValue = noteTitle.value;
    let textValue = noteText.value;
    console.log(titleValue, textValue);
    const note = {
        title: titleValue,
        text: textValue,
        createDate: new Date().toLocaleString(),
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
// // notesContainer

// // 4. pobieranie danych z formularzy
// document.querySelector("#noteAdd").addEventListener("click", onNewNote);

// function onNewNote() {
//   const title = document.querySelector("#noteTitle").value;
//   const content = document.querySelector("#noteContent").value;
//   console.log(title, content);
// }
