// for top rated products in footer
let topratedProducts_img;
topratedProducts_img = document.querySelector(".topratedProducts");
// console.log(topratedProducts_img);
let toprated = JSON.parse(localStorage.getItem("products"));
let topratedProducts_img_content = "";

// find top rated products
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
