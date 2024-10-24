// Handle mobile nav show/hide on mobile
const mobileNavTrigger = document.querySelector("#mobile__nav__trigger");
mobileNavTrigger.addEventListener("click", () => {
  const mobileNav = document.querySelector(".mobile__nav");
  mobileNav.style.left = "0";
});

const closeMobileNav = document.querySelector(".close__nav");
closeMobileNav.addEventListener("click", () => {
  const mobile__nav = document.querySelector(".mobile__nav");
  mobile__nav.style.left = "100%";
});

//share a blog button
const shareBtn = document.querySelector(".share__btn");
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    console.log("lauda lassan starts");
    const postTitle = document.title;
    const postUrl = window.location.href;

    // Check if Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: postTitle,
          url: postUrl,
        })
        .then(() => {
          console.log("Post shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      // Fallback for browsers that do not support Web Share API
      let whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        postTitle
      )} - ${encodeURIComponent(postUrl)}`;
      window.open(whatsappUrl, "_blank");
    }
    console.log("lauda lassan end");
  });
}

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
const mobCatTrigger = document.querySelector("#mob_cat_trigger");
mobCatTrigger.addEventListener("click", () => {
  const catBox = document.querySelector(".categories__box");
  catBox.style.left = "0";
});

const closeMobCat = document.querySelector(".close__cat");

closeMobCat.addEventListener("click", () => {
  const catBox = document.querySelector(".categories__box");
  catBox.style.left = "100%";
});

// Validate Email
function validateEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Validate login form
const validateLoginForm = () => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const emailError = document.querySelector("#email_error");
  const passwordError = document.querySelector("#password_error");

  emailError.innerHTML = "";
  passwordError.innerHTML = "";

  let isValid = true;

  if (email.value === "") {
    emailError.innerHTML = "Email is required!";
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailError.innerHTML = "Invalid email!";
    isValid = false;
  }

  if (password.value === "") {
    passwordError.innerHTML = "Password is required!";
    isValid = false;
  }

  return isValid;
};

// Validate login form
const validateSignupForm = () => {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const nameError = document.querySelector("#name_error");
  const emailError = document.querySelector("#email_error");
  const passwordError = document.querySelector("#password_error");

  nameError.innerHTML = "";
  emailError.innerHTML = "";
  passwordError.innerHTML = "";

  let isValid = true;

  if (name.value === "") {
    nameError.innerHTML = "Name is required!";
    isValid = false;
  }

  if (email.value === "") {
    emailError.innerHTML = "Email is required!";
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailError.innerHTML = "Invalid email!";
    isValid = false;
  }

  if (password.value === "") {
    passwordError.innerHTML = "Password is required!";
    isValid = false;
  } else if (password.value.length < 8) {
    passwordError.innerHTML = "Min. password length is 8";
    isValid = false;
  }

  return isValid;
};

// Validate Add New Blog Form
const validateAddNewBlogForm = () => {
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");
  const category = document.querySelector("#category");
  const thumbnail = document.querySelector("#thumbnail");
  const quillContent = quill.getSemanticHTML();

  const titleError = document.querySelector("#title_error");
  const contentError = document.querySelector("#content_error");
  const categoryError = document.querySelector("#category_error");
  const thumbnailError = document.querySelector("#thumbnail_error");

  titleError.innerHTML = "";
  contentError.innerHTML = "";
  categoryError.innerHTML = "";
  thumbnailError.innerHTML = "";

  let isValid = true;

  if (title.value === "") {
    titleError.innerHTML = "Title is required!";
    isValid = false;
  } else if (title.value.length > 100) {
    titleError.innerHTML = "Max. length 100 characters!";
    isValid = false;
  }

  if (quillContent === "<p></p>") {
    contentError.innerHTML = "Content is required!";
    isValid = false;
  } else {
    content.value = quillContent;
    console.log(content.value);
  }

  if (category.value === "") {
    categoryError.innerHTML = "Category is required!";
    isValid = false;
  }

  if (thumbnail.value === "") {
    thumbnailError.innerHTML = "Thumbnail is required!";
    isValid = false;
  }

  return isValid;
};

const validateEditBlogForm = () => {
  const content = document.querySelector("#content");
  const quillContent = quill.getSemanticHTML();

  if (quillContent === "<p></p>") {
    contentError.innerHTML = "Content is required!";
    isValid = false;
  } else {
    content.value = quillContent;
    console.log(content.value);
  }

  return isValid;
};

// Custom text editor

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const quillContainer = document.querySelector("#editor");
if (quillContainer) {
  const quill = new Quill("#editor", {
    modules: {
      toolbar: toolbarOptions,
    },
    theme: "snow",
    placeholder: "Start writing from here...",
  });
}
