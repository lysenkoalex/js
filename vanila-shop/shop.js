function Shop(productList) {
    this.productList = productList || {};
    this.cartWrapper = ( document.querySelector(".js-cart-parent") || {} ).innerHTML;
    this.oneProductInList = ( document.getElementById("oneProductInList") || {} ).innerHTML;
    this.listOfProducts = ( document.querySelector("#listOfProducts") || {} ).innerHTML;
    this.buildProductLIst();
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
    
};