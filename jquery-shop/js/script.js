function CartPage(productsList) {
  var _this = this,
      products = productsList,
      shoppingList = _this.getShoppingList();

  _this.buildList();
  _this.buildShoppingCart();
}

CartPage.prototype.buildList = function() {
    var _this = this,
        parentWrap = jQuery(".js-product-wrap");
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
  var parentWrap = jQuery(".js-shopping-wrap"),
      templateElement = jQuery(jQuery(".templates .js-one-shopping-line").clone());

  console.log(templateElement.html());
}

CartPage.prototype.addProduct = function(productId){
  var currentList = this.getShoppingList(),
      newLineFlag = true;

  for (var i=0; i < currentList.length; i++ ) {
    if (currentList[i].productId == productId) {
      currentList[i].quantity += 1;
      newLineFlag = false;
      break;
    }
  }

  if (newLineFlag) {
    currentList.push({'productId': productId, 'quantity': 1});
  }

  this.saveShopingList(currentList);
};

CartPage.prototype.removeProduct = function(productId){
  var currentList = this.getShoppingList();

  for (var i=0; i < currentList.length; i++ ) {
    if (currentList[i].productId == productId ) {
      if ( 1 < currentList[i].quantity ) {
        currentList[i].quantity -= 1;
      } else {
        currentList.splice(i, 1);
      }
    }
  }

  this.saveShopingList(currentList);
}

CartPage.prototype.saveShopingList = function(obj){
  localStorage.setItem('shoppingCart', JSON.stringify(obj));
};

CartPage.prototype.getShoppingList = function(){
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}
