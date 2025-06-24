
export let card = JSON.parse(localStorage.getItem("card"))||[]

// if(!card){
//   card = [
//   ];
// }

export function cardQuantity(){
  let quantity=0;
  card.forEach(element => {
    quantity+=element.quantity;
  });
  return quantity;
} 

export function updateLocalStorage(){
  localStorage.setItem("card",JSON.stringify(card))
}
export function addcard(element, card) {
 
  const ide = element.dataset.jscartid;
  let q = document.querySelector(`.quantitySelector${ide}`);
  let isExist = false;
  let matchingindex;

  card.forEach((item) => {
    if (item.id === ide) {
      isExist = true;
      matchingindex = card.indexOf(item);
    }
  });
  if (isExist) {
    card[matchingindex].quantity = Number(q.value);
  } else {
    card.push({
      id: ide,
      quantity: 1,
      deliveryId: 2,
    });
  }
 
  updateLocalStorage();
  let cartItemShow = document.querySelector(".jsCardQuantity");
  cartItemShow.innerHTML = cardQuantity();
}



export function cardupdate(id){
  let totalItem=0;
  let newCard=[];
  card.forEach(element => {
    if(element.id!=id){
      newCard.push(element);
    }
  });
  newCard.forEach(ele => {
    totalItem+=ele.quantity;
  });
  card=newCard;
  updateLocalStorage();
  let jsCheckoutTotalItem = document.querySelector(".jsTotalItem");
  jsCheckoutTotalItem.innerHTML = cardQuantity();
  return totalItem;
}