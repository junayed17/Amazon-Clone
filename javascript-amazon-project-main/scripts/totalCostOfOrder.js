import {card} from "../data/card.js"
import {deliveryShedule} from "../data/deliveryTime.js"
import { products } from "./products.js";
import {cardQuantity} from "../data/card.js"

export function show(){
  let totalPrice =[];
console.log(totalPrice);
  let costOfProduct=0;
  let deliveryCharge=0;
  card.forEach(element => {
      deliveryShedule.forEach(ele => {
        if(element.deliveryId===ele.id){
          deliveryCharge += element.quantity * ele.chergeInCents;

        }
      });
      products.forEach((ele) => {
        if (element.id === ele.id) {
          costOfProduct += element.quantity * ele.price;
        }
      });
    
  });

  let totalCost = deliveryCharge / 100 + costOfProduct / 100;
  let tax = Number((totalCost * 0.1).toFixed(2));
  totalPrice.push({
    productCost: costOfProduct / 100,
    delivery: deliveryCharge / 100,
    totalCost: totalCost,
    taxis: tax,
    totalItems: cardQuantity(),
  });
  // console.log(totalPrice[0].totalCost);
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

  return totalPrice;
}
