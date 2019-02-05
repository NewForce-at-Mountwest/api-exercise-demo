fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    parsedFoods.forEach(singleFood => {
      //Print foods to DOM
      //   console.log(singleFood);
      fetch(
        `https://world.openfoodfacts.org/api/v0/product/${
          singleFood.barcode
        }.json`
      )
        // .then(taco => taco.json())
        .then(function(response) {
          return response.json();
        })
        .then(productInfo => {
          let ingredientList = "";
          for (let i = 0; i < 5; i++) {
            ingredientList += ` ${productInfo.product.ingredients[i].text}`;
          }
          // singleFood.ingredients = productInfo.product.ingredients_text;
          // if(!productInfo.product.ingredients){
          //     productInfo.product.ingredients = "No ingredients for you"
          // }
          // Use it here
          document.querySelector(
            "#food-container"
          ).innerHTML += `<div class="food-card">
         <h3>${singleFood.name}</h3>
         <p>${singleFood.ethnicity}</p>
         <p>${singleFood.category}</p>
         <p>${ingredientList}</p>
         </div>`;
        });
    });
  });
