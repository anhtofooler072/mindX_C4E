let detail = JSON.parse(localStorage.getItem("detailProduct"));
console.log(detail);
let headerElement = document.querySelector(".page-title");
//function header detail

function renderHeader(detailProduct) {
  let categoriesDetail = "";
  if (detailProduct.categories[0] && detailProduct.categories[1]) {
    categoriesDetail = `
        <a href="#">${detailProduct.categories[0]}, </a><a href="#">${detailProduct.categories[1]}</a>
        `;
  } else if (detailProduct.categories[0]) {
    categoriesDetail = `
        <a>${detailProduct.categories[0]}</a>
        `;
  }
  const headerHTML = `
   <div class="title-text">
      <h1 class="under-title-text">${detailProduct.productName}</h1>
      <div class="topaz-line-break">
                <div class="two-slide-title"></div>
                <div class="circle-title"><i class="fa fa-stop" aria-hidden="true"></i>  </div>
                <div class="two-slide-title"></div>
      </div>
      <div class="title-text-nav">
        <span><a href="#">Home</a></span>
        <span>/</span>
        <span>${categoriesDetail}</span>
        <span>/</span>
        <span>${detailProduct.productName}</span>
      </div>
    </div>
  </div>
  `;
  headerElement.innerHTML = headerHTML;
}

renderHeader(detail);



let detailElement = document.querySelector("#detailProduct-showcase");

function renderDetail(detailProduct) {
  let displayedPrice = "";
  let numberOfReviews = parseInt(detailProduct.review);
  let categoriesDetail = "";
  let reviewerCount = parseInt(detailProduct.customerReviewCount);
  if (detailProduct.categories[0] && detailProduct.categories[1]) {
    categoriesDetail = `
        <a>${detailProduct.categories[0]},</a>
        <a>${detailProduct.categories[1]}</a>
        `;
  } else {
    categoriesDetail = `
        <a>${detailProduct.categories[0]}</a>
        `;
  }
  if (detailProduct.discount === "1") {
    displayedPrice = `
        <del>$${detailProduct.price}</del>
        <span>$${detailProduct.discountPrice}</span>
        `;
  } else {
    displayedPrice = `$${detailProduct.price}`;
  }
  const carouselInner = detailProduct.img
    .map((image, index) => {
      const activeClass = index === 0 ? "active" : "";
      return `
            <div class="carousel-item ${activeClass}">
                <img class="d-block w-100" src="${image}" alt="Slide ${
        index + 1
      }">
            </div>
        `;
    })
    .join("");
  const starRatingDetailHTML = getStarRatingDetail(numberOfReviews);
  const detailProductHTML = `
    <div class="detailProduct-left">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="false">
                <div class="carousel-inner">
                    ${carouselInner}
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

    <div class ="detailProduct-right">
        <div class="detailProduct-header">
            <p>${detailProduct.productName}</p>
            <div class="star-rating" data-rating=${numberOfReviews}>
            ${starRatingDetailHTML} 
            </div> 
            <span>(${reviewerCount} Customers reviews)</span>

        </div>
        <p class="detailProduct-price">
        ${displayedPrice}
        </p>
        <div class="detailProduct-desc">
        <p>
            ${detailProduct.description}
        </p>    
        </div>
        <form class="cart">
        <div class="quantity-button">
        <input type="button" value="-" class="minus">
        <input type="number" class="input-number" name="quantity" value="1" min="1">
        <input type="button" value="+" class="plus">
        </div>
        <button onclick="addtoCart()" type="submit" class="add_to_cart_btn">Add to cart</button> 
        </form>
        <div class="detailProduct-link">
            Categories: ${categoriesDetail}
        </div>
    </div>
    `;
  detailElement.innerHTML = detailProductHTML;
}

renderDetail(detail);

function getStarRatingDetail(numberOfReviews) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
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


let footerElement = document.getElementsByClassName("detailProduct-footer");

function renderFooter(detailProduct) {
    let numberOfReviews = parseInt(detailProduct.review);
  const starRatingDetailHTML = getStarRatingDetail(numberOfReviews);
  let reviewerCount = parseInt(detailProduct.customerReviewCount);
  let reviewsContent = "";
  if (reviewerCount === 1) {
    reviewsContent = `
            <div id="comments" class="reviews-list">
            <h4 class="review-header"> ${reviewerCount} review for ${detailProduct.productName}
             </h4>
             <ol class="reviews-comment">
             <li class="reviews-buyer">
                <div class="reviews-comment-content">
                    <div class="comment-img">
                        <span class="avatar">
                            <img src="https://secure.gravatar.com/avatar/02f2410558a80a63e20fad16e976d447?s=120&d=mm&r=g"
                            class="avatar-avatar"
                            >
                        </span>
                    </div>
                    <div class="comment-entry">
                        <header class="comment-header">
                        <ul class="user-comment-title">
                        <li>
                        <h6><cite class="comment-author">PixelDima</cite></h6>
                        </li>
                        <li>
                        <a href="./detailProduct.html">
                        <time class="comment-time" datetime="2023-12-12T17:36:36+00:00">December 7, 2023 at 5:37 pm</time>
                        </a>
                        </li>
                        <li>
                        <span>/</span>
                        </li>
                        <div class="float-end">
                        <div class="star-rating" title="Rated ${numberOfReviews} out of 5">
                            ${starRatingDetailHTML}
                        </div>
                        </div>
                        </ul>
                        </header>
                        <section class="comment-section">
                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </section>
                    </div>
                </div>
             </li>
             </ol>
            </div>
            <div id="review_form_wrapper"> 
                <div id="review_form">
                     <div id="respond" class="comment-respond">
                     <h3 id="reply-title">
                     <span>Add a Review</span>
                     </h3>
                    </div>
                    <form method="post" id="commentform" class="comment-form">
                    <p class="comment-notes">
                    <span id="email-notes">Your email address will not be published.</span>
                    <span class="required-field-message">
                    Required fields are marked <span class="required">*</span>
                    </span>
                    </p>
                    <p class="comment-form-rating">
                    <label for="rating">
                        Rating 
                        <span class="required">*</span> 
                    </label>
                    <p class="stars">
                    <span>
                        <a href="#!" class="star-1"><i class="fa fa-star" aria-hidden="true"></i>
                        </a>
                        <a href="#!" class="star-2">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </a>
                        <a href="#!" class="star-3">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </a>
                        <a href="#!" class="star-4">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </a>
                        <a href="#!" class="star-5">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        </a> 
                    </span>
                    </p>
                    </p>
                    <p class="comment-form-comment">
                    <textarea id="comment" name="comment" cols="45" rows="8" placeholder="Your Review *" aria-required="true"></textarea>
                    </p>
                    <p class="comment-form-author">
                    <input id="author" name="author" type="text" value size="30" placeholder="Your Name *" area-required="true">
                    </p>
                    <p class="comment-form-email">
                    <input id="email" name="email" type="text" value size="30" placeholder="Your Email*" area-required="true"
                    </p>
                    <p class="comment-form-box">
                        <input id="comment-box" name="comment-box" type="checkbox" value="yes" data-gtm-form-interact-field-id="0">
                        <label for="comment-box">Save my name, email, and website in this browser for the next time I comment.</label>
                    </p>
                    <p class="form-submit">
                    <input name="submit" type="submit" id="submit" class="submit" value="Submit Review"
                    </p>
                    </form>
                </div>
            </div>

        `;
  } else {
    reviewsContent = `
    <div id="comments" class="reviews-list">
    <h4 class="review-header"> ${reviewerCount} review for ${detailProduct.productName}
     </h4>
     <ol class="reviews-comment">
     <li class="reviews-buyer">
        <div class="reviews-comment-content">
            <div class="comment-img">
                <span class="avatar">
                    <img src="https://secure.gravatar.com/avatar/02f2410558a80a63e20fad16e976d447?s=120&d=mm&r=g"
                    class="avatar-avatar"
                    >
                </span>
            </div>
            <div class="comment-entry">
                <header class="comment-header">
                <ul class="user-comment-title">
                <li>
                <h6><cite class="comment-author">PixelDima</cite></h6>
                </li>
                <li>
                <a href="./detailProduct.html">
                <time class="comment-time" datetime="2023-12-12T17:36:36+00:00">December 7, 2023 at 5:37 pm</time>
                </a>
                </li>
                <li>
                <span>/</span>
                </li>
                <div class="float-end">
                <div class="star-rating" title="Rated ${numberOfReviews} out of 5">
                    ${starRatingDetailHTML}
                </div>
                </div>
                </ul>
                </header>
                <section class="comment-section">
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </section>
            </div>
        </div>
     </li>
     </ol>
    </div>
    <div id="review_form_wrapper"> 
        <div id="review_form">
             <div id="respond" class="comment-respond">
             <h3 id="reply-title">
             <span>Add a Review</span>
             </h3>
            </div>
            <form method="post" id="commentform" class="comment-form">
            <p class="comment-notes">
            <span id="email-notes">Your email address will not be published.</span>
            <span class="required-field-message">
            Required fields are marked <span class="required">*</span>
            </span>
            </p>
            <p class="comment-form-rating">
            <label for="rating">
                Rating 
                <span class="required">*</span> 
            </label>
            <p class="stars">
            <span>
                <a href="#" class="star-1"><i class="fa fa-star" aria-hidden="true"></i>
                </a>
                <a href="#" class="star-2">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                </a>
                <a href="#" class="star-3">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                </a>
                <a href="#" class="star-4">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                </a>
                <a href="#" class="star-5">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                </a> 
            </span>
            </p>
            </p>
            <p class="comment-form-comment">
            <textarea id="comment" name="comment" cols="45" rows="8" placeholder="Your Review *" aria-required="true"></textarea>
            </p>
            <p class="comment-form-author">
            <input id="author" name="author" type="text" value size="30" placeholder="Your Name *" area-required="true">
            </p>
            <p class="comment-form-email">
            <input id="email" name="email" type="text" value size="30" placeholder="Your Email*" area-required="true"
            </p>
            <p class="comment-form-box">
                <input id="comment-box" name="comment-box" type="checkbox" value="yes" data-gtm-form-interact-field-id="0">
                <label for="comment-box">Save my name, email, and website in this browser for the next time I comment.</label>
            </p>
            <p class="form-submit">
            <input name="submit" type="submit" id="submit" class="submit" value="Submit Review"
            </p>
            </form>
        </div>
    </div>

        `;
  }
  const footerHTML = `
        <ul class="footer-nav">
        <li class="description_tab"><a href="#tab-description">Description</a>
        </li>
        <li class="additional_tab"><a href="#tab-additional">Additional Information</a>
        </li>
        <li class="review_tab"><a href="#review-additional">Reviews (${reviewerCount})</a>
        </li>
        </ul>
        <div class="tab-content">
        <div class="desc-tab-content" id="tab-description">
        <h2> Description </h2>
        <p>${detailProduct.description}</p>
        <p>${detailProduct.description}</p>
        </div>
        <div class="additional-tab-content" id="tab-additional">
        <h2> Additional information </h2>
        <table>
            <tbody>
            <tr>
            <th>Color: </th>
            <td>
            <p>${detailProduct.color}</p>
            </td>
            </tr>
            <tr>
            <th>Size:</th>
            <td>
            <p>${detailProduct.size}</p>
            </td>
            </tr>
            </tbody>
        </table>
        </div>
        <div class="review-tab-content" id="review-additional">
        <div id="reviews">
               ${reviewsContent}
        </div>
        </div>
        </div>
    `;
    if(footerElement.length > 0) {
        footerElement[0].innerHTML = footerHTML;
    }

}


renderFooter(detail);