//let price = 1.87;
let price = 11.95
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

const changeDue = document.getElementById("change-due");
const btnPurchase = document.getElementById("purchase-btn");
const cashEle = document.getElementById("cash");
let dStatus = "OPEN";

const updateChange = () => {
  //temp
}

const checkCash = () => {
  const cashRegex = /^\d+(\.\d{1,2})?$/gi;
  let cash = parseFloat(parseFloat(cashEle.value).toFixed(2));
  // Ensure monetary value given

  if (cashRegex.test(cash)){

    // Determine if customer can afford, otherwise no logic needed
    if (cash < price) alert("Customer does not have enough money to purchase the item");
    else if (cash === price) changeDue.textContent = "No change due - customer paid with exact cash";


    else{

      // Subtract price from customer cash so we can calculate change
      let leftover = parseFloat(cash-price).toFixed(2);
      let i=cvalue.length-1;

      while(i>=0){
        const theKey = cvalue[i][0];
        let theStart = 0;
        let typeCount = 0;
        if (parseFloat(leftover - cvalue[i][1]).toFixed(2) >=0 && cid[i][1] > 0 ){
            leftover = parseFloat(leftover - cvalue[i][1]).toFixed(2);
            cid[i][1] = parseFloat(cid[i][1] - cvalue[i][1]).toFixed(2);
            theStart += cvalue[i][1];
            typeCount++;
            //console.log(`leftover: ${leftover} cvalue: ${cvalue[i][1]}`);
            }
        else{
          //337.28
          const everyZero = cid.every((value)=> parseFloat(value[1]) === 0);
          if(i===0 && parseFloat(leftover) !== 0 && everyZero) {
          alert("insufficient funds"); dStatus = "INSUFFICIENT_FUNDS";}
          else if(i===0 && parseFloat(leftover) === 0 && everyZero) {dStatus = "CLOSED";}
          i--;
          if (theStart !== 0){
            changeDue.textContent += `${theKey}: \$${theStart}`;
          }
          // console.log(cid.every((key,value)=> cid[key] === 0));
          console.log(`cash: ${cash} price: ${price} leftover: ${leftover} status: ${dStatus}`);
        }

    }
    
     console.log(`END CID: ${cid}`);


}
}
else{
  alert("INVALID MONEY NUMBER");
}
}

btnPurchase.addEventListener("click",checkCash);
