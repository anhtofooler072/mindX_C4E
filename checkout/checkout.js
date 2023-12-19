const storedProducts = JSON.parse(localStorage.getItem("products"));
const productElement = document.querySelector("#allProduct-showcase");
let orderList=JSON.parse(localStorage.getItem('added-to-Cart'))
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
              <div class="products-sidebar-showcase-info">
              <span class="sidebar-product-title">${product.productName}</span> 
            </a>
            <div class="star-rating" title="rated ${numberOfReviewsSideBars} out of 5" data-rating="${numberOfReviewsSideBars}">
              ${starRatingSidebarHTML}
            </div>
            <span class="price">${displayedPrice}</span>
              </div>
          </li>
        `;
    
        sidebarElement.innerHTML += sideBarproductHTML;
      }
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
// Check out - Order
// let total=0
// function sum(orderList) {
//     for (let i=0;i<orderList.length;i++) {
//         orderList[i].pItem.discount==1 ? total+=(orderList[i].pItem.discountPrice*orderList[i].sl) : total+=(orderList[i].pItem.price*orderList[i].sl)
//         console.log(total);
//     }
// }
// sum(orderList)
let listOrder=``
let totalOrder=``
function render(list) {
    for (let i=0;i<list.length;i++) {
        let pPrice
        list[i].discount==1 ? pPrice=list[i].pItem.discountPrice : pPrice=list[i].pItem.price 
        console.log(pPrice);
        listOrder+=`
                    <tr>
                        <td class="tb-left">${list[i].pItem.productName} x<span class="tb-productSl">${list[i].sl}</span></td>
                        <td class="tb-right "><span class="tb-productPrice">$${pPrice}</span></td>
                    </tr>`}
         totalOrder+=` 
                    <tr>
                        <th class="tb-left">Subtotal</th>
                        <th class="tb-right "><span class="tb-subtotal">$${total}</span></th>
                    </tr>
                    <tr>
                        <th class="tb-left">Total</th>
                        <th class="tb-right "><span class="tb-total">$${JSON.parse(localStorage.getItem("totalprice"))}</span></th>
                    </tr>
            `
  }
render(orderList);
document.querySelector(".list-render").innerHTML+=listOrder
document.querySelector(".total-render").innerHTML+=totalOrder