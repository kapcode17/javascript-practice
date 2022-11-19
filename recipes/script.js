const mealList = document.getElementById("mealList");
const titleText = document.getElementById("title");

const form = document.getElementById("form");
const searchTerm = document.getElementById("searchTerm");
const searchBtn = document.getElementById("searchBtn");
const favCounter = document.getElementById("favCounter");

const SEARCHAPI = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const infoModal = { 
  main: document.getElementById("infoModal"), 
  closeBtn: document.getElementById("infoModalClose"), 
  nameText: document.getElementById("infoModalName"), 
  image: document.getElementById("infoModalImg"), 
  descText: document.getElementById("infoModalDesc"),
  ingList: document.getElementById("infoModalIngs")
};

let isFav = false;

const noticeText = document.getElementById("notice");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

infoModal.closeBtn.addEventListener("click", () => {
  infoModal.main.classList.add("hidden");
});

async function getMealsBySearch(term) {
  titleText.textContent = `Result for ${term}`;
  isFav = false;
  return await fetch(SEARCHAPI + term)
  .then((resp) => resp.json())
  .then((data) => data.meals)
}

async function getRandomMeals() {
  titleText.textContent = "Random Meals";
  isFav = false;
  return await fetch(SEARCHAPI)
  .then((resp) => resp.json())
  .then((data) => data.meals)
}

function addMeal(mealData) {
  const newMeal = document.createElement("div");
  newMeal.classList.add("meal");
 
  newMeal.innerHTML = `
      <div class="meal-header">
          <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
          />
      </div>
      <div class="meal-body">
          <h4>${mealData.strMeal}</h4>
          <button class="fav-btn" id="favBtn"><i class="bi bi-heart${isSavedFavMealId(mealData.idMeal) ? "-fill" : ""}"></i></button>
      </div>
  `;

  const favBtn = newMeal.querySelector("#favBtn");
  
  newMeal.addEventListener("click", () => {
    openInfoModal(mealData);
  });

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if(!isSavedFavMealId(mealData.idMeal)) {
      saveFavMealId(mealData.idMeal);

      favBtn.innerHTML = `<i class="bi bi-heart-fill"></i>`;
    } else {
      deleteSavedFavMealId(mealData.idMeal);
      if(isFav) {
        newMeal.remove();
      } else {
        favBtn.innerHTML = `<i class="bi bi-heart"></i>`;
      }
    }

    favCounter.textContent = getSavedFavMealIds().length;
  });

  mealList.appendChild(newMeal);
}

async function setupMealList() {
  const meals = await getRandomMeals();

  console.log(meals);
  
  if(meals) {
    meals.forEach((meal) => addMeal(meal));
  }
}

function displayMeals(meals) {
  mealList.innerHTML = "";
  if(meals?.length > 0) {
    meals.forEach((meal) => addMeal(meal));

    noticeText.classList.add("hidden");
  } else {
    if(!isFav)
    noticeText.textContent = "No result";
    else
    noticeText.textContent = "No favourite";

    noticeText.classList.remove("hidden");
  }
}

searchBtn.addEventListener("click", async () => {
  const meals = await getMealsBySearch(searchTerm.value);
  
  displayMeals(meals);
});

function openInfoModal(mealData) { 
  infoModal.nameText.textContent = mealData.strMeal;
  infoModal.image.src = mealData.strMealThumb;
  infoModal.descText.textContent = mealData.strInstructions;
  infoModal.ingList.innerHTML = "";

  for(let i = 1; i <= 20; i++) {
    const ingredient = mealData["strIngredient" + i];

    if(ingredient) {
      infoModal.ingList.innerHTML += `<li><i class="bi bi-egg-fill"></i> ${ingredient}</li>`;
    }
  }

  infoModal.main.classList.remove("hidden");
}

function saveFavMealId(mealId) {
  const favMealIds = getSavedFavMealIds();

  localStorage.setItem("favMealIds", JSON.stringify([...favMealIds, mealId]));
}

function deleteSavedFavMealId(mealId) {
  const favMealIds = getSavedFavMealIds();

  localStorage.setItem("favMealIds", JSON.stringify(favMealIds.filter((id) => id !== mealId)));
}

function getSavedFavMealIds() {
  const favMealIds = JSON.parse(localStorage.getItem("favMealIds"));

  return favMealIds === null ? [] : favMealIds;
}

function isSavedFavMealId(idMeal) {
  const favMealIds = getSavedFavMealIds();
  return favMealIds.includes(idMeal);
}

async function getMealById(id) {
  return await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
  .then((resp) => resp.json())
  .then((data) => data.meals[0])
}

async function displayFavMeals() {
  titleText.textContent = "Your favourite Meals"
  isFav = true;
  const favMealIds = getSavedFavMealIds();
  let favMeals = [];

  for(let i = 0; i < favMealIds.length; i++) {
    const meal = await getMealById(favMealIds[i]);
    favMeals.push(meal);
  }

  console.log("savedFavMealIds: " + favMealIds);
  
  displayMeals(favMeals);
}


window.addEventListener("load", () => {
  setupMealList();

  favCounter.textContent = getSavedFavMealIds().length;
})