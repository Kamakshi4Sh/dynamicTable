// IIFE
const state = (() => {
  return {
    allRecords: [],
    searchResults: [],
    isEdit: false,
    editIndex: -1,
  };
})();

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("company").value = "";
  document.getElementById("place").value = "";
}

function validateValue(text, error) {
  if (text.trim().length === 0) {
    throw Error(error);
  }
}

function validateData(name, company, place) {
  validateValue(name, "Please enter name");
  validateValue(company, "Please enter company");
  validateValue(place, "Please enter place");
}

function addOrSaveRow() {
  try {
    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;
    const place = document.getElementById("place").value;
    const data = { name, company, place };

    validateData(name, company, place);
    clearInputs();

    if (state.isEdit) {
      updateButtonTitle("Add");
      state.allRecords = state.allRecords.map((item, index) =>
        index === state.editIndex ? { ...item, ...data } : item
      );

      state.isEdit = false;
      state.editIndex = -1;
    } else {
      state.allRecords.push(data);
    }
    state.searchResults = [...state.allRecords];

    renderTable();
  } catch (e) {
    alert(e.message);
  }
}

function mySearch() {
  var input = document.getElementById("myInput");
  var text = input.value;

  state.searchResults = state.allRecords.filter((item) =>
    JSON.stringify(item).includes(text)
  );
  if (state.searchResults.length === 0) {
    state.searchResults = [...state.allRecords];
  }
  renderTable(false);
}

function renderRow(item = {}, index) {
  let table = document.getElementById("tbody");
  let row = document.createElement("tr");
  const { name, company, place } = item;
  const rowId = index + 1;

  const singleRow = `
    <td data-name="name">${rowId}</td>
    <td data-name="name">${name}</td>
    <td data-name="company">${company}</td>
    <td data-name="place">${place}</td>
    <td><button  id="button" type="button" class="btn btn-primary" onclick="editRow(${index})">Edit</button><button  id="button" type="button" class="btn btn-danger" onclick="deleteRow(${index})">Delete</button></td>
    `;
  row.innerHTML = singleRow;

  table.appendChild(row);
}

function renderTable(isFirstTime) {
  if (!isFirstTime) {
    let tbody = document.getElementById("tbody");
    const children = Array.from(tbody.children);
    children.forEach((i) => i.remove());
  }
  state.searchResults.forEach(renderRow);
}

function updateButtonTitle(title) {
  const button = document.getElementById("button");
  button.innerText = title;
}

function editRow(index) {
  state.isEdit = true;
  state.editIndex = index;

  const { name, company, place } = state.searchResults[index] || {};
  document.getElementById("name").value = name;
  document.getElementById("company").value = company;
  document.getElementById("place").value = place;
  updateButtonTitle("Save");

  renderTable(false);
}

function deleteRow(indexToRemove) {
  state.allRecords = state.allRecords.filter(
    (_, index) => index !== indexToRemove
  );
  state.searchResults = [...state.allRecords];
  renderTable();
}

renderTable();