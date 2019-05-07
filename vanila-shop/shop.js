function Shop(productList) {
    var _this = this;
    _this.productList = productList || {};
    _this.shoppingCart = _this.getShoppingList() || [];
    _this.cartWrapper = ( document.querySelector(".js-cart-parent") || {} ).innerHTML;
    _this.oneProductInList = ( document.querySelector("#oneProductInList") || {} ).innerHTML;
    //_this.listOfProducts = ( document.querySelector("#listOfProducts") || {} ).innerHTML;

    document.querySelector(".js-product-list-wrap").addEventListener("click", function(e){
        if( e && e.target && e.target.classList.contains("js-add-product-button") ) {
            _this.addToShoppingCart(e.target.dataset.prId, 1);
        }
    });
    _this.buildProductLIst();
}

Shop.prototype.buildProductLIst = function(){
    var listProductsDom = document.createElement("div");
    var self = this;
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

Shop.prototype.saveShoppingCart = function(){
    // oneElement = {
    //     'productId': desc,
    //     'quantity': desc,
    // };
    //localStorage.setItem('shopingCart', JSON.stringify(allItems));
};
Shop.prototype.addToShoppingCart = function(productId, quantity){

    var allListInCart = this.shoppingCart,
        newItem = {
            'productId': productId,
            'quantity': quantity
        };
        // Need write For
    allListInCart.push(newItem);
    localStorage.setItem('shopingCart', JSON.stringify(allListInCart));
    
}
Shop.prototype.getShoppingList = function(data){
    return JSON.parse(localStorage.getItem('shopingCart'));
}