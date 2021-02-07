const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click',getMealList);


//get meal list that matches with the ingredients
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(res => res.json())
    .then(data =>{
        let food = "";
        if(data.meals){
            data.meals.forEach(meal =>{
                food += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">GEt Recipes</a>
                        </div>
                    </div>
                `;
            });
        }else{
            food = "Sorry , we didnt find any meal"
        }
        mealList.innerHTML = food;
    })
}
