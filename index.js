const hambElem = document.querySelector(".hamburger-menu");
const hambBtn = document.querySelector(".hamburger");
const shoppingCategory = document.querySelector(".shopping-category");
const shoppingCategoryLinks = document.querySelectorAll(
  ".shopping-category-links"
);

let showMenu = false;

hambElem.addEventListener("click", showHamb);

function showHamb() {
  if (!showMenu) {
    hambBtn.classList.add("open");
    shoppingCategory.classList.add("open");
    shoppingCategoryLinks.forEach((item) => {
      item.classList.add("open");
    });

    showMenu = true;
  } else {
    hambBtn.classList.remove("open");
    shoppingCategory.classList.remove("open");
    shoppingCategoryLinks.forEach((item) => item.classList.remove("open"));

    showMenu = false;
  }
}

document
  .querySelector("#search-icon")
  .addEventListener("click", showSearchInput);
function showSearchInput() {
  console.log("clicked");
  document.querySelector("#search-bar").style.display = "block";
}

const loader = document.querySelector("#loading");

function hideLoader() {
  loader.style.display = "none";
}

// this is to generate random item for the hero section
let randomNumber = Math.floor(Math.random() * 20);

fetch(`https://fakestoreapi.com/products/${randomNumber}`)
  .then((res) => res.json())
  .then((oneFetchedData) => {
    hideLoader();

    let description = oneFetchedData.description.slice(0, 200);

    if (description.length > 189) {
      description += "...";
    } else {
      description;
    }

    let mainPrice = Math.floor(oneFetchedData.price + 1000);
    let data = `
    <span>
        <h1 id="hero-left_display-title">${oneFetchedData.title}</h1>
        <p id="hero-sec-left-description">${description}</p>
        <div>
          <p>Price: $<b id="main-price">${mainPrice}</b> </p>
          <p>Best Offer: $<b id="best-offer">${mainPrice - 90}</b></p>
        </div>
    </span>
    <a href="" id="order-btn">Compare</a>
     <button><img src="./Alpine images/arrow-down.png" alt="">View Product</button>
    `;

    document.querySelector(".hero-sec-left").innerHTML = data;

    let heroRightImage = document.createElement("img");
    heroRightImage.src = oneFetchedData.image;

    document.querySelector(".hero-sec-right").appendChild(heroRightImage);
  })
  .catch((error) => console.log(error));

//..................
// shopping API
const shopping_api = "https://fakestoreapi.com/products/";
//..................

fetch(shopping_api)
  .then((res) => res.json())
  .then((fetchedData) => {
    let topSellingItemsData = "";

    fetchedData.map((singleData) => {
      let titleName = singleData.title;

      if (titleName.length > 25) {
        let slicedName = titleName.slice(0, 15);
        slicedName += "...";

        topSellingItemsData = `
            <a href="#" class="top-selling-items-flex-items">
              <img src="${
                singleData.image
              }" alt="" class="top-selling-items-img">
              <p class="top-selling-items-title-name">${slicedName}</p>
              <p class="top-selling-items-price">${singleData.price - 2}</p>
              <p class="top-selling-items-discount-price">${
                singleData.price
              }</p>
            </a>
        `;
      } else {
        topSellingItemsData = `
            <div class="top-selling-items-flex-items">
              <img src="${
                singleData.image
              }" alt="" class="top-selling-items-img">
              <p class="top-selling-items-title-name">${titleName}</p>
              <p class="top-selling-items-price">${singleData.price - 2}</p>
              <p class="top-selling-items-discount-price">${
                singleData.price
              }</p>
            </div>
            `;
      }

      // console.log(topSellingItemsData)
      document.querySelector(".top-selling-items-flex-container").innerHTML =
        topSellingItemsData;
    });
  })
  .catch((error) => console.log(error));

// .................

fetch(shopping_api)
  .then((response) => {
    return response.json();
  })

  .then((fetchedData) => {
    let data = "";

    for (let i = 0; i < 6; i++) {
      let singleData = fetchedData[i];
      let titleName = singleData.title;

      if (titleName.length > 20) {
        let slicedName = titleName.slice(0, 19);
        slicedName += "...";
        data += `
        <div class="shopping-group1-items">
          <button><i class='fa-solid fa-heart fa-2x'></i></button>
          <img src=${singleData.image} alt="" class="shopping-img">
          <h2>${slicedName}</h2>
          <p class="price">$ ${singleData.price}</p>
          <a href="#">Order</a>
        </div>
  
        `;
      } else {
        data += `
        <div class="shopping-group1-items">
          <button><i class='fa-solid fa-heart fa-2x'></i></button>
          <img src=${singleData.image} alt="" class="shopping-img">
          <h2>${titleName}</h2>
          <p class="price">$ ${singleData.price}</p>
          <a href="#">Order</a>
        </div>
  
        `;
      }
    }

    document.querySelector(".shopping-group1").innerHTML = data;
  })
  .catch((error) => console.log(error));

// const randomUser = `https://randomuser.me/api/`;
// fetch(randomUser)
//   .then((resolve) => resolve.json())
//   .then((randomPerson) => console.log(randomPerson));

// ..........................

//This is for the search

let searchModal = document.querySelector("#search-overlay");

document
  .querySelector("#search-icon")
  .addEventListener("click", showSearchModal);
function showSearchModal() {
  searchModal.style.display = "block";
  displaySearchLoader()
}
document
  .querySelector("#search-close")
  .addEventListener("click", closeSearchModal);
function closeSearchModal() {
  searchModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == searchModal) {
    searchModal.style.display = "none";
  }
};

function displaySearchLoader() {
  document.querySelector(".search-item-loader").style.display = "none";
}

let searchedItems = document.querySelector("#searched-items")

function searchItem() {
  displaySearchLoader()
  fetch(shopping_api)
    .then((res) => res.json())
    .then((fetchedData) => {

      // declare variables
      let input, filter, txtValue;

      // Targeting the search input and its value
      input = document.getElementById("search-bar");
      filter = input.value;

      // Checking if its empty
      if (filter === "") {
        searchedItems.innerHTML = ``;

      } else { // If its not empty do the following
        //...............
        let searchedFeedback = "";

        for (let i = 0; i < fetchedData.length; i++) { // looping through the fetched item
          txtValue = fetchedData[i].title;

          if (txtValue.indexOf(filter) > -1) { // Comparing the search input value and the Array of Items
            searchedFeedback += `
          <a href="#" class="searched-items-flex-items">
            <img src="${fetchedData[i].image}" alt="" class="searched-items-img">
            <p class="searched-items-title-name">${fetchedData[i].title}</p>
            <p class="searched-items-price">${fetchedData[i].price}</p>
            <p class="searched-items-discount-price"></p>
          </a>
          `;
            searchedItems.innerHTML = searchedFeedback;
          }
        }
      }
    })
    .catch((err) => console.log(err));
}

// Adding an OnFormChange event listener to the search bar
document.getElementById("search-bar").addEventListener("input", onChangeSearch);
function onChangeSearch() {
  document.querySelector(
    "#searched-items"
  ).innerHTML = `<div class="search-item-loader"></div>`;
}
