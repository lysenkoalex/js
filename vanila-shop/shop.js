function Shop(productList) {
    var _this = this;
    _this.productList = productList || {};
    _this.shoppingCart = _this.getShoppingList() || [];
    _this.cartWrapper = ( document.querySelector(".js-cart-parent") || {} ).innerHTML;
    _this.oneProductInList = ( document.querySelector("#oneProductInList") || {} ).innerHTML;
    _this.listOfShoppingCart = ( document.querySelector("#shoppingCartT") || {} ).innerHTML;
    _this.totalLine = ( document.querySelector("#shoppingCartTotalT") || {} ).innerHTML;
    _this.emptyWarningLine = ( document.querySelector("#emptyCartWarning") || {} ).innerHTML;

     document.querySelector(".js-product-list-wrap").addEventListener("click", function(e){
         if( e && e.target && e.target.classList.contains("js-add-product-button") ) {
             _this.addToShoppingCart(e.target.dataset.prId, 1);
         }
     });

     document.querySelector(".js-cart-wrap").addEventListener("click", function(e){
         if( e && e.target && e.target.classList.contains("js-minus-quantity") ) {
             _this.removeToShoppingCart(e.target.parentNode.parentNode.dataset.prId);
         }
         if( e && e.target && e.target.classList.contains("js-plus-quantity") ) {
             _this.addToShoppingCart(e.target.parentNode.parentNode.dataset.prId);
         }
     });

    _this.buildProductLIst();
    _this.buildShoppingCart();
}

Shop.prototype.buildProductLIst = function(){
    var listProductsDom = document.createElement("div"),
        self = this;

    // str.replace(/{{sdfsdf}}/, 'content');
    listProductsDom.innerHTML = this.productList.map(function(val) {
        var oneElem = self.oneProductInList;

        oneElem = oneElem.replace(/{{name}}/g, val.name);
        oneElem = oneElem.replace(/{{description}}/g, val.desc);
        oneElem = oneElem.replace(/{{price}}/g, "$"+ val.price);
        oneElem = oneElem.replace(/{{product-id}}/g, val.id);

        return oneElem;
    }).join('');
    document.querySelector(".js-product-list-wrap").innerHTML = listProductsDom.innerHTML;
};

Shop.prototype.buildShoppingCart = function(){
    var shopingCartT = document.createElement("div"),
        totalLineT = document.createElement("div"),
        self = this,
        countProducts = 0
        totalPrice = 0;
    if (Object.keys(this.shoppingCart).length === 0){
      var emptyLineT =  document.createElement("div");
      emptyLineT.innerHTML = this.emptyWarningLine;
      document.querySelector(".js-cart-wrap").innerHTML = emptyLineT.innerHTML;
      document.querySelector(".js-count-products").textContent = "(0)";
      return;
    }
    shopingCartT.innerHTML = this.shoppingCart.map(function(val){
        var oneElem = self.listOfShoppingCart,
            itemElem = products.find(item => item.id == val.productId);

        oneElem = oneElem.replace(/{{name}}/g, itemElem.name);
        oneElem = oneElem.replace(/{{quantity}}/g, val.quantity);
        countProducts += val.quantity;
        oneElem = oneElem.replace(/{{price}}/g, '$' + (val.quantity * itemElem.price).toFixed(2));
        oneElem = oneElem.replace(/{{product-id}}/g, val.productId);
        totalPrice += val.quantity * itemElem.price;

        return oneElem;
    }).join('');
    totalLineT.innerHTML = this.totalLine;
    totalLineT.querySelector(".js-cart-total").textContent = '$' + totalPrice.toFixed(2) ;
    shopingCartT.innerHTML += totalLineT.innerHTML;
    document.querySelector(".js-cart-wrap").innerHTML = shopingCartT.innerHTML;
    document.querySelector(".js-count-products").textContent = "(" + countProducts + ")";
}

Shop.prototype.addToShoppingCart = function(productId, quantity){
    var allListInCart = this.shoppingCart,
        newLine = true,
        newItem = {
            'productId': productId,
            'quantity': quantity
        };

    for(var i=0; i<allListInCart.length; i++) {
        if(allListInCart[i].productId == productId) {
            allListInCart[i].quantity += 1;
            newLine = false;
            break;
        }
    }
    if(newLine){
        allListInCart.push(newItem);
    }
    this.saveShoppingCart(allListInCart);
    this.buildShoppingCart();
}

Shop.prototype.removeToShoppingCart = function(productId){
    var allListInCart = this.shoppingCart;

    for(var i=0; i<allListInCart.length; i++) {
        if(allListInCart[i].productId == productId) {
            if( 1 < allListInCart[i].quantity) {
                allListInCart[i].quantity -= 1;
                break;
            } else {
                allListInCart.splice(i, 1);
                break;
            }
        }
    }
    this.saveShoppingCart(allListInCart);
    this.buildShoppingCart();
}

Shop.prototype.saveShoppingCart = function(data){
    localStorage.setItem('shopingCart', JSON.stringify(data));
};

Shop.prototype.getShoppingList = function(){
    return JSON.parse(localStorage.getItem('shopingCart'));
}
