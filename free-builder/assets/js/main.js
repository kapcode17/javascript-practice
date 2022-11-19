const sandbox = document.querySelector(".sandbox");
const sandboxBtnCount = 50;
let sandboxBtns = [];
const inventory = document.querySelector(".inventory");
const items = ["dirt-grass.png", "dirt.png", "stone-block.png", "lava-block.png", "grass.png", "wood-block.png", "green-block.png", "blue-block.png"];
let slots = [];
let selectedItem;
let selectedSlot;

function setupSandbox() {
  for(let i = 0; i < sandboxBtnCount; i++) {
    createSandboxBtn(i);
  }
  
  //load
  const dataItems = JSON.parse(localStorage.getItem("dataItems"));

  if(dataItems) {
    dataItems.forEach((dataItem, i) => {
      selectedItem = dataItem;
      fillBtn(i);
    });
    selectedItem = null;
  }
}

function createSandboxBtn(index) {
  const newBtn = document.createElement("button");
  newBtn.setAttribute("data-item", "");
  newBtn.classList.add("sandbox-btn");
  newBtn.addEventListener("click", function () {
    fillBtn(index);
  });
  sandbox.appendChild(newBtn);

  sandboxBtns.push(newBtn);
}

function fillBtn(index) {
  if(selectedItem) {
    sandboxBtns[index].style.backgroundImage = `url(assets/images/${selectedItem})`;
    sandboxBtns[index].dataset.item = selectedItem;
  }
  else {
    sandboxBtns[index].style.backgroundImage = null;
    sandboxBtns[index].dataset.item = "";
  }

  //save
  let dataItems = sandboxBtns.map((btn) => {
    return btn.dataset.item;
  });
  localStorage.setItem("dataItems", JSON.stringify(dataItems));
}


function createSlot(item) {
  const newSlot = document.createElement("button");
  newSlot.addEventListener("click", function () {
    if(selectedSlot !== newSlot) {
      selectItem(item);

      slots.forEach(function (slot) {
        slot.classList.remove("selected");
      })
      newSlot.classList.add("selected");

      selectedSlot = newSlot;
    } else {
      selectedSlot = null;
      selectedItem = null;

      newSlot.classList.remove("selected");
    }
  });
  newSlot.classList.add("inventory-slot");

  newSlot.innerHTML = `<img src="assets/images/${item}" alt="">`

  inventory.appendChild(newSlot);

  slots.push(newSlot);
}

function setupInventory() {
  items.forEach(function (item) {
    createSlot(item);
  })
}

function selectItem(item) {
  selectedItem = item;
}



window.addEventListener("load", function () {
  setupSandbox();
  setupInventory();
});