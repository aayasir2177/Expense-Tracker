// ======================== Classes ========================
// Entry Constructor
class Entry {
  constructor(amount, description, category) {
    this.amount = amount;
    this.description = description;
    this.category = category;
  }
}

// Storage
class Storage {
  static getData() {
    if (localStorage.getItem("entries") === null) {
      const entries = [];
      localStorage.setItem("entries", JSON.stringify(entries));
      return entries;
    } else {
      const entries = JSON.parse(localStorage.getItem("entries"));
      return entries;
    }
  }

  static setData() {}

  static addToArray(amount, description, category) {
    let entries = Storage.getData();
    entries.push(new Entry(amount, description, category));
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  static removeFromArray() {}
}

// User Interface
class UI {
  static populateList(entries) {
    let tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";

    entries.forEach((entry) => {
      let tr = document.createElement("tr");

      tr.innerHTML = `
            <td>${entry.title}</td>
            <td>${entry.author}</td>
            <td>${entry.isbn}</td>
            <td> 
            <button type="button" class="btn btn-danger btn-sm del" onclick="removeEntry(this)">X</button>
            </td>
            `;

      tableBody.appendChild(tr);
    });
    console.log(entries);
  }
}

// ======================== Events ========================
// Populate list on window load
window.onload = () => {
  let entries = Storage.getData();
  UI.populateList(entries);
};

// Add Entry on Enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addEntry();
  }
});

// Add Entry on Click
function addEntry() {
  let amount = document.querySelector("#amount").value,
    description = document.querySelector("#description").value,
    category = document.querySelector("#category").value;

  if (amount === "" || description === "" || category === "") {
    alert("Please fill the fields!");
  } else {
    Storage.addToArray(amount, description, category);
    let entries = Storage.getData();
    UI.populateList(entries);

    (document.querySelector("#amount").value = ""),
      (document.querySelector("#description").value = ""),
      (document.querySelector("#category").value = "");

    console.log(entries);
  }
}

// Remove Entry on Click
function removeEntry(e) {
  removeFromArray(e);
}
