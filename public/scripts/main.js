document.addEventListener("DOMContentLoaded", function () {
  const deleteForms = document.querySelectorAll("#deleteForm");
  deleteForms.forEach((form) => {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const confirmation = confirm(
        "Are you sure you want to delete this blog post?"
      );
      if (confirmation) {
        try {
          const response = await fetch(this.action, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to delete blog post");
          }
          window.location.href = "/dashboard";
        } catch (error) {
          console.error("Error deleting blog post:", error.message);
          alert("Failed to delete blog post");
        }
      }
    });
  });
});

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

var loadFile = function (event) {
  document.querySelector(".add__blog__container .preview").style.display =
    "block";
  var output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

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
