
let price = 19.5

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

const changeDue = document.getElementById("change-due");
const btnPurchase = document.getElementById("purchase-btn");
const cashEle = document.getElementById("cash");
let dStatus = STATUS.OPEN;

const updateChange = (changeString) => { 
    changeDue.textContent = `Status: ${dStatus} ${changeString}`;
}

const checkCash = () => {
  const cashRegex = /^\d+(\.\d{1,2})?$/gi;
  let cash = parseFloat(parseFloat(cashEle.value).toFixed(2));
  
  // Ensure monetary value given
  if (cashRegex.test(cash)){

    // Determine if customer can afford or has exact cash, then no logic needed
    if (cash < price) alert("Customer does not have enough money to purchase the item");
    else if (cash === price) changeDue.textContent = "No change due - customer paid with exact cash";

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

        // If we fail to subtract change, check if we're out of money
        // Otherwise we go to next iteration
        else{

          const everyZero = cid.every((value)=> parseFloat(value[1]) === 0);

          if(i===0 && parseFloat(remainingDue) !== 0) {
            dStatus = STATUS.INSUFFICIENT_FUNDS;
            changeString = "";
            changeDispensedValue = 0;
          }

          else if(i===0 && parseFloat(remainingDue) === 0 && everyZero) {dStatus = "CLOSED";}
          
          

          if (changeDispensedValue !== 0){
            changeString += `${changeKey}: \$${changeDispensedValue.toFixed(2)}`;
            changeDispensedValue=0;
          }
          i--;
          
        }
        updateChange(changeString);

    }
    
}
}
else{
  alert("INVALID MONEY NUMBER");
}
}

btnPurchase.addEventListener("click",checkCash);
