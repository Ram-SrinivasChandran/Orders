let cartCount=JSON.parse(localStorage.getItem("cartCount"))||0;
function displayCartCount(){
  document.querySelector('.js-cart-count').innerHTML=cartCount;
}