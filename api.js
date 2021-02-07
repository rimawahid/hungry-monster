const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


//get meal list that matches with the ingredients
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`)
    .then(res => res.json())
    .then(data =>{
        let food = "";
        if(data.meals){
            data.meals.forEach(meal =>{
                food += `
                    <div  class="meal-item " data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        }else{
            food = "Sorry , we did not find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = food;
    });
}

//get recipe of the mealList
function getMealRecipe(food){
    food.preventDefault();
    if(food.target.classList.contains('recipe-btn')){
        let mealItems = food.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems.dataset.id}`)
        .then(res => res.json())
        .then(data => 
            mealRecipeModal(data.meals[0]))
    }
}

//create a model
function mealRecipeModal(meal){
    console.log(meal);
   meals = meal;
    let html = `
        <div class = "recipe-meal-img">
        <img src = "${meals.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">${meals.strMeal}</h2>
        
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meals.strIngredient1}</p>
            <p>${meals.strIngredient2}</p>
            <p>${meals.strIngredient3}</p>
            <p>${meals.strIngredient4}</p>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}