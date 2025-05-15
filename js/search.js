var rowData = document.querySelector('.rowData');


async function getMeals(name) {
    try{
        let res = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        let data = await res.json();
        displayData(data.meals);
    }catch(err){
        console.log(err);
    }
}

function displayData(arr){
    let cartona = '';
    for (let i = 0 ; i < arr.length; i++){
        cartona += `
        <div class="col-md-3 mb-4">
                    <div class="item position-relative rounded-4" onclick="getMealDetails('${arr[i].idMeal}')">
                        <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
                        <div class="caption bg-white bg-opacity-75 position-absolute top-0 bottom-0 start-0 end-0 rounded-4 d-flex align-items-center p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = cartona;
}

// searchInput
$("#searchName").on("input",function(){
    let value = $(this).val();
    getMeals(value);
});

$("#searchLetter").on("input", function () {
    let value = $(this).val();
    getMealsLetter(value);  
});

// searchLetter
async function getMealsLetter(letter) {
    try{
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data = await res.json();
        displayData(data.meals);
    }catch(err){
        console.log(err);
    }
}


// details
async function getMealDetails(id) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await res.json();
        let meal = data.meals[0];
        showMealDetails(meal);
    } catch (err) {
        console.log(err);
    }
}

function showMealDetails(meal) {
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
        ingredients += `<li class="badge bg-primary-subtle text-primary-emphasis m-1 p-2">${measure} ${ingredient}</li>`;
        }
    }

    let tags = meal.strTags ? meal.strTags.split(",").map(tag => `<li class="badge bg-warning text-dark m-1 p-2">${tag}</li>`).join("") : `<li>No tags</li>`;

    let details = `
        <div class="col-md-4 text-white">
        <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="${meal.strMeal}">
        <h3 class="mt-3">${meal.strMeal}</h3>
        </div>
        <div class="col-md-8 text-white">
        <h4>Instructions</h4>
        <p>${meal.strInstructions}</p>
        <h5><strong>Area:</strong> ${meal.strArea}</h5>
        <h5><strong>Category:</strong> ${meal.strCategory}</h5>
        <h5>Ingredients:</h5>
        <ul class="list-unstyled d-flex flex-wrap">${ingredients}</ul>
        <h5>Tags:</h5>
        <ul class="list-unstyled d-flex flex-wrap">${tags}</ul>
        <a href="${meal.strSource}" class="btn btn-primary" target="_blank">Source</a>
        <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">YouTube</a>
        </div>
    `;

    rowData.innerHTML = details;
}



