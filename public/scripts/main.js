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

// Validate Email
function validateEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Validate login form 
const validateLoginForm = () => {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  const emailError = document.querySelector('#email_error');
  const passwordError = document.querySelector('#password_error');

  emailError.innerHTML = '';
  passwordError.innerHTML = '';

  let isValid = true;

  if(email.value === ''){
    emailError.innerHTML = 'Email is required!';
    isValid = false;
  }else if(!validateEmail(email.value)){
    emailError.innerHTML = 'Invalid email!';
    isValid = false;
  }

  if(password.value === ''){
    passwordError.innerHTML = 'Password is required!';
    isValid = false;
  }

  return isValid;
};

// Validate login form 
const validateSignupForm = () => {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  const nameError = document.querySelector('#name_error');
  const emailError = document.querySelector('#email_error');
  const passwordError = document.querySelector('#password_error');

  nameError.innerHTML = '';
  emailError.innerHTML = '';
  passwordError.innerHTML = '';

  let isValid = true;

  if(name.value === ''){
    nameError.innerHTML = 'Name is required!';
    isValid = false;
  }

  if(email.value === ''){
    emailError.innerHTML = 'Email is required!';
    isValid = false;
  }else if(!validateEmail(email.value)){
    emailError.innerHTML = 'Invalid email!';
    isValid = false;
  }

  if(password.value === ''){
    passwordError.innerHTML = 'Password is required!';
    isValid = false;
  }else if(password.value.length < 8){
    passwordError.innerHTML = 'Min. password length is 8';
    isValid = false;
  }

  return isValid;
};

// Validate Add New Blog Form 
const validateAddNewBlogForm = () => {
  const title = document.querySelector('#title');
  const content = document.querySelector('#content');
  const category = document.querySelector('#category');
  const thumbnail = document.querySelector('#thumbnail');
  const quillContent = quill.getSemanticHTML();

  const titleError = document.querySelector('#title_error');
  const contentError = document.querySelector('#content_error');
  const categoryError = document.querySelector('#category_error');
  const thumbnailError = document.querySelector('#thumbnail_error');

  titleError.innerHTML = '';
  contentError.innerHTML = '';
  categoryError.innerHTML = '';
  thumbnailError.innerHTML = '';

  let isValid = true;

  if(title.value === ''){
    titleError.innerHTML = 'Title is required!';
    isValid = false;
  }else if(title.value.length > 100){
    titleError.innerHTML = 'Max. length 100 characters!';
    isValid = false;
  }

  if(quillContent === '<p></p>'){
    contentError.innerHTML = 'Content is required!';
    isValid = false;
  }else{
    content.value = quillContent;
    console.log(content.value);
  }

  // if(content.value === ''){
  //   contentError.innerHTML = 'Content is required!';
  //   isValid = false;
  // }else if(content.value.length > 500){
  //   contentError.innerHTML = 'Max. length 500 characters!';
  //   isValid = false;
  // }

  if(category.value === ''){
    categoryError.innerHTML = 'Category is required!';
    isValid = false;
  }

  if(thumbnail.value === ''){
    thumbnailError.innerHTML = 'Thumbnail is required!';
    isValid = false;
  }

  return isValid;
};
const validateEditBlogForm = () => {
  // const title = document.querySelector('#title');
  const content = document.querySelector('#content');
  // const category = document.querySelector('#category');
  // const thumbnail = document.querySelector('#thumbnail');
  const quillContent = quill.getSemanticHTML();

  // const titleError = document.querySelector('#title_error');
  // const contentError = document.querySelector('#content_error');
  // const categoryError = document.querySelector('#category_error');
  // const thumbnailError = document.querySelector('#thumbnail_error');

  // titleError.innerHTML = '';
  // contentError.innerHTML = '';
  // categoryError.innerHTML = '';
  // thumbnailError.innerHTML = '';

  // let isValid = true;

  // if(title.value === ''){
  //   titleError.innerHTML = 'Title is required!';
  //   isValid = false;
  // }else if(title.value.length > 100){
  //   titleError.innerHTML = 'Max. length 100 characters!';
  //   isValid = false;
  // }

  if(quillContent === '<p></p>'){
    contentError.innerHTML = 'Content is required!';
    isValid = false;
  }else{
    content.value = quillContent;
    console.log(content.value);
  }

  // if(content.value === ''){
  //   contentError.innerHTML = 'Content is required!';
  //   isValid = false;
  // }else if(content.value.length > 500){
  //   contentError.innerHTML = 'Max. length 500 characters!';
  //   isValid = false;
  // }

  // if(category.value === ''){
  //   categoryError.innerHTML = 'Category is required!';
  //   isValid = false;
  // }

  // if(thumbnail.value === ''){
  //   thumbnailError.innerHTML = 'Thumbnail is required!';
  //   isValid = false;
  // }

  return isValid;
};

// Custom text editor 

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'] 
];

const quill = new Quill('#editor', {
  modules:{
    toolbar: toolbarOptions,
  },
  theme: 'snow',
  placeholder: 'Start writing from here...',
});
