
import {getProducts} from './api.js';
import { renderCart, setupCartEvents } from './card.js';
import { setupDragDrop } from './dragDrop.js';
import { setupProducts } from './products.js';


const cartItems = document.querySelector("#cart-items")
const productList = document.querySelector("#product-list")
const basket = document.querySelector("#basket")

// initalize cart
 renderCart(cartItems)
setupCartEvents(cartItems)
 
 //load products 
 setTimeout(() =>{
     
    getProducts()

    .then(products =>{

      setupProducts(products);

      setupDragDrop(productList, basket, products);

    })
 
 .catch(error =>{
        console.error('Could not load products:', error);
      
  });

    
   
   },300);
