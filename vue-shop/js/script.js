Vue.component('product-list', {
  props: ['product'],
  template: `
    <div>
      <h2>{{product.name}}</h2>
      <p>{{product.desc}}</p>
      <button @click="addToCartClicked">Add To Cart</button>
      <span>$ {{product.price}}</span>
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
      <p>$<span>{{price}} x {{item.quantity}}</span></p>
      <b>$<span>{{priceTotal}}</span></b>
      <button @click="$emit('add-to-cart', id)">+</button>
      <button @click="$emit('remove-to-cart', id)">-</button>
      <hr />
    </div>
    `,
    computed: {
      id: function() { return productListColection[productsListMap[this.item.id]].id },
      name: function() { return productListColection[productsListMap[this.item.id]].name },
      price: function() { return productListColection[productsListMap[this.item.id]].price},
      priceTotal: function() {return (productListColection[productsListMap[this.item.id]].price * this.item.quantity).toFixed(2)},
    }
});

Vue.component('cart-counter',{
  props: ['propsList'],
  template: `
    <span>{{count}}</span>
  `,
  computed: {
    count: function(){
      var totalCount = 0;
      for(var i=0; i < this.propsList.length; i++){
        totalCount += this.propsList[i].quantity;
      }
      return totalCount;
    }
  }
});

Vue.component('total-line',{
  props: ['propsList'],
  template: `
    <span v-if="propsList.length"><b>Total:</b> {{total}}</span>
    <h4 class="text-center" v-else>Your cart is empty</h4>
  `,
  computed: {
    total: function(){
      var totalPrice = 0;
      for(var i=0; i < this.propsList.length; i++){
        totalPrice += productListColection[productsListMap[this.propsList[i].id]].price *  this.propsList[i].quantity;
      }
      return totalPrice.toFixed(2);
    }
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
    shoppingList: [],
    productsList: productListColection
  },
  created: function() {
    this.shoppingList = JSON.parse(localStorage.getItem('shopingCart')) || [];
  },
  watch: {
    shoppingList: {
      deep: true,
      handler: function() {
        localStorage.setItem('shopingCart', JSON.stringify(this.shoppingList));
      }
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
    removeToCartM: function(id) {
      for(var i=0; i<this.shoppingList.length; i++) {
        var item = this.shoppingList[i];
        if(item.id == id ) {
          if ( item.quantity > 1 ){
            Object.assign(item, {quantity: item.quantity-1});
          } else {
            this.shoppingList.splice(i, 1);
            return;
          }
        }
      }
    },
    changeShoppingCart: function() {
    }
  }
});
