// for top rated products in footer
let topratedProducts_img;
topratedProducts_img = document.querySelector(".topratedProducts");
// console.log(topratedProducts_img);


// for spring shop
const storedProducts = JSON.parse(localStorage.getItem("products"));
const productElement = document.querySelector("#product-list");
//Render new products
function renderNewProducts(products) {
  console.log(products);
  products.forEach((product) => {
    if (product.newProduct === "1") {
      let displayedPrice = "";
      let discountSpan = "";
      let numberOfReviews = parseInt(product.review);
      if (product.discount === "1") {
        displayedPrice = `
                 <del>${product.price}</del>
                 <span>${product.discountPrice}</span>
                 `;
        discountSpan = '<span class="onsale"><span>Sale!</span></span>';
      } else {
        displayedPrice = product.price;
      }

      const starRatingHTML = getStarRating(numberOfReviews);

      const productHTML = `
            <div class="product-container">
            <div class="product-content">
            <div class="product-img"
            onmouseover="changeImage(this, '${product.img[1]}')" 
            onmouseout="changeImage(this, '${product.img[0]}')">
            <a href="">
            <img class="product-img-idle" src="${product.img[0]}" 

            alt="Product Image">
            </a> 
            ${discountSpan}
                 <div class="img-overlay">
                    <ul>
                    <li>
                    <a href=""><i class="fa fa-shopping-bag" aria-hidden="true"></i>
                    </a>
                    </li>
                    <li>
                    <a href=""><i class="fa fa-link" aria-hidden="true"></i>
                    </a>
                    </li>
                    </ul>
                <span class="topaz-hover"></span>
        

                </div> 
            </div>
              <a href=""><p>${product.productName}</p> </a>
              <div class="star-rating" title="rated ${numberOfReviews} out of 5" data-rating ="${numberOfReviews}">
              ${starRatingHTML}
              </div>
              </div>
              <span class="price">${displayedPrice}</span>
      
            </div>
            
            `;
      productElement.innerHTML += productHTML;
    }
  });
}


// change img
function changeImage(element, newImage) {
  element.querySelector(".product-img-idle").src = newImage;
}

// Star rating
function getStarRating(numberOfReviews) {
  let starsHTML = "";
  for (let i = 5; i > 0; i--) {
    const starClass = i <= numberOfReviews ? "star" : "starOpacity";
    starsHTML += `<span class="${starClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
  }
  return starsHTML;
}

renderNewProducts(storedProducts);

// Function filter sản phẩm
function filterProductsByCategory(category) {
    const filteredProducts = storedProducts.filter(product => {
        return product.newProduct === "1" && product.categories.includes(category);
    });
    console.log(filteredProducts)
    renderNewProducts(filteredProducts);
}

const allFilter = document.querySelector("#allFilter");
const accessoriesFilter = document.querySelector("#productAcessories");
const bagFilter = document.querySelector("#productBag");
const sabatFilter = document.querySelector("#productSabat");
const shoesFilter = document.querySelector("#productShoes");
const trapperFilter = document.querySelector("#productTrapper");

allFilter.addEventListener("click", function(event) {
    document.getElementById("product-list").innerHTML = ""
    event.preventDefault();
    renderNewProducts(storedProducts);
});

accessoriesFilter.addEventListener("click", function(event) {
    document.getElementById("product-list").innerHTML = ""
    event.preventDefault();
    filterProductsByCategory("Accessories");
});

bagFilter.addEventListener("click", function(event) {
    document.getElementById("product-list").innerHTML = ""
    event.preventDefault();
    filterProductsByCategory("Bag");
});

sabatFilter.addEventListener("click", function(event) {
    document.getElementById("product-list").innerHTML = ""
    event.preventDefault();
    filterProductsByCategory("Sabat");
});

shoesFilter.addEventListener("click", function(event) {
    document.getElementById("product-list").innerHTML = ""
    event.preventDefault();
    filterProductsByCategory("Shoes");
});

trapperFilter.addEventListener("click", function(event) {
    document.getElementById("product-list").innerHTML = ""
    event.preventDefault();
    filterProductsByCategory("Trapper");
});

//Hieu ung active khi click vao filter bar
document.addEventListener("DOMContentLoaded", function () {
  const allFilter = document.getElementById("allFilter");
  allFilter.classList.add("active");
  const filterItems = document.querySelectorAll(".filter-bars ul li");
  filterItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      filterItems.forEach((el) => {
        el.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});
// ==============================================

// for footer
// find top rated products
let toprated = JSON.parse(localStorage.getItem("products"));
let topratedProducts_img_content = "";
let maxReview = Number(toprated[0].review);
for (let i = 0; i < toprated.length; i++) {
  if (maxReview < Number(toprated[i].review)) {
    maxReview = Number(toprated[i].review);
  }
}
console.log(maxReview);

// generate top rated products
for (let j = 0; j < toprated.length; j++) {
  if (Number(toprated[j].review) === maxReview) {
    console.log(toprated[j]);
    topratedProducts_img_content += `
    <img src="${toprated[j].img[1]}" alt="pict" />
    `;
    topratedProducts_img.innerHTML = topratedProducts_img_content;
  }
}
// ==============================================
