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
        this.$emit("addToCart", this.product.id);
      }
    }
});

Vue.component('shopping-list', {
  template: {}
});


var cartPage = new Vue({
  el: '#cart-page',
  data: {
    shoppingList: [],
    productsList: [
      {id: "product1", name: "Name of Product 1", desc: "Description of Product 1", price: 10.99},
      {id: "product2", name: "Name of Product 2", desc: "Description of Product 2", price: 20.16},
      {id: "product3", name: "Name of Product 3", desc: "Description of Product 3", price: 50.24},
      {id: "product4", name: "Name of Product 4", desc: "Description of Product 4", price: 0.95}
    ],
    methods: {
      addToCartM: function(id) {
        console.log(id);
      }
    }
  }
});
