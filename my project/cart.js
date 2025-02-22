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
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₱${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
        total += item.price * item.quantity;
    });

    // Append total row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="2"><strong>Total</strong></td>
        <td><strong>₱${total.toFixed(2)}</strong></td>
    `;
    cartItems.appendChild(totalRow);
}
