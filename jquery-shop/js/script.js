function CartPage(productsList) {
  var _this = this,
      products = productsList,
      shoppingList = ;

  _this.buildList();
}

CartPage.prototype.buildList = function() {
    var _this = this,
        parentWrap = jQuery(".js-product-wrap") || "";
    parentWrap.empty();
    $.each(products,function(index,value){
      var template = jQuery(jQuery(".templates .js-one-product").clone());
      template.find(".js-product-name").text(value.name);
      template.find(".js-product-desc").text(value.desc);
      template.find(".js-product-price").text('$' + value.price);
      template.on("click", function(){
        _this.addProduct(jQuery(this).index());
      })
      parentWrap.append(template);
    });
}

CartPage.prototype.buildShoppingCart = function() {
  console.log('buildShoppingCart');
}

CartPage.prototype.addProduct = function(productId){
  console.log(products[productId]);

};

CartPage.prototype.saveShopingList = function(){
  // Local storage - https://tproger.ru/articles/localstorage/
};
