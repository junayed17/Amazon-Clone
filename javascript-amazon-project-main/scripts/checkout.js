import {
  card,
  cardupdate,
  cardQuantity,
  updateLocalStorage,
} from "../data/card.js";
import { products } from "./products.js";
import { deliveryShedule, deliveryDay } from "../data/deliveryTime.js";
import {show} from "./totalCostOfOrder.js";



function  updateOrderSummery(){


  let orderSummeryObject = show();
   document.querySelector(".jsPaymentSummery").innerHTML = `
  <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${orderSummeryObject[0].totalItems}):</div>
          <div class="payment-summary-money">$${
            orderSummeryObject[0].productCost
          }</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${
            orderSummeryObject[0].delivery
          }</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(
            orderSummeryObject[0].productCost + orderSummeryObject[0].delivery
          ).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${
            orderSummeryObject[0].taxis
          }</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${(
            orderSummeryObject[0].taxis + orderSummeryObject[0].totalCost
          ).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
  `;


console.log(orderSummeryObject[0].delivery)
}







// import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
const orderSummery = document.querySelector(".jsOrderSummery");
const totalItemtag = document.querySelector(".jsTotalItem");

function deliveryTimes(matchitem, ChoosenId, productId) {
  let deliverydayStr = "";

  deliveryShedule.forEach((deliveryday) => {
    const ischecked = ChoosenId === deliveryday.id ? "checked" : "";


    const dayStr = deliveryDay(deliveryday.deliveryDays);
    const chergeStr =
      deliveryday.deliveryDays == 7
        ? "FREE"
        : `$${deliveryday.chergeInCents / 100}-`;

    deliverydayStr += `<div class="delivery-option">
                   <input type="radio" ${ischecked}
                     class="delivery-option-input jsDeliveryOption"
                     name="delivery-option-${matchitem}" data-deliveryId=${deliveryday.id} data-productId=${productId}>
                   <div>
                     <div class="delivery-option-date">
                       ${dayStr}
                     </div>
                     <div class="delivery-option-price">
                       ${chergeStr} Shipping
                     </div>
                   </div>
                 </div>`;
  });

  return deliverydayStr;
}

export function cardStr() {
  let orderStr = "";
  let totalItem = 0;
  card.forEach((element) => {
    let matchitem;
    products.forEach((ele) => {
      if (element.id === ele.id) {
        matchitem = ele;
      }
    });

    let delevarydetails = 0;
    deliveryShedule.forEach((delivery) => {
      if (delivery.id === element.deliveryId) {
        delevarydetails = delivery;
      }
    });

 

    orderStr += `<div class="cart-item-container id${matchitem.id}">
             <div class="delivery-date">
               Delivery date: ${deliveryDay(delevarydetails.deliveryDays)}
             </div>
 
             <div class="cart-item-details-grid">
               <img class="product-image"
                 src=${matchitem.img}>
 
               <div class="cart-item-details">
                 <div class="product-name">
                   ${matchitem.name}
                 </div>
                 <div class="product-price">
                   $${matchitem.price / 100}
                 </div>
                 <div class="product-quantity">
                   <span>
                     Quantity: <span class="quantity-label">${
                       element.quantity
                     }</span>
                   </span>
                   <span class="update-quantity-link link-primary">
                     Update
                   </span>
                   <span class="delete-quantity-link link-primary jsCheckoutUpdate" data-id=${
                     matchitem.id
                   }>
                     Delete
                   </span>
                 </div>
               </div>
 
               <div class="delivery-options">
                 <div class="delivery-options-title">
                   Choose a delivery option:
                 </div>
                 ${deliveryTimes(matchitem.id, element.deliveryId, element.id)}
               </div>
             </div>
           </div>`;
    totalItem += element.quantity;
  });
  totalItemtag.innerHTML = `${totalItem} Items`;
  return orderStr;
}

orderSummery.innerHTML = cardStr();

const jsCheckoutUpdate = document.querySelectorAll(".jsCheckoutUpdate");

jsCheckoutUpdate.forEach((element) => {
  let totalItemshow = document.querySelector(".jsTotalItem");
  element.addEventListener("click", () => {
    let deleteId = element.dataset.id;
    totalItemshow.innerHTML = `${cardupdate(deleteId)} Items`;
    let deleteitem = document.querySelector(`.id${deleteId}`);
    deleteitem.remove();
    updateOrderSummery();
  });
});

let jsCheckoutTotalItem = document.querySelector(".jsTotalItem");
jsCheckoutTotalItem.innerHTML = `${cardQuantity()} Items`;

let c = document.querySelectorAll(".jsDeliveryOption");

c.forEach((element) => {
  element.addEventListener("click", () => {
    const productIdOfItem = element.dataset.productid;
    let WhiceCardItemWillDelete;
    card.forEach((ele) => {
      if (ele.id === productIdOfItem) {
        WhiceCardItemWillDelete = ele;
      }
    });
    let deliveryId = Number(element.dataset.deliveryid);
    WhiceCardItemWillDelete.deliveryId = deliveryId;

    cardStr();
 
    updateLocalStorage();
    updateOrderSummery()
  });
});


updateOrderSummery()













cardStr();


console.log(show())