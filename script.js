const createBtn = document.querySelector(".btn");
const notesContainer = document.querySelector(".notes-container");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}

showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

createBtn.addEventListener("click", () => {
  let noteDiv = document.createElement("div");
  noteDiv.className = "note";

  let inputBox = document.createElement("p");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  inputBox.setAttribute("placeholder", "Type your note here..."); // Use placeholder

  let trashIcon = document.createElement("i");
  trashIcon.className = "fa-solid fa-trash delete";

  noteDiv.appendChild(inputBox);
  noteDiv.appendChild(trashIcon);
  notesContainer.appendChild(noteDiv);
  updateStorage(); // Update storage after adding a note
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.classList.contains("input-box")) {
    e.target.onkeyup = debounce(() => {
      updateStorage();
    }, 300); // Update storage after a short delay
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
