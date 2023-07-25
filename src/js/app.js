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

function checkValidName(text) {

  let regName = /^(?=.{1,50}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/;

  if (text === null || text.length <= 0 || !regName.test(text)) {
    return false;
  }

  return true;
}

function checkFirstName(firstName, errorElement) {

  let firstNameElement = document.getElementById(errorElement);

  //check first name
  if (checkValidName(firstName)) {
    firstNameElement.classList.add("is-valid");
    firstNameElement.classList.remove("is-invalid");
    return firstName;
  }

  else {
    firstNameElement.classList.add("is-invalid");
    firstNameElement.classList.remove("is-valid");
    return "First Name";
  }
}

function checkLastName(lastname, errorElement) {

  let lastNameElement = document.getElementById(errorElement);

  //check last name
  if (checkValidName(lastname)) {
    lastNameElement.classList.add("is-valid");
    lastNameElement.classList.remove("is-invalid");
    return lastname;
  }

  else {
    lastNameElement.classList.add("is-invalid");
    lastNameElement.classList.remove("is-valid");
    return "Last Name";
  }
}

function checkDropDown(dropDownValue, errorElement) {

  let dropdownElement = document.getElementById(errorElement);

  if (dropDownValue === null || dropdownElement.selectedIndex <= 0) {
    dropdownElement.classList.add("is-invalid");
    dropdownElement.classList.remove("is-valid");
    return "Please select an option";
  }

  else {
    dropdownElement.classList.add("is-valid");
    dropdownElement.classList.remove("is-invalid");
    return dropDownValue;
  }
}

function checkURL(url, errorElement) {

  let regValidURL = /^(https?:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  let urlElement = document.getElementById(errorElement);

  if (url === null || url.length <= 0 || !regValidURL.test(url)) {
    urlElement.classList.add("is-invalid");
    urlElement.classList.remove("is-valid");
    return "#";
  }

  else {
    urlElement.classList.add("is-valid");
    urlElement.classList.remove("is-invalid");
    return url;
  }
}

function checkCover(cover, background) {
  if (cover == false) {
    return "<div class='cover'></div>";
  }

  else {
    return `<div class="cover"><img src="${background}" /></div>`;
  }
}

function renderBody(variables = {}) {

  let htmlContent = [];

  htmlContent.push(`<div class="widget">`);
  htmlContent.push(`${checkCover(variables.includeCover, variables.background)}`);
  htmlContent.push(`<img src="${variables.avatarURL}" class="photo" />`);
  htmlContent.push(`<h1>${checkFirstName(variables.name, "error-label-name")} ${checkLastName(variables.lastname, "error-label-last-name")}</h2>`);
  htmlContent.push(`<h2>${checkDropDown(variables.role, "role-dropdown")}</h2>`);
  htmlContent.push(`<h3>${checkDropDown(variables.city, "city-dropdown")}, ${checkDropDown(variables.country, "country-dropdown")}</h3>`);
  htmlContent.push(`<ul class="${variables.socialMediaPosition}">`);
  htmlContent.push(`<li><a href="${checkURL(variables.twitter, "error-label-url-twitter")}" target="_blank"><i class="fa-brands fa-twitter"></i></a></li>`);
  htmlContent.push(`<li><a href="${checkURL(variables.github, "error-label-url-github")}" target="_blank"><i class="fa-brands fa-github"></i></a></li>`);
  htmlContent.push(`<li><a href="${checkURL(variables.linkedin, "error-label-url-linkedin")}" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>`);
  htmlContent.push(`<li><a href="${checkURL(variables.instagram, "error-label-url-instagram")}" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>`);
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

  checkCityCountry();

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


//===================================================
// City and Country Dropdown Checks
//===================================================

function checkCityCountry() {

  // Get references to the two dropdowns
  const cityDropdown = document.getElementById("city-dropdown");
  const countryDropdown = document.getElementById("country-dropdown");

  // Define the options for both dropdowns based on the selection of the other dropdown
  const optionsBySelection = {
    USA: ["Chicago", "Miami", "New York"],
    Germany: ["Dortmund", "Frankfurt", "Munich"],
    Venezuela: ["Barquisimeto", "Caracas", "Valencia"],
    Canada: ["Ottowa", "Montreal", "Toronto"],
  };

  // Function to update the options in the second dropdown based on the selection in the first dropdown
  function updateCityDropdown() {
    const selectedOption = countryDropdown.value;
    const options = optionsBySelection[selectedOption];

    //if found
    if (options != undefined){
      populateDropdown(options, cityDropdown);
    }
  }

  // Function to update the options in the first dropdown based on the selection in the second dropdown
  function updateCountrydDropdown() {
    const selectedOption = cityDropdown.value;
    for (const key in optionsBySelection) {
      if (optionsBySelection[key].includes(selectedOption)) {
        countryDropdown.value = key;
        break;
      }
    }
  }

  // Function to populate a dropdown with the provided options
  function populateDropdown(options, dropdown) {
    dropdown.innerHTML = ""; // Clear existing options

    const optionElement = document.createElement("option");
    optionElement.selected = true;
    optionElement.disabled.value = "";
    optionElement.textContent = "Please select an option";
    dropdown.appendChild(optionElement);

    // Add new options to the dropdown
    for (const option of options) {
      const optionElement = document.createElement("option");
      optionElement.textContent = option;
      dropdown.appendChild(optionElement);
    }
  }

  // Add event listeners to both dropdowns to trigger the updates
  cityDropdown.addEventListener("change", updateCountrydDropdown);
  countryDropdown.addEventListener("change", updateCityDropdown);

  // Initial update when the page loads
  updateCityDropdown();
}

//================================================================