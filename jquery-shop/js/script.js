function CartPage(productsList) {
  var _this = this,
      products = productsList;

  _this.buildList();
}

CartPage.prototype.buildList = function() {
    console.log(products);


    $.each(products,function(index,value){
      var template = jQuery(".templates .js-one-product").clone();
      jQuery(template).find(".js-product-name").text(value.name);
      jQuery(".js-product-wrap").append(template);
      console.log(template);
    });
}
