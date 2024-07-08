const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const resultSpan = document.getElementById("result");


const check = (user_input) => {

  // Check if input is empty

  if(user_input === ""){
    alert("Please input a value");
    return;
  }

  // Remove unnecessary non-alphanumeric characters, and change casing

  const original_input = user_input.toLowerCase().replace(/[^a-z0-9]/g,'');

  // Check if original and reversed are equal

  const reversed_input = original_input.split("").reverse().join("");

  // console.log(`BEFORE: ${original_input}\nAFTER: ${reversed_input}`);

  const isPalindrome = (original_input === reversed_input);

  resultSpan.innerHTML = `<span>${user_input}</span> ${isPalindrome ? "is a palindrome" : "is not a palindrome"}`
  resultSpan.style.backgroundColor = isPalindrome ? "darkgreen" : "darkred";


  // Make sure result is displaying and not hidden
  resultSpan.style.display="block";

}

checkButton.addEventListener("click",() => {
  check(textInput.value);});
