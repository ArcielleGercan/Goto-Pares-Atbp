let cart = [];

export function addToCart(menu_id, menu_name, menu_price) {
    let item = cart.find(i => i.menu_id === menu_id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ menu_id, menu_name, menu_price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    let cartTable = document.getElementById("cart-table");
    cartTable.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `;

    let total = 0;
    cart.forEach((item) => {
        let subtotal = item.menu_price * item.quantity;
        total += subtotal;
        cartTable.innerHTML += `
            <tr>
                <td>${item.menu_name}</td>
                <td>${item.quantity}</td>
                <td>₱${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    cartTable.innerHTML += `
        <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>₱${total.toFixed(2)}</strong></td>
        </tr>
    `;
}

export { cart, updateCart };
