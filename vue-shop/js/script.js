Vue.component('product-list', {
  props: ['product'],
  template: `
    <div>
      <h2>{{product.name}}</h2>
      <p>{{product.desc}}</p>
      <button @click="addToCartClicked">Add To Cart</button>
      <small>{{product.id}}</small>
      <hr />
    </div>
    `,
    methods: {
      addToCartClicked(){
        this.$emit("add-to-cart", this.product.id);
      }
    }
});

Vue.component('shopping-list', {
  props: ['item'],
  template: `
    <div>
      <p>{{name}}</p>
      <p>{{item.quantity}}</p>
      <p>{{price}}</p>
      <hr />
    </div>
    `,
    computed: {
      name: function() { return productListColection[productsListMap[this.item.id]].name },
      price: function() {return '$' + (productListColection[productsListMap[this.item.id]].price * this.item.quantity).toFixed(2)},
    },
    methods: {

    }
});
var productListColection = [
  {id: "product1", name: "Name of Product 1", desc: "Description of Product 1", price: 10.99},
  {id: "product2", name: "Name of Product 2", desc: "Description of Product 2", price: 20.16},
  {id: "product3", name: "Name of Product 3", desc: "Description of Product 3", price: 50.24},
  {id: "product4", name: "Name of Product 4", desc: "Description of Product 4", price: 0.95}
];

var productsListMap = {};

productListColection.forEach(function(pr, index) {
  productsListMap[pr.id] = index;
})

var cartPage = new Vue({
  el: '#cart-page',
  data: {
    shoppingList: [
      {"id":"product1","quantity":10},
      {"id":"product3","quantity":1},
      {"id":"product2","quantity":5}
    ],
    productsList: productListColection
  },
  created: function() {
    this.changeShoppingCart();
  },
  watch: {
    shoppingList: function() {
      this.changeShoppingCart();
    }
  },
  methods: {
    addToCartM: function(id) {
      var newItem = true;
      for(var i=0; i<this.shoppingList.length; i++) {
        var item = this.shoppingList[i];
        if(item.id == id) {
          Object.assign(item, {quantity: item.quantity+1});
          newItem = false;
          return true;
        }
      }
      if(newItem) {
        this.shoppingList.push({'id': id, 'quantity': 1});
      }
    },
    changeShoppingCart: function() {
      // this.shoppingList = JSON.parse(localStorage.getItem('shopingCart')) || [];
      localStorage.setItem('shopingCart', JSON.stringify(this.shoppingList))
    }
  }
});
