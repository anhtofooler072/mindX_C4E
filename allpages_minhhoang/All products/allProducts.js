// for header
// thứ ngày tháng năm trên header
let currentDay = new Date();
let day = document.getElementById("day");
let month = document.getElementById("month");
let day2 = document.getElementById("day2");
let years = document.getElementById("year");

let number_day = currentDay.getDay();
let day_name = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day.innerText = day_name[number_day] + " , ";
let number_month = currentDay.getMonth();
let month_name = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
month.innerText = month_name[number_month];
day2.innerText = currentDay.getDate();
years.innerText = currentDay.getFullYear();
//prevent default <a>
document.querySelector("a").addEventListener("click", function (event) {
  event.preventDefault();
});
//  get item from local storage
const storedProducts = JSON.parse(localStorage.getItem("products"));
const productElement = document.querySelector("#allProduct-showcase");

//Function render
function renderAllProducts(products) {
  products.forEach((product) => {
    let displayedPrice = "";
    let discountSpan = "";
    let numberOfReviews = parseInt(product.review);
    if (product.discount === "1") {
      displayedPrice = `
                   <del>$${product.price}</del>
                   <span>$${product.discountPrice}</span>
                   `;
      discountSpan = '<span class="onsale"><span>Sale!</span></span>';
    } else {
      displayedPrice = `$${product.price}`;
    }

    const starRatingHTML = getStarRating(numberOfReviews);

    const productHTML = `
              <div class="allProduct-container">
              <div class="allProduct-content">
              <div class="allProduct-img"
              onmouseover="changeImage(this, '${product.img[1]}')" 
              onmouseout="changeImage(this, '${product.img[0]}')">
              <a href="">
              <img class="allProduct-img-idle" src="${product.img[0]}" 
  
              alt="Product Image">
              </a> 
              ${discountSpan}
                   <div class="allProduct-img-overlay">
                      <ul>
                      <li>
                      <a href="../Detail_product/detailProduct.html" class="layout-icon-style" onclick="detailProduct('${product.productId}')" target="_blank"><i class="fa fa-link" aria-hidden="true"></i></a>
                      </li>
                      <li>
                      <button onclick = "addtoCart()" class="layout-icon-style" style ="width:57px;" onclick="addtoCart()"><i class="fa fa-shopping-bag" aria-hidden="true"></i>
                      </button>
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
  });
}
//function render sidebar products
const sidebarElement = document.querySelector(".products-sidebar-showcase");
function renderSidebarProducts(products) {
  const numberOfProductsToRender = 5;

  for (let i = 0; i < numberOfProductsToRender && i < products.length; i++) {
    let product = products[i];
    let displayedPrice = "";
    let numberOfReviewsSideBars = parseInt(product.review);

    if (product.discount === "1") {
      displayedPrice = `
          <del>$${product.price}</del>
          <span>$${product.discountPrice}</span>
        `;
    } else {
      displayedPrice = `$${product.price}`;
    }

    const starRatingSidebarHTML = getStarRatingSidebar(numberOfReviewsSideBars);

    const sideBarproductHTML = `
    <a href="">
    <li>
            <div class="sidebar-product-img">
              <img src="${product.img[0]}"> 
            </div>
            <span class="sidebar-product-title">${product.productName}</span> 
            <div class="star-rating" title="rated ${numberOfReviewsSideBars} out of 5" data-rating="${numberOfReviewsSideBars}">
            ${starRatingSidebarHTML}
            </div>
            <span class="price">${displayedPrice}</span>
            </li>
            </a>
      `;

    sidebarElement.innerHTML += sideBarproductHTML;
  }
}

// change img
function changeImage(element, newImage) {
  element.querySelector(".allProduct-img-idle").src = newImage;
}

// Star rating
function getStarRating(numberOfReviews) {
  let starsHTML = "";
  for (let i = 5; i > 0; i--) {
    let starClass = i;
    if (starClass <= numberOfReviews) {
      starClass = "star";
    } else {
      starClass = "starOpacity";
    }
    starsHTML += `<span class="${starClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
  }
  return starsHTML;
}

// Star rating sidebar
function getStarRatingSidebar(numberOfReviewsSideBars) {
  if (numberOfReviewsSideBars === 0) {
    return "";
  }

  let starsSideBarHTML = "";
  for (let i = 5; i > 0; i--) {
    let starsSideBarClass = i;
    if (starsSideBarClass <= numberOfReviewsSideBars) {
      starsSideBarClass = "star";
    } else {
      starsSideBarClass = "starOpacity";
    }
    starsSideBarHTML += `<span class="${starsSideBarClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
  }
  return starsSideBarHTML;
}

renderSidebarProducts(storedProducts);

// Sort by
let currentSortType = "default";
// change arrow icon and sort asc , desc
let sortDirection = "asc";
const arrowIcon = document.getElementById("arrowIcon");

arrowIcon.addEventListener("click", function () {
  if (arrowIcon.classList.contains("fa-arrow-up")) {
    arrowIcon.classList.remove("fa-arrow-up");
    arrowIcon.classList.add("fa-arrow-down");
    sortDirection = "desc";

    if (currentSortType === "price") {
      sortProductsByPrice(sortDirection);
    } else if (currentSortType === "rating") {
      sortProductsByReview(sortDirection);
    } else if (currentSortType === "name") {
      sortProductsByName(sortDirection);
    }
  } else if (arrowIcon.classList.contains("fa-arrow-down")) {
    arrowIcon.classList.remove("fa-arrow-down");
    arrowIcon.classList.add("fa-arrow-up");
    sortDirection = "asc";
    if (currentSortType === "price") {
      sortProductsByPrice(sortDirection);
    } else if (currentSortType === "rating") {
      sortProductsByReview(sortDirection);
    } else if (currentSortType === "name") {
      sortProductsByName(sortDirection);
    }
  }
});
//default
function sortProductsbyDefault() {
  document.getElementById("allProduct-showcase").innerHTML = "";
  renderAllProducts(storedProducts);
}
document
  .querySelector(".default-sort")
  .addEventListener("click", sortProductsbyDefault);

//name
document.querySelector(".name-sort").addEventListener("click", function () {
  // const direction = (sortDirection === 'asc') ? 'desc' : 'asc';
  sortProductsByName();
});

function sortProductsByName() {
  document.getElementById("allProduct-showcase").innerHTML = "";
  currentSortType = "name";
  const sortedByName = products.slice().sort((a, b) => {
    const nameA = a.productName.toUpperCase();
    const nameB = b.productName.toUpperCase();
    if (sortDirection === "asc") {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else if (sortDirection === "desc") {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    }
  });

  renderAllProducts(sortedByName);
}

//price
document.querySelector(".price-sort").addEventListener("click", function () {
  // const direction = (sortDirection === 'asc') ? 'desc' : 'asc';
  sortProductsByPrice();
});
function sortProductsByPrice() {
  document.getElementById("allProduct-showcase").innerHTML = "";
  currentSortType = "price";
  const sortedByPrice = products.slice().sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    if (sortDirection === "asc") {
      return priceA - priceB;
    } else if (sortDirection === "desc") {
      return priceB - priceA;
    }
  });
  renderAllProducts(sortedByPrice);
}

//rating
document.querySelector(".rating-sort").addEventListener("click", function () {
  // const direction = (sortDirection === 'asc') ? 'desc' : 'asc';
  sortProductsByReview();
});
function sortProductsByReview() {
  document.getElementById("allProduct-showcase").innerHTML = "";
  currentSortType = "rating";
  const sortedByReview = products.slice().sort((a, b) => {
    const reviewA = parseInt(a.review);
    const reviewB = parseInt(b.review);
    if (sortDirection === "asc") {
      return reviewB - reviewA;
    } else if (sortDirection === "desc") {
      return reviewA - reviewB;
    }
  });

  renderAllProducts(sortedByReview);
}

// Function render date / popularity random vi khong co data
function sortProductsRandomly() {
  document.getElementById("allProduct-showcase").innerHTML = "";
  const sortedRandomly = products.slice().sort(() => Math.random() - 0.5);
  renderAllProducts(sortedRandomly);
}
document
  .querySelector(".date-sort")
  .addEventListener("click", sortProductsRandomly);
document
  .querySelector(".popularity-sort")
  .addEventListener("click", sortProductsRandomly);

// change content on drop down list

const dropdownItems = document.querySelectorAll(".drop-down-list-sort li ");
const currentSortContent = document.querySelector(".current-sort-content");

dropdownItems.forEach(function (dropdown) {
  dropdown.addEventListener("click", function () {
    var clickedDropdown = dropdown.innerHTML;
    currentSortContent.innerHTML = clickedDropdown;
  });
});

renderAllProducts(storedProducts);


function detailProduct(id) {
  console.log(storedProducts);
  let data = storedProducts.find((item) => item.productId == id);
  console.log(data);
  localStorage.setItem("detailProduct", JSON.stringify(data));
}