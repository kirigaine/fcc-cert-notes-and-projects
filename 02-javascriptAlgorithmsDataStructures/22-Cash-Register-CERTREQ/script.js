let price = 1.87;
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


const checkCash = () => {
  let cash = parseFloat(cashEle.value);


  if (cash < price) alert("Customer does not have enough money to purchase the item");
  else if (cash === price) changeDue.textContent = "No change due - customer paid with exact cash";

  else{

    let leftover = parseFloat(cash-price).toFixed(2);
    let i=cvalue.length-1;

    while(i>=0){
      let typeCount = 0;
      if (parseFloat(leftover - cvalue[i][1]).toFixed(2) >=0 && cid[i][1] > 0 ){
          leftover = parseFloat(leftover - cvalue[i][1]).toFixed(2);
          cid[i][1] = parseFloat(cid[i][1] - cvalue[i][1]).toFixed(2);
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
//
        // console.log(cid.every((key,value)=> cid[key] === 0));
        console.log(`cash: ${cash} price: ${price} leftover: ${leftover} status: ${dStatus}`);
      }

}
    
     console.log(`END CID: ${cid}`);


}
}

btnPurchase.addEventListener("click",checkCash);
