

async function getIngredient() {
    try{
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let data = await res.json();
        console.log(data.meals);
        displayIngredient(data.meals);
    }
    catch(err){
        console.log(err);
        
    }
}

getIngredient()

function displayIngredient(meal){
    let cartona = '';
    for(let i =0 ; i < meal.length ; i++ ){
        cartona += `
        <div class="col-md-3 text-white text-center mb-4">
        <div class="item " onclick="getMealIngr('${meal[i].strIngredient}')">
                    <i class="fa-solid fa-drumstick-bite fa-3x mb-2"></i>
                    <h3>${meal[i].strIngredient}</h3>
                    <p class="small">${meal[i].strDescription ? meal[i].strDescription.split(" ").slice(0, 15).join(" ") : ""}</p>
                    </div>
                </div>
        `
    }
    $('.rowData').html( cartona);
}


async function getMealIngr(meals) {
    try{
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meals}`);
        let data = await res.json();
        console.log(data);
        displayData(data.meals);
    }
    catch(err){
        console.log(err);
        
    }
}

function displayData(meals){
    var cartona = '';
    for(var i = 0 ; i < meals.length ; i++){
        cartona += `
        <div class="col-md-3 mb-4">
                    <div class="item position-relative rounded-4 cursor-pointer" onclick="getMealDetails('${meals[i].idMeal}')">
                        <img src="${meals[i].strMealThumb}" class="w-100" alt="meal">
                        <div class="caption bg-white bg-opacity-75 position-absolute top-0 bottom-0 start-0 end-0 rounded-4 d-flex align-items-center p-2">
                            <h3>${meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    $('.rowData').html(cartona);
}


// details
async function getMealDetails(Id) {
    try{
        let res = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`);
        let data = await res.json();
        console.log(data.meals);
        displayMealDetails(data.meals[0]);
        
    }catch(err){
        console.log(err);
    }
}


function displayMealDetails(meal){
    let ingredients = ``;
    for(let i = 1; i<=20; i++){
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient !== ""){
            ingredients += `<li class="badge bg-primary-subtle text-primary-emphasis m-1 p-2">${measure} ${ingredient}</li>`;
        }
    }
    let tags = meal.strTags ? meal.strTags.split(",").map(tag => `<li class="badge bg-warning text-dark m-1 p-2">${tag}</li>`).join("") : "No tags";

    let cartona = `
        <div class="col-md-4 text-white">
                    <img src="${meal.strMealThumb}" class="w-100 rounded-4" alt="meal">
                    <h2 class="mt-3">${meal.strMeal}</h2>
                </div>
                <div class="col-md-8 text-white">
                    <h4>Instructions</h4>
                    <p>${meal.strInstructions}</p>
                    <h5><span class="fw-bold">Area:</span>${meal.strArea}</h5>
                    <h5><span class="fw-bold">Category:</span>${meal.strCategory}</h5>
                    <h5>Recipes:</h5>
                    <ul class="list-unstyled d-flex flex-wrap">${ingredients}</ul>
                    <h5>Tags:</h5>
                    <ul class="list-unstyled d-flex flex-wrap">${tags}</ul>
                    <a href="${meal.strSource}" target="_blank" class="btn btn-success me-2">Source</a>
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">YouTube</a>
                </div>
    `;
    $('.rowData').html( cartona);
}


// loading
jQuery(function () {
  setTimeout(function () {
    $(".loading").animate(
      { top: "100%" },
      500,
      function () {
        $("body").css({ overflow: "auto" });
      }
    );
  }, 800);
});