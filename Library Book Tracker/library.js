let library = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isAvailable: true,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isAvailable: true,
  },
  {
    title: "The Lord of the Rings",
    author: "John Ronald Ruel Tolkien",
    isAvailable: true,
  },
];
console.log("Library: ", library);

function displayAvailableBooks() {
  let tableBody = document.querySelector("#bookTable tbody");
  tableBody.innerHTML = ""; // Clear any existing rows
  for (let i = 0; i < library.length; i++) {
    if (library[i].isAvailable) {
      let row = document.createElement("tr");
      let titleCell = document.createElement("td");
      titleCell.textContent = library[i].title;
      row.appendChild(titleCell);
      let authorCell = document.createElement("td");
      authorCell.textContent = library[i].author;
      row.appendChild(authorCell);
      let availabilityCell = document.createElement("td");
      availabilityCell.textContent = library[i].isAvailable
        ? "Available"
        : "Not Available";
      row.appendChild(availabilityCell);
      tableBody.appendChild(row);
    }
  }
}

function searchAvailableBook() {
  let input = document.getElementById("bookSearch").value.toLowerCase();
  let found = false;
  for (let i = 0; i < library.length; i++) {
    if (
      library[i].title.toLowerCase().includes(input) &&
      library[i].isAvailable
    ) {
      alert(`${library[i].title} by ${library[i].author} is available.`);
      found = true;
      break;
    }
  }
  if (!found) {
    alert("Book is not available.");
  }
  displayAvailableBooks();
}

function borrowBook() {
  let title = document.getElementById("bookSearch").value.toLowerCase();
  let bookFound = false;
  for (let i = 0; i < library.length; i++) {
    if (library[i].title.toLowerCase() === title.toLowerCase()) {
      bookFound = true;
      if (library[i].isAvailable) {
        library[i].isAvailable = false;
        alert(`You have borrowed "${library[i].title}".`);
      } else {
        alert(`"${library[i].title}" is already borrowed.`);
      }
      break;
    }
  }
  if (!bookFound) {
    alert(`The book titled ${title} is not found in the library.`);
  }
  displayAvailableBooks();
}

function returnBook() {
  let title = document.getElementById("bookSearch").value.toLowerCase();
  let bookFound = false;
  for (let i = 0; i < library.length; i++) {
    if (library[i].title.toLowerCase() === title.toLowerCase()) {
      bookFound = true;
      if (!library[i].isAvailable) {
        library[i].isAvailable = true;
        alert(`You have returned "${library[i].title}". It is now available.`);
      } else {
        alert(`"${library[i].title}" is already available.`);
      }
      break;
    }
  }
  if (!bookFound) {
    alert(`The book titled "${title}" is not found in the library.`);
  }
  displayAvailableBooks();
}

document.addEventListener("DOMContentLoaded", displayAvailableBooks);
