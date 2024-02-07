const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

const nameInput = document.getElementById("Nameandsurname");
const phoneInput = document.querySelector("input[type=number]");
const emailInput = document.querySelector("input[type=email]");
const cityInput = document.getElementById("City");
const categoryInput = document.querySelector("select[name=category]");
const saveBtn = document.getElementById("Savebtn");
const savedList = document.querySelector(".Savedlist ol");

function renderContacts() {
  savedList.innerHTML = contacts
    .map(
      (contact, index) => `
    <li>
      <span>${contact.name}</span>
      <span>${contact.phone}</span>
      <span>${contact.email}</span>
      <span>${contact.city}</span>
      <span>${contact.category}</span>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    </li>
  `
    )
    .join("");
    }

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function addContact() {
  if (
    !nameInput.value.trim() ||
    !phoneInput.value.trim() ||
    phoneInput.value.trim().length < 9
  ) {
    alert("შეავსეთ ყველა ველი,  !!ნომერი უნდა შეიცავდეს მინიმუმ 9 ციფრს!!!");
    return;
  }
  const contact = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    city: cityInput.value,
    category: categoryInput.value,
  };
  contacts.push(contact);
  saveContacts();
  renderContacts();
  nameInput.value = phoneInput.value = emailInput.value = cityInput.value = "";
  categoryInput.selectedIndex = 0;
}

function editContact(index) {
  const contact = contacts[index];
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;
  cityInput.value = contact.city;
  categoryInput.value = contact.category;
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}

function deleteContact(index) {
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}

saveBtn.addEventListener("click", addContact);

savedList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("edit-btn")) {
    editContact(target.dataset.index);
  } else if (target.classList.contains("delete-btn")) {
    deleteContact(target.dataset.index);
  }
});

renderContacts();
