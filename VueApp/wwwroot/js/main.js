Vue.component('product-details', {

    props: {
        details: {
            type: Array,
            required: true
        }
    },

    template: `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
`,

})





Vue.component('product', {

    props: {
        premium: {
            type: Boolean,
            required: true,

        }
    },

    template: `
   <div class="product">

        <div class="product-image">
            <img height="250" width="250" v-bind:src="image" />
        </div>

        <div class="prodcut-info">
            <h1>{{title}}</h1>
            <p v-if="inStock">In Stock</p>            
            <p v-bind:class="{outOfStock: !inStock}" v-else>Out of Stock</p>
            <p>User is premium: {{premium}} </p>
            <p>Shipping: {{shipping}} </p>

            <h3 v-show="onSale">On Sale!</h3>

            <product-details :details="details"></product-details>

            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>

            <div v-for="(variant, index) in variants" v-bind:data-detail-id="variant.variantId"
                 :key="variant.variantId"
                 class="color-box"
                 v-bind:style="{backgroundColor: variant.variantColor}"
                 v-on:mouseover="updateProduct(index)">
            </div>

            <h2>Sizes</h2>
            <ul>
                <li v-for="size in sizes">{{size}}</li>
            </ul>

            <button v-on:click="addToCart" v-bind:disabled="!inStock" v-bind:class="{disabledButton: !inStock}" class="btn btn-success">Add to Cart</button>
            <button v-on:click="removeFromCart" v-show="cart > 0" class="btn btn-danger">Remove from Cart</button>

           


        </div>
        <a v-bind:href="link">Google Image Link</a>

    </div>
`,

    data() {
        return {
            product: 'Socks',
            selectedVariant: 0,
            description: 'These are the best socks!',
            brand: 'Vue Mastery',
            link: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F81vUEAS19vL._UY550_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FBlack-Crochet-Waves-Ankle-Socks%2Fdp%2FB074LSLH1Y&docid=q9d8Uwuapu978M&tbnid=AtCNq83JloPVMM%3A&vet=10ahUKEwjnoJ31havfAhWnwlQKHeOwD5oQMwj2ASgSMBI..i&w=367&h=550&itg=1&bih=938&biw=1920&q=vue%20socks&ved=0ahUKEwjnoJ31havfAhWnwlQKHeOwD5oQMwj2ASgSMBI&iact=mrc&uact=8',
            inventory: 10,
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: '../images/vue-socks-green.jpeg',
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: '../images/vue-socks-blue.jpeg',
                    variantQuantity: 0,
                }
            ],
            sizes: ['small', 'medium', 'large', 'x-large'],
        }
    },
    methods: {
        addToCart: function () {
            //this.cart += 1;
            //if (this.selectedVariant.variantQuantity > 0) {
            //    this.selectedVariant.variantQuantity -= 1;
            //}
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },

        removeFromCart: function () {
            this.cart -= 1;
        },

        updateProduct: function (index) {
            this.selectedVariant = index;
            console.log(index);
            inventory = this.selectedVariant.variantQuantity;
        },
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            if (this.variants) {
                if (this.variants[this.selectedVariant].variantQuantity > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return (this.selectedVariant.variantQuantity > 0) ? true : false;
            }
        },
        shipping() {
            if (this.premium) {
                return 'Free!'
            } else {
                return 2.99
            }
        },

        details() {
            return this.details
        }
    }
})



var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
            this.cart += 1;
        }
    }
})
