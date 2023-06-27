if(orders.length!==0){
  orderDisplay.push(orders);
  localStorage.setItem('orderDisplay',JSON.stringify(orderDisplay));
  }
  localStorage.removeItem("orders");
  //console.log(orderDisplay);
  let printhtml='';
  orderDisplays=orderDisplay.reverse();
  totalcosts=totaldisplays.reverse();
  let displaycount=0;
    orderDisplays.forEach((displays)=>{
      if(orderDisplays.length!==0){
      let html=`
          <div class="content">
            <div class="order-details">
              <div class="order-one">
                <div class="order-details-in">
                <div class="left-head">Order Placed:</div>
                <div>August 12</div>
                </div>
                <div class="order-details-in">
                  <div class="left-head">Total:</div>
                  <div>${totalcosts[displaycount]}</div>
                </div>
              </div>
              <div class="order-details-in">
                <div class="left-head">OrderID:</div>
                <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
              </div>
            </div>`
          printhtml+=html;
          displaycount++;
      }
      let count=0;
      displays.forEach((display)=>{
        let html=`
            <div class="product-content js-product-content">
              <div class="product-image-section">
                <img class="product-image" src="${display.productImage}">
              </div>
              <div>
                <div class="product-name">${display.productName}</div>
                <div class="arrive">Arriving on: August 15</div>
                <div class="quantity">Quantity : ${display.quantity}</div>
                <div>
                  <button class="buy-button js-buy-button" data-button-id="${display.id}" data-product-name="${display.productName}" data-product-image="${display.productImage}" data-product-cost="${display.productCost}"" >
                    <img class="buy-again js-buy-again" src="Icons/buy-again.png">
                    <p class="buy-again-cap js-buy-again-cap">Buy it again</p>
                    <span class="added js-added">✓ Added</span>
                  </button>
                </div>
              </div>
              <div class="track-button-section">
                <a href="https://ram-srinivaschandran.github.io/Tracking/track.html">
                  <button class="track-button">Track package</button>
                </a>
              </div>
            </div>`
            count++;
        if(count===displays.length){
          printhtml=printhtml+html+'</div>'
        }
        else{
          printhtml+=html;
        }
      });
    });
  
  document.querySelector('.js-order-display').innerHTML=printhtml;
let productContent=document.querySelectorAll('.js-product-content');
const addedTextTimeouts = {};
productContent.forEach((product)=>{
  product.querySelector('.js-buy-button').addEventListener('click',()=>{
    let buttonId=product.querySelector('.js-buy-button').dataset.buttonId;
    let productName=product.querySelector('.js-buy-button').dataset.productName;
    let productImage=product.querySelector('.js-buy-button').dataset.productImage;
    let productCost=product.querySelector('.js-buy-button').dataset.productCost;
    let matchingItem;
    cartProducts.forEach((item)=>{
      if(buttonId===item.Id){
        matchingItem=item;
      }
    });
    if(matchingItem){
      matchingItem.quantity += 1;
    }
    else{
    cartProducts.push({
      Id:buttonId,
      productName:productName,
      productImage:productImage,
      productCost:productCost,
      quantity:1
    });
   }
    localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
    product.querySelector('.js-buy-again').classList.add("buy-again-js");
    product.querySelector('.js-buy-again-cap').classList.add("buy-again-cap-js");
    product.querySelector('.js-added').classList.add("added-js");
    setTimeout(()=>{
      const previousTimeoutId = addedTextTimeouts[buttonId];
          if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
          }
          const timeoutId = setTimeout(() => {
            product.querySelector('.js-buy-again').classList.remove("buy-again-js");
            product.querySelector('.js-buy-again-cap').classList.remove("buy-again-cap-js");
            product.querySelector('.js-added').classList.remove("added-js");
      },2000);
      addedTextTimeouts[buttonId] = timeoutId;
    });
  });
});