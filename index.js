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

const loader = document.querySelector("#loading");


// this is to generate random item for the hero section
let randomNumber = Math.floor(Math.random() * 20);

function heroSecAnime() {}

//..................
// shopping API
// const shopping_api = "https://chicmi.p.rapidapi.com";

//..................

// .................
let itemsId = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

fetch(shopping_api)
  .then((response) => {
    return response.json();
  })

  .then((fetchedData) => {
    let data = "";
    console.log(fetchedData)
    // document.querySelector(".shopping-group1").innerHTML = data;
  })
  .catch((error) => console.log(error));

// const randomUser = `https://randomuser.me/api/`;
// fetch(randomUser)
//   .then((resolve) => resolve.json())
//   .then((randomPerson) => console.log(randomPerson));

// ..........................

//This is for the search
let search = {
  searchIcon: document.querySelector("#search-icon"),
  searchModal: document.querySelector("#search-overlay"),
  searchLoader: document.querySelector(".search-item-loader"),
  searchedItems: document.querySelector("#searched-items"),
  searchClose: document.querySelector("#search-close"),
  searchBarInput: document.getElementById("search-bar"),
};

search.searchIcon.addEventListener("click", showSearchInput);
function showSearchInput() {
  search.searchBarInput.style.display = "block";
}

search.searchIcon.addEventListener("click", showSearchModal);
function showSearchModal() {
  search.searchModal.style.display = "block";
  hideSearchLoader();
}

search.searchClose.addEventListener("click", closeSearchModal);
function closeSearchModal() {
  search.searchModal.style.display = "none";
}

// To close modal when you click outside the modal
window.onclick = function (event) {
  if (event.target == search.searchModal) {
    search.searchModal.style.display = "none";
  }
};
function hideSearchLoader() {
  search.searchLoader.style.display = "none";
}

search.searchBarInput.addEventListener("input", searchItem);
function searchItem() {
  // To display the search loader when you input something
  search.searchLoader.style.display = "block";

  fetch(shopping_api)
    .then((res) => res.json())
    .then((fetchedData) => {
      // declare variables
      let filter, txtValue;

      filter = search.searchBarInput.value;

      // Targeting the search input and its value

      // Checking if its empty
      if (filter === "") {
        search.searchedItems.innerText = ``;
      } else {
        // If its not empty do the following
        let searchedFeedback = "";

        fetchedData.map((singleData) => {
          // looping through the fetched item
          txtValue = singleData.title;
          let slicedName = txtValue.slice(0, 10);

          if (txtValue.indexOf(filter) > -1) {
            // Comparing the search input value and the Array of Items
            searchedFeedback += `
          <a href="#" class="searched-items-flex-items">
            <img src="${singleData.image}" alt="" class="searched-items-img">
            <p class="searched-items-title-name">${slicedName}</p>
            <p class="searched-items-price">${singleData.price}</p>
            <p class="searched-items-discount-price">${
              singleData.price - 10
            }</p>
          </a>
          `;
            search.searchedItems.innerHTML = searchedFeedback;
          }
        });
        hideSearchLoader();
      }
    })
    .catch((err) => console.log(err));
}

// Adding an OnFormChange event listener to the search bar
search.searchBarInput.addEventListener("input", onChangeSearch);
function onChangeSearch() {
  if (search.searchBarInput.value === "") {
    hideSearchLoader();
  }
}

//.....................................................
// Liked Items
let cart = [];

let likedBtn = document.querySelectorAll(".addtocart-btn");
let clicked = false;
function addToCart() {
  changesCount();
  document.querySelector('.add-success-popup').style.display = 'flex';
  setInterval(() => {
    closeSuccessAddedPopup()
  }, 5000);
}

function closeSuccessAddedPopup(){
  document.querySelector('.add-success-popup').style.display = 'none';
}

let count = 1;
function changesCount() {
  if (clicked == true) {
    count++;
  } else {
    clicked = true;
  }
  console.log(count);
  cart.push(count);
  console.log(cart);
}

let now = new Date()
