// Handle mobile nav show/hide on mobile 
const mobile__nav__trigger = document.querySelector("#mobile__nav__trigger");

mobile__nav__trigger.addEventListener("click", () => {
  const mobile__nav = document.querySelector(".mobile__nav");
  mobile__nav.style.left = "0";
});

const close__mobile__nav = document.querySelector(".close__nav");

close__mobile__nav.addEventListener("click", () => {
  const mobile__nav = document.querySelector(".mobile__nav");
  mobile__nav.style.left = "100%";
});


// Preview thumbnail image on creating new blog 
var loadFile = function (event) {
  document.querySelector(".add__blog__container .preview").style.display =
    "block";
  var output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

// Preview thumbnail image on edit blog 
var loadFile2 = function (event) {
  var output2 = document.getElementById("output2");
  output2.src = URL.createObjectURL(event.target.files[0]);
  output2.onload = function () {
    URL.revokeObjectURL(output2.src); // free memory
  };
};


// Fetch blog categories for desktop nav 
async function fetchCategories() {
  try {
    const response = await fetch("/categories");
    const categories = await response.json();
    const categoryList = document.getElementById("category-list");

    categories.forEach((category) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/blogs?category=${category}`;
      link.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      listItem.appendChild(link);
      categoryList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

fetchCategories();

// Fetch blog categories for mobile nav 
async function fetchMobCategories() {
  try {
    const response = await fetch("/categories");
    const categories = await response.json();
    const categoryList = document.getElementById("category-list-2");

    categories.forEach((category) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/blogs?category=${category}`;
      link.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      listItem.appendChild(link);
      categoryList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

fetchMobCategories();

// Handle categories show/hide on mobile 
const mobCatTrigger = document.querySelector('#mob_cat_trigger')
mobCatTrigger.addEventListener('click', () => {
  const catBox = document.querySelector(".categories__box");
  catBox.style.left = "0";
})

const closeMobCat = document.querySelector(".close__cat");

closeMobCat.addEventListener("click", () => {
  const catBox = document.querySelector(".categories__box");
  catBox.style.left = "100%";
});
