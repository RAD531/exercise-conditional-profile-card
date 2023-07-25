//import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastname: null,
        role: null,
        country: null,
        city: null
    }
 */

function checkValidText(text) {
  if (text === null || text.length <= 0) {
    return false;
  }

  return true;
}

function checkFirstName(firstName, errorElement) {
  //check first name
  if (checkValidText(firstName)) {
    document.getElementById(errorElement).innerHTML = null;
    return firstName;
  }

  else {
    document.getElementById(errorElement).innerHTML = "Please enter a valid first name"
    return "First Name Here";
  }
}

function checkLastName(lastname, errorElement) {
  //check last name
  if (checkValidText(lastname)) {
    document.getElementById(errorElement).innerHTML = null;
    return lastname;
  }

  else {
    document.getElementById(errorElement).innerHTML = "Please enter a valid last name"
    return "Last Name Here";
  }
}

function checkDropDown(dropDownValue){
  if (dropDownValue === null){
    return "Please select an option";
  }

  else{
    return dropDownValue;
  }
}

function checkURL(url, errorElement){
  if (url === null || url.length <= 0){
    document.getElementById(errorElement).innerHTML = null;
    return "#";
  }

  else{
    document.getElementById(errorElement).innerHTML = "Please enter a valid URL"
    return url;
  }
}

function checkCover(cover, background){
  if (cover == false){
    return "<div class='cover'></div>";
  }

  else{
    return `<div class="cover"><img src="${background}" /></div>`;
  }
}

function renderBody(variables = {}) {

  let htmlContent = [];

  htmlContent.push(`<div class="widget">`);
  htmlContent.push(`${checkCover(variables.includeCover, variables.background)}`);
  htmlContent.push(`<img src="${variables.avatarURL}" class="photo" />`);
  htmlContent.push(`<h1>${checkFirstName(variables.name, "error-label-name")} ${checkLastName(variables.lastname, "error-label-last-name")}</h2>`);
  htmlContent.push(`<h2>${checkDropDown(variables.role)}</h2>`);
  htmlContent.push(`<h3>${checkDropDown(variables.city)}, ${checkDropDown(variables.country)}</h3>`);
  htmlContent.push(`<ul class="${variables.socialMediaPosition}">`);
  htmlContent.push(`<li><a href="${checkURL(variables.twitter, "error-label-url-twitter")}" target="_blank"><i class="fab fa-twitter"></i></a></li>`);
  htmlContent.push(`<li><a href="${checkURL(variables.github, "error-label-url-github")}" target="_blank"><i class="fab fa-github"></i></a></li>`);
  htmlContent.push(`<li><a href="${checkURL(variables.linkedin, "error-label-url-linkedin")}" target="_blank"><i class="fab fa-linkedin"></i></a></li>`);
  htmlContent.push(`<li><a href="${checkURL(variables.instagram, "error-label-url-instagram")}" target="_blank"><i class="fab fa-instagram"></i></a></li>`);
  htmlContent.push(`</ul>`);
  htmlContent.push(`</div>`);

  return htmlContent.join("");

}

function render(variables = {}) {
  //console.log("These are the current variables: ", variables); //print on the console

  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.

    document.querySelector("#widget_content").innerHTML = renderBody(variables);
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function () {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".form-select, .form-control").forEach(function (elm) {
    elm.addEventListener("change", function (e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      console.log(attribute);
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
            ? true
            : this.value == "false"
              ? false
              : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
