import {card} from "./card.js"
import { products } from "../scripts/products.js";
export let orderSummery = [];
 export function order(orderSummery) {
   card.forEach((item) => {
     let matchitem;
     products.forEach((element) => {
       if (item.id === element.id) {
         matchitem = element;
       }
     });
     orderSummery.push({
       id: matchitem.id,
       name: matchitem.name,
       quantity: item.quantity,
     });
   });
 }
