let loggedoutlinks = document.querySelectorAll('.loggedout');
let loggedinlinks = document.querySelectorAll('.loggedin');

// content div

let content = document.querySelector('#content');

// functions

// grab the sign in button
var signinbutton = document.querySelector("#signinbutton");
// attach a click event
signinbutton.addEventListener('click', function () {
  //grab the modal
  var mymodal = document.querySelector("#mymodal");
  // show modal
  mymodal.classList.add('is-active');
})

// modal-background
var modalback = document.querySelector("#modalback");
modalback.addEventListener('click', function () {
  mymodal.classList.remove('is-active');
})

// grab the sign up button
var signinbuttonv = document.querySelector("#signinbuttonv");
// attach a click event
signinbuttonv.addEventListener('click', function () {
  //grab the modal
  var mymodal2 = document.querySelector("#mymodal2");
  // show modal
  mymodal2.classList.add('is-active');
})

// modal-background
var modalback2 = document.querySelector("#modalback2");
modalback2.addEventListener('click', function () {
  mymodal2.classList.remove('is-active');
})

function configureContent(auser) {

  // check if user is signed in or not
  // user is signed in
  if (auser) {
    // retrieve data from firebase

    db.collection('recipes').get().then((data) => {

      //recipes array
      let recipes = data.docs;
      // empty the content div
      content.innerHTML = "";
      // loop through the array
      recipes.forEach((recipe) => {
        // console.log(recipe.data().title, " ---", recipe.data().desc);
        content.innerHTML += `
      <div class="box">
        <h1 class="title is-size-3 has-background-success-light p-2">${recipe.data().title}</h1>
        <p class="m-2"><img width="200" src="${recipe.data().url}" /></p>
        <p>${recipe.data().desc}</p>
        <p>${recipe.data().ingredients}</p>
      </div>    
    `;
      })

    })
  }
  // user is not not signed in
  else {
    content.innerHTML = `<p>You must be signed in to see the content</p>`;
  }

}

function configureNav(user) {
  //check if user is passed to the function (user is signed in)
  if (user) {
    // console.log(loggedoutlinks);

    // show all the loggedin links
    loggedinlinks.forEach((link) => {
      link.classList.remove('is-hidden');
    })

    // hide all the loggedout links
    loggedoutlinks.forEach((link) => {
      link.classList.add('is-hidden');
    })
  }
  // no user is passed to the function (user is signed out)
  else {
    // show all the loggedout links
    loggedoutlinks.forEach((link) => {
      link.classList.remove('is-hidden');
    })
    // hide all the loggedin links
    loggedinlinks.forEach((link) => {
      link.classList.add('is-hidden');
    })
  }
}



//signing up users
let signupmodal = document.querySelector('#signupmodal');


//attach a submit event
signupmodal.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('form submitted');

  // grab the email and password
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;

  auth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log("user created successfully");

      //close the modal
      mymodal2.classList.remove('is-active');

      // reset the form
      signup_form.reset();

    })
    .catch((error) => {
      console.log(error.message)
      let signup_error = document.querySelector('#signup_error');
      signup_error.innerHTML = `<p> ${error.message}</p>`;
    })
})


// signing users in

let signin_form = document.querySelector('#signin_form');

// test
// console.log(signin_form);

// attach a submit event on the form
signin_form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log('sign in form submitted!');

  // grab the email and password from the form

  let email = document.querySelector('#email_').value;
  let password = document.querySelector('#password_').value;

  // test
  // console.log(email, password);

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {

      // close the modal
      mymodal.classList.remove('is-active');

      // reset 
      signin_form.reset();

    })
    .catch((error) => {
      console.log(error.message);

      // grab the error div

      let signin_error = document.querySelector('#signin_error');
      signin_error.innerHTML = `<p>${error.message}</p>`
    })
})

// sign out

let signoutbtn = document.querySelector('#signoutbtn');

// attach a click event

signoutbtn.addEventListener('click', () => {
  auth.signOut()
    .then((msg) => {
      console.log("user signed out!");
    })
})

// keep track of user authentication status (signed in or signed out)

auth.onAuthStateChanged((user) => {
  // check if user is signed in or signed out
  if (user) {
    console.log('user is now signed in!')
    configureNav(user);
    configureContent(user);
  } else {
    console.log('user is now signed out!');
    configureNav();
    configureContent();
  }
})




//TESTING STUFF recipe modal
//   let postRecipeBtn = document.querySelector("#postRecipeBtn");
//   postRecipeBtn.addEventListener('click', (e) => {
//     var recipemodal = document.querySelector("#recipemodal");
//     // show modal
//     recipemodal.classList.add('is-active');
//     e.preventDefault();

// })

// post recipe nav bar link

let postRecipeBtn = document.querySelector("#postRecipeBtn");
let main = document.querySelector('#main');
let html = '<h1 class="title is-size-3 has-text-centered has-text-white is-family-sans-serif">Post a Recipe Below</h1>';
html += `
<div class = "field" >
    <label class = "label is-family-sans-serif has-text-white" > Title </label> 
    <div class = "control" >
    <input class = "input" type = "text" id="recipe_title" placeholder = "Title of Recipe" >
    </div> 
</div>

<div class="field">
  <label class="label is-family-sans-serif has-text-white">Description</label>
  <div class="control">
    <textarea class="textarea" placeholder="Description" id="recipe_description"></textarea>
  </div>
</div>

<div class="field">
  <label class="label has-text-white is-family-sans-serif">Ingredients</label>
  <div class="control">
    <textarea class="textarea" placeholder="Description" id="recipe_ingredients"></textarea>
  </div>
</div>

<div class="field">
  <label class="label has-text-white is-family-sans-serif">Image</label>
  <div class="control">
   <input class = "input" type = "file" id="recipe_image" placeholder = "Choose Image" >
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
</div>

`;
let submitrecipeform = document.querySelector('#submitrecipeform');
postRecipeBtn.addEventListener('click', () => {

  document.querySelector('#content').innerHTML = "";

  submitrecipeform.innerHTML = html;

})



// store recipe details in firebase

submitrecipeform.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log('user submittted a recipe');


  // grab the recipe title

  let recipe_title = document.querySelector('#recipe_title').value;
  let recipe_description = document.querySelector('#recipe_description').value;
  let recipe_ingredients = document.querySelector('#recipe_ingredients').value;

  // upload image to firebase
  // jack's comment here
  // let file = document.querySelector('#recipe_image').files[0];

  // let image = new Date() + "_" + file.name;

  // const task = ref.child(image).put(file);

  // task
  //   .then(snapshot => snapshot.ref.getDownloadURL())
  //   .then((url) => {
  // console.log(url);

  // combine title and description into one object
  let recipe_details = {
    title: recipe_title,
    desc: recipe_description,
    ingredients: recipe_ingredients,
    // url: url
  }

  // add recipe_details into firebase

  db.collection('recipes').add(recipe_details).then((data) => {
    console.log('recipe added!');
    // console.log(data.id);

    // 2. display a success message for the user
    alert('You successfully submitted a recipe');
  })
  //reset the form
  submitrecipeform.reset();
})



// search

let search_button = document.querySelector('#search_button');

// attach a click event

search_button.addEventListener('click', () => {
  // 1. grab the content of the input with id search_box

  let search_box = document.querySelector('#search_box').value;
  // test out it
  // console.log(search_box);

  // grab the customized data from firebase

  db.collection('recipes').where('title', '==', search_box).get().then((data) => {

    //recipes array
    let recipes = data.docs;
    // empty the content div
    main.innerHTML = "";
    content.innerHTML = "";
    // loop through the array
    recipes.forEach((recipe) => {
      // console.log(recipe.data().title, " ---", recipe.data().desc);
      main.innerHTML += `
        <div class="box">
          <h1 class="title is-size-3 has-background-info-light p-2 has-text-centered">${recipe.data().title}</h1>
          <p class = "has-text-centered"> Description </p>
          <p> ${recipe.data().desc}</p>
          <p class = "has-text-centered"> Ingredients </p>
          <p> ${recipe.data().ingredients}</p>
        </div>    
      `;
    })

  })


})