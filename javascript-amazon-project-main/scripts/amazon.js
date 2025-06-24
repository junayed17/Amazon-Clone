import { card, addcard, cardQuantity } from "../data/card.js";
import { products} from "./products.js";
import {centcurrency } from "./utility/centcurrency.js"
import { orderSummery, order } from "../data/orderSummery.js";
const containerHtml = document.querySelector(".jsProducts");

let productStr = "";
products.forEach((product) => {
  productStr += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src=${product.img}>
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${
            product.ratting.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            127
          </div>
        </div>

        <div class="product-price">
          $${centcurrency(product.price)}
        </div>

        <div class="product-quantity-container">
          <select class="quantitySelector${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button button-primary" data-jsCartId="${
          product.id
        }">
          Add to Cart
        </button>
      </div>`;
});






containerHtml.innerHTML = productStr;
const addToCart = document.querySelectorAll(".button");
addToCart.forEach((element) => {
  element.addEventListener("click", () => {
    addcard(element,card);


    order(orderSummery);
  });









});

let cartItemShow = document.querySelector(".jsCardQuantity");
cartItemShow.innerHTML = cardQuantity();






