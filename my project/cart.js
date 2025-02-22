let cart = [];

function addToCart(menuId, name, price) {
    let item = cart.find(item => item.menuId === menuId);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ menuId, name, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = '';

    let total = 0;
    
    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td><input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${item.menuId}, this.value)"></td>
                <td>₱${subtotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${item.menuId})">Remove</button></td>
            </tr>
        `;
    });

    document.getElementById('total-price').textContent = `₱${total.toFixed(2)}`;
}

function changeQuantity(menuId, newQuantity) {
    let item = cart.find(item => item.menuId === menuId);
    if (item) {
        item.quantity = parseInt(newQuantity);
    }
    updateCart();
}

function removeFromCart(menuId) {
    cart = cart.filter(item => item.menuId !== menuId);
    updateCart();
}
