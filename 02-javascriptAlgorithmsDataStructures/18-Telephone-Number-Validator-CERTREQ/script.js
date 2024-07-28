const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// Construct regex from many smaller regex to simplify logic

const countryCodeRegex = "^(1\\s?)?";
const areaCodeRegex = "(\\(\\d{3}\\)|\\d{3})";
const telephonePrefixRegex = "(\\d{3})";
const lineNumberRegex = "(\\d{4})$";
const spaceDashRegex = "([-\\s])?"
const phoneRegex = new RegExp(`${countryCodeRegex}${areaCodeRegex}${spaceDashRegex}${telephonePrefixRegex}${spaceDashRegex}${lineNumberRegex}`);


// Clear the result when button pressed

const clearResult = () => resultsDiv.textContent = "";

const clearInput = () => {userInput.value = "";
userInput.focus();}

// Trim input and test against regex. Output to result as new element

const validatePhone = (number, regex) => {
  //console.log(regex.test(number));


  if (number !== ""){
    const testRegex = regex.test(number.trim());
    const pEle = document.createElement("p");
    pEle.textContent = (testRegex ? `Valid US number: ${number}` : `Invalid US number: ${number}`);
    resultsDiv.appendChild(pEle);
    
  }
       
  else{
    alert("Please provide a phone number");
  }

  clearInput();
}

clearBtn.addEventListener("click",clearResult);
checkBtn.addEventListener("click", () => validatePhone(userInput.value,phoneRegex))
