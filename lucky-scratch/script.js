const paper = document.getElementById("paper");
const slots = paper.querySelectorAll(".slot");

const resultModal = document.getElementById("resultModal");

let skullIndex = 0;

let showedSlots = [];

let gameOver = false;

slots.forEach((slot, i) => {
  slot.addEventListener("click", () => {
    if(gameOver) return
    if(!showedSlots.includes(slot)) {
      showedSlots.push(slot);

      slot.classList.remove("slot-hidden");

      if(skullIndex === i) {
        showResultModal("You Lose!");
      } 
      else if(showedSlots.length === (slots.length - 1)) {
        showResultModal("You Win!")
      }    
    } 
  });
})

function setupSkull() {
  skullIndex = Math.floor(Math.random() * slots.length);

  slots[skullIndex].innerHTML += `<img class="skull" src="images/skull.png" alt="">`;
}

function showResultModal(textContent) {
  gameOver = true;
  setTimeout(() => {
    const textEl = document.getElementById("resultModalText");
    textEl.textContent = textContent;
    resultModal.classList.remove("hidden");
  }, 1000);
}


window.addEventListener("load", () => {
  setupSkull();

  console.log("skull index: " + skullIndex);
});