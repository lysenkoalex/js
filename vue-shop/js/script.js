Vue.component('product-list', {
  template: {

  }
});

Vue.component('shopping-list', {
  template: {

  }
});


var cartPage = new Vue({
  el: '#cart-page',
  data: {
    shopping
    productsList: [
      {id: "product1", name: "Name of Product 1", desc: "Description of Product 1"},
      {id: "product2", name: "Name of Product 2", desc: "Description of Product 2"},
      {id: "product3", name: "Name of Product 3", desc: "Description of Product 3"},
      {id: "product4", name: "Name of Product 4", desc: "Description of Product 4"}
    ]
  }
});
