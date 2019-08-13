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
  template: {}
});


var cartPage = new Vue({
  el: '#cart-page',
  data: {
    shoppingList: [
      {"id":"product1","quantity":10},
      {"id":"product3","quantity":1},
      {"id":"product2","quantity":5}
    ],
    productsList: [
      {id: "product1", name: "Name of Product 1", desc: "Description of Product 1", price: 10.99},
      {id: "product2", name: "Name of Product 2", desc: "Description of Product 2", price: 20.16},
      {id: "product3", name: "Name of Product 3", desc: "Description of Product 3", price: 50.24},
      {id: "product4", name: "Name of Product 4", desc: "Description of Product 4", price: 0.95}
    ]
  },
  created() {
    //this.shoppingList = JSON.parse(localStorage.getItem('shopingCart')) || [];
  },
  methods: {
    addToCartM: function(id) {
      //this.shoppingList.push({'id': id, 'quantity': 1});
      for(var i=0; i<this.shoppingList.length; i++) {
        if(this.shoppingList[i].id == id) {
          console.log("есть такой продукт");
          return true;
        }
      }
    },
    changeShoppingCart: function() {

    }
  }
});
