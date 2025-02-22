import { supabase } from "./supabaseClient.js";

let cart = [];

export function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
}

export function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₱${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join("");

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartItems.innerHTML += `
        <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>₱${total.toFixed(2)}</strong></td>
        </tr>
    `;
}
