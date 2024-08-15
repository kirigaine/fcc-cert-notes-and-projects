let price = 3.26

// Total cash in drawer: $335.41
// Max dispense @ $337.28 - $337.29 tipping point should empty register and fail

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cvalue = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.10],
  ['QUARTER', 0.25],
  ['ONE', 1.0],
  ['FIVE', 5.0],
  ['TEN', 10.0],
  ['TWENTY', 20.0],
  ['ONE HUNDRED', 100.0]
];

const STATUS = {
  OPEN: "OPEN",
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
  CLOSED: "CLOSED"
};

// TO DO: Find insufficient_funds bug and 

const changeDue = document.getElementById("change-due");
const btnPurchase = document.getElementById("purchase-btn");
const cashEle = document.getElementById("cash");
const changeLeft = document.getElementById("change-left");
const thePrice = document.getElementById("price");

let dStatus = STATUS.OPEN;

const updateText = (changeString) => { 
    changeDue.textContent = `Status: ${dStatus} ${changeString}`;
    thePrice.textContent = `\$${price.toFixed(2)}`;
    cashEle.value = "";
    changeLeft.innerHTML = "";
    for (let i=0;i<cid.length;i++){
      const pEle = document.createElement("span");
      pEle.textContent = `${cid[i][0]}: \$${cid[i][1]}`;
      changeLeft.appendChild(pEle);
    }
}

const checkCash = () => {
  const cashRegex = /^\d+(\.\d{1,2})?$/gi;
  let cash = parseFloat(parseFloat(cashEle.value).toFixed(2));
  
  // Ensure monetary value given
  if (cashRegex.test(cash)){

    // Determine if customer can afford or has exact cash, then no logic needed
    if (cash < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
    else if (cash === price){
      changeDue.textContent = "No change due - customer paid with exact cash";
      return;
    }

    else{

      // Subtract price from customer cash so we can calculate change
      let remainingDue = parseFloat(cash-price).toFixed(2);

      // Set iterator
      let i=cvalue.length-1;

      // Track how much of type we dispensed
      let changeDispensedValue = 0;

      // Create string for change element
      let changeString = "";

      while(i>=0){
        const [changeKey, changeValue] = cvalue[i];
        
        // If there is cash in drawer and we can subtract our current key's value and not go negative, do so
        if (cid[i][1] > 0 && parseFloat(remainingDue - changeValue).toFixed(2) >=0){
            remainingDue = parseFloat(remainingDue - changeValue).toFixed(2);
            cid[i][1] = parseFloat(cid[i][1] - changeValue).toFixed(2);
            changeDispensedValue += changeValue;
            }

        else{

          const isDrawerEmpty = cid.every((value)=> parseFloat(value[1]) === 0);
          
          // If we dispensed any change for the iteration, add it to string builder
          if (changeDispensedValue !== 0){
            //const pEle = document.createElement("span");
            //pEle.textContent = `${changeKey}: \$${changeDispensedValue.toFixed(2)}`;
            //changeDue.appendChild(pEle);
            changeString += `\n${changeKey}: \$${changeDispensedValue.toFixed(2)}`;
            changeDispensedValue=0;
          }

          // Check and change register status 
          if (i===0){
            if(parseFloat(remainingDue) !== 0){
              dStatus = STATUS.INSUFFICIENT_FUNDS;
              changeString = "";
              changeDispensedValue = 0;
            }
            else if(parseFloat(remainingDue) === 0 && isDrawerEmpty){
              dStatus = STATUS.CLOSED;
            }
          }

          // Get to this logic when no more can be subtracted, so iterate
          i--;
          
        }
        updateText(changeString);

    }
    
}
}
else{
  alert("INVALID MONEY NUMBER - ONLY NUMERIC INPUT NO $, OPTIONAL 2 DECIMAL PLACES");
}
}

btnPurchase.addEventListener("click",checkCash);

