const userInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn")
const pOutput = document.getElementById("output");
const divOut = document.getElementById("output-box")

/* define numerals */

const numerals = {
  'M': 1000,
  'CM': 900,
  'D': 500,
  'CD': 400,
  'C': 100,
  'XC': 90,
  'L': 50,
  'XL': 40,
  'X': 10,
  'IX': 9,
  'V': 5,
  'IV': 4,
  'I': 1
}

/* if proper input, call numeralify */
const validateInput = () => {
  divOut.classList.remove("hidden");
  const inputInt = parseInt(userInput.value);
  console.log(inputInt.toString());
  if (!(isNaN(inputInt))){
    if (inputInt <= 0){ pOutput.innerText = "Please enter a number greater than or equal to 1"; divOut.classList.add("misinput"); return;}
    else if (inputInt >= 4000){ pOutput.innerText = "Please enter a number less than or equal to 3999"; divOut.classList.add("misinput"); return;}
    else{
      numeralify(inputInt);
      return;
    }

  }
  else{
  divOut.classList.add("misinput");
  pOutput.innerText = "Please enter a valid number";
}}

const numeralify = (inputInt) => {
  divOut.classList.remove("misinput");
  let originalNumber = inputInt;
  let finalNumeral = "";
  for (let key in numerals) {
    // store value in variable for performing math 
    let value = numerals[key];
    // subtract value if would not make less than 0
    while (originalNumber-value >= 0){
      finalNumeral+=key;
      originalNumber-=value;
      }
    }
  // Update output label innertext
  console.log(finalNumeral);
  // if user fails to provide nondecimal, we're just overwriting their input
  userInput.value = inputInt;
  pOutput.innerText = finalNumeral;
}

convertBtn.addEventListener("click",validateInput);
