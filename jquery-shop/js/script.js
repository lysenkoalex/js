function CartPage(productsList) {
  this.products = productsList,
  this.shoppingList = this.getShoppingList();

  this.buildList();

  this.buildShoppingCart();
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
      template.find(".js-add-product-button").on("click", function(){
        _this.addProduct(jQuery(this).parents(".js-one-product").index());
      })
      parentWrap.append(template);
    });
}

CartPage.prototype.buildShoppingCart = function() {
  var _this = this,
      parentWrap = jQuery(".js-shopping-wrap");
  $.each(this.shoppingList, function(index,value){
      parentWrap.append(_this.renderShoppingLine(value));
  });
}

CartPage.prototype.renderShoppingLine = function(indexElement) {
    var _this = this;
        templateElement = jQuery(jQuery(".templates .js-one-shopping-line").clone());
    templateElement.find(".js-product-name").text(products[indexElement.productId].name);
    templateElement.find(".js-product-price").text("$" + (products[indexElement.productId].price * indexElement.quantity ).toFixed(2));
    templateElement.find(".js-product-count").text(indexElement.quantity);

    templateElement.find(".js-quantity-plus").on("click", function() {
      _this.addProduct(indexElement.productId);
    });

    templateElement.find(".js-quantity-minus").on("click", function() {
      _this.removeProduct(indexElement.productId);
    });
    return templateElement;
}

CartPage.prototype.addProduct = function(productId){
  var currentList = this.getShoppingList() || [],
      _this = this,
      newLineFlag = true,
      parentWrap = jQuery(".js-shopping-wrap");

  for (var i=0; i < currentList.length; i++ ) {
    if (currentList[i].productId == productId) {
      var oneLine = jQuery(parentWrap.find('.js-one-shopping-line')[i]);
      currentList[i].quantity += 1;
      oneLine.after(_this.renderShoppingLine(currentList[i]));
      oneLine.detach();
      newLineFlag = false;
      break;
    }
  }

  if (newLineFlag) {
    currentList.push({'productId': productId, 'quantity': 1});
    parentWrap.append(_this.renderShoppingLine(currentList[currentList.length - 1]));
  }

  this.saveShopingList(currentList);
};

CartPage.prototype.removeProduct = function(productId){
  var _this = this,
      currentList = this.getShoppingList(),
      parentWrap = jQuery(".js-shopping-wrap");

  for (var i=0; i < currentList.length; i++ ) {
    var oneLine = jQuery(parentWrap.find('.js-one-shopping-line')[i]);
    if (currentList[i].productId == productId ) {
      if ( 1 < currentList[i].quantity ) {
        currentList[i].quantity -= 1;
        oneLine.after(_this.renderShoppingLine(currentList[i]).html());
        oneLine.detach();
      } else {
        currentList.splice(i, 1);
        oneLine.detach();
      }
    }
  }

  this.saveShopingList(currentList);
}

CartPage.prototype.saveShopingList = function(obj){
  localStorage.setItem('shoppingCart', JSON.stringify(obj));
};

CartPage.prototype.getShoppingList = function(){
    return JSON.parse(localStorage.getItem('shoppingCart'));
}
