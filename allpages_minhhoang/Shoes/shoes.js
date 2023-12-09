const storedProducts = JSON.parse(localStorage.getItem("products"));
const productElement = document.querySelector("#allProduct-showcase");

function renderFilteredProducts(products) {
    products.forEach((product) => {
          if (product && product.categories && Array.isArray(product.categories) && product.categories.includes("Shoes")) {
            
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
          displayedPrice = `$${product.price}`
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
                      <a href="" class="layout-icon-style"><i class="fa fa-link" aria-hidden="true"></i></a>
                      </li>
                      <li>
                      <button class="layout-icon-style" style ="width:57px;" onclick="addtoCart()"><i class="fa fa-shopping-bag" aria-hidden="true"></i>
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
    }
    });
  }

  //function render sidebar products
  const sidebarElement = document.querySelector('.products-sidebar-showcase')
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
          displayedPrice = `$${product.price}`
        }
    
        const starRatingSidebarHTML = getStarRatingSidebar(numberOfReviewsSideBars);
    
        const sideBarproductHTML = `
          <li>
            <a href="#">
              <div class="sidebar-product-img">
                <img src="${product.img[0]}"> 
              </div>
              <span class="sidebar-product-title">${product.productName}</span> 
            </a>
            <div class="star-rating" title="rated ${numberOfReviewsSideBars} out of 5" data-rating="${numberOfReviewsSideBars}">
              ${starRatingSidebarHTML}
            </div>
            <span class="price">${displayedPrice}</span>
          </li>
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
      const starClass = i <= numberOfReviews ? "star" : "starOpacity";
      starsHTML += `<span class="${starClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
    }
    return starsHTML;
  }
  
  // Star rating sidebar 
  function getStarRatingSidebar(numberOfReviewsSideBars) {
    if (numberOfReviewsSideBars === 0) {
      return ''; 
    }
  
    let starsSideBarHTML = "";
    for (let i = 5; i > 0; i--) {
      let starsSideBarClass = i;
      if (starsSideBarClass <= numberOfReviewsSideBars) {
        starsSideBarClass = "star";
      } else {
        starsSideBarClass = "starOpacity"
      }
      starsSideBarHTML += `<span class="${starsSideBarClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
    }
    return starsSideBarHTML;
  }
renderSidebarProducts(storedProducts);
renderFilteredProducts(storedProducts);