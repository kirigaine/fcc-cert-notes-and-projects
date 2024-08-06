let price = 1.87;
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


const checkCash = () => {
  let cash = parseFloat(cashEle.value);

  //console.log(`cash: ${cash} price: ${price}`);

  if (cash < price) alert("Customer does not have enough money to purchase the item");
  else if (cash === price) changeDue.textContent = "No change due - customer paid with exact cash";

  else{

    let leftover = parseFloat(cash-price).toFixed(2);

    // TODO: Change this logic where it iterates until it cannot instead of using i++

    for(let i=cvalue.length-1;i>=0;i--){
      if (parseFloat(leftover - cvalue[i][1]).toFixed(2) >=0 && cid[i][1] > 0){
        //console.log(`leftover: ${leftover} cvalue: ${cvalue[i][1]}`)
        leftover = parseFloat(leftover - cvalue[i][1]).toFixed(2);
        //console.log(`leftover: ${leftover} cvalue: ${cvalue[i][1]}`)
        cid[i][1] = parseFloat(cid[i][1] - cvalue[i][1]).toFixed(2);
        // DEFINITELY BAD ITERATION CODE, change later
        i++;
      }
      else{
         console.log(`cash: ${cash} price: ${price} leftover: ${leftover}
        // `);
        // console.log(`${i} CID: ${cid}`);
      }
    }
     console.log(`END CID: ${cid}`);


}
}

btnPurchase.addEventListener("click",checkCash);
