function Shop(productList) {
    var _this = this;
    _this.productList = productList || {};
    _this.shoppingCart = _this.getShoppingList() || [];
    _this.cartWrapper = ( document.querySelector(".js-cart-parent") || {} ).innerHTML;
    _this.oneProductInList = ( document.querySelector("#oneProductInList") || {} ).innerHTML;
    _this.listOfShoppingCart = ( document.querySelector("#shoppingCartT") || {} ).innerHTML;

     document.querySelector(".js-product-list-wrap").addEventListener("click", function(e){
         if( e && e.target && e.target.classList.contains("js-add-product-button") ) {
             _this.addToShoppingCart(e.target.dataset.prId, 1);
         }
     });

    _this.buildProductLIst();
    _this.buildShoppingCart();
}

Shop.prototype.buildProductLIst = function(){
    var listProductsDom = document.createElement("div"),
        self = this;
    listProductsDom.innerHTML = this.productList.map(function(val) {
        var oneElem = document.createElement('div');
        oneElem.innerHTML = self.oneProductInList;
        oneElem.querySelector(".js-product-name").textContent = val.name;
        oneElem.querySelector(".js-product-desc").textContent = val.desc;
        oneElem.querySelector(".js-product-price").textContent = '$' + val.price;
        oneElem.querySelector(".js-add-product-button").dataset.prId = val.id;
        return oneElem.innerHTML;
    }).join('');
    document.querySelector(".js-product-list-wrap").innerHTML = listProductsDom.innerHTML;
};

Shop.prototype.buildShoppingCart = function(){
    var shopingCartT = document.createElement("div"),
        self = this;
    shopingCartT.innerHTML = this.shoppingCart.map(function(val){
        var oneElem = document.createElement('div');
        oneElem.innerHTML = self.listOfShoppingCart;
        oneElem.dataset.prId = val.productId;
        oneElem.querySelector(".js-one-product-name").textContent = val.productId;
        oneElem.querySelector(".js-one-product-quantity").textContent = val.quantity;
        oneElem.querySelector(".js-one-product-price").textContent = '$' + val.quantity;
        return oneElem.innerHTML;
    }).join('');
    document.querySelector(".js-cart-wrap").innerHTML = shopingCartT.innerHTML;

    document.querySelector(".js-one-product-line").addEventListener("click", function(e){
        if( e && e.target && e.target.classList.contains("js-plus-quantity") ) {
            self.removeToShoppingCart(e.target.dataset.prId);
        }
    });
    console.log(shopingCartT);
}

Shop.prototype.addToShoppingCart = function(productId, quantity){
    var allListInCart = this.shoppingCart,
        newLine = true,
        newItem = {
            'productId': productId,
            'quantity': quantity
        };
        // Need write For

    for(var i=0; i<allListInCart.length; i++) {
        if(allListInCart[i].productId == productId) {
            allListInCart[i].quantity += 1;
            newLine = false;
        }
    }
    if(newLine){
        allListInCart.push(newItem);
    }
    this.saveShoppingCart(allListInCart);
}

Shop.prototype.removeToShoppingCart = function(productId){
    var allListInCart = this.shoppingCart;

    for(var i=0; i<allListInCart.length; i++) {
        if(allListInCart[i].productId == productId) {
            if( 1 < allListInCart[i].quantity) {
                allListInCart[i].quantity -= 1;
            } else {
                allListInCart.splice(i);
            }
        }
    }
    this.saveShoppingCart(allListInCart);
}

Shop.prototype.saveShoppingCart = function(data){
    localStorage.setItem('shopingCart', JSON.stringify(data));
};

Shop.prototype.getShoppingList = function(){
    return JSON.parse(localStorage.getItem('shopingCart'));
}
