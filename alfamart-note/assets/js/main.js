const itemList = document.querySelector(".item-list");

const items = [{ id: 0, name: "Dancow Box", image: "dancow.png", price: "Rp. 22000" }, { id: 1, name: "Nescafe Box", image: "nescafe.png", price: "Rp. 12000" }, { id: 2, name: "Sari Roti", image: "sari-roti.png", price: "Rp. 15000" }, { id: 3, name: "Carnation", image: "carnation.png", price: "Rp. 11000" }, { id: 4, name: "Golda Coffee", image: "golda.png", price: "Rp. 3000" }];

const itemSelectModal = { body: null, list: null, btn: null };
itemSelectModal.body = document.querySelector(".item-select-modal");
itemSelectModal.list = itemSelectModal.body.querySelector(".item-select-list");
itemSelectModal.btn = itemSelectModal.body.querySelector(".close-btn");

const header = { body: null, selectBtn: null, clearBtn: null };
header.body = document.querySelector("header");
header.selectBtn = header.body.querySelector("#selectItemBtn");
header.clearBtn = header.body.querySelector("#clearItemBtn");

let selectedItems = [];

function selectListItem(item) {
  if(!selectedItems.includes(item)) {
    addListItem(item);
  } else {
    removeListItem(item);
  }

  setItemListNotice();
}

function addListItem(item) {
  const element = document.createElement("div");
  element.setAttribute("data-id", item.id);
  element.classList.add("list-item");
  element.innerHTML = ` <img src="assets/img/items/${item.image}" alt="">
  <h3>${item.name}</h3>
  <p>${item.price}</p>`;

  itemList.appendChild(element);

  selectedItems.push(item);
}

function removeListItem(item) {
  const element = document.querySelector(`[data-id="${item.id}"]`).remove();

  selectedItems.splice(selectedItems.indexOf(item), 1);
}

function setupItemSelectModal() {
  items.forEach((item) => {
    createItemSelectListItem(item);
  });
}

function createItemSelectListItem(item) {
  const element = document.createElement("button");
  element.addEventListener("click", () => {
    selectListItem(item);
  });
  element.classList.add("item-select-list-item");
  element.innerHTML = `<button class="item-select-list-item">
  <img src="assets/img/items/${item.image}" alt="">
</button>`;

  itemSelectModal.list.appendChild(element);
}

function hideItemSelectModal() {
  itemSelectModal.body.classList.toggle("hidden");
}

itemSelectModal.btn.addEventListener("click", () => {
  itemSelectModal.body.classList.toggle("hidden");
})

function clearListItems() {
  itemList.innerHTML = "";
  selectedItems = [];

  setItemListNotice();
}

header.selectBtn.addEventListener("click", hideItemSelectModal);
header.clearBtn.addEventListener("click", clearListItems);

function getItemById(id) {
  return items.find
}

function setItemListNotice() {
  const notice = document.querySelector(".box .notice");

  if(itemList.hasChildNodes()) {
    notice.classList.add("hidden");
  } else {
    notice.classList.remove("hidden");
  }
}


window.addEventListener("load", () => {
  setupItemSelectModal();
});