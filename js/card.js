
import { loadCart, saveCart } from "./storage.js";

let cart = loadCart();

// 1. Display the cart
export function renderCart(cartItems) {
    const cartTotal = document.querySelector("#cart-total");

    if (!cartTotal || !cartItems) {
        console.error("Cart elements not found");
        return;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: 0 $";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div>
            ${item.name}
            ${item.price} $
            Quantity: ${item.quantity}

            <button data-id="${item.id}" data-action="increase">+</button>
            <button data-id="${item.id}" data-action="decrease">-</button>
            <button data-id="${item.id}" data-action="remove">Remove</button>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent = `Total: ${total} $`;
}

// 2. Handle cart button clicks
export function setupCartEvents(cartItems) {
    cartItems.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button || !cartItems.contains(button)) return;

        const id = Number(button.dataset.id);
        const action = button.dataset.action;

        const product = cart.find(item => item.id === id);

        if (!product) return;

        if (action === "increase") {
            product.quantity++;
        }

        if (action === "decrease") {
            product.quantity--;

            if (product.quantity <= 0) {
                cart = cart.filter(item => item.id !== id);
            }
        }

        if (action === "remove") {
            cart = cart.filter(item => item.id !== id);
        }

        saveCart(cart);
        renderCart(cartItems);
    });
}

// 3. Add a product to the cart
export function addToCart(product, cartItems) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    renderCart(cartItems);
}
