import supabase from "./supabase.js";
import { cart, updateCart } from "./cart.js";

async function placeOrder() {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let address = document.getElementById("address").value || null;
    let paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    let orderMethod = document.querySelector('input[name="order-method"]:checked').value;

    if (!firstName || !lastName || !paymentMethod || !orderMethod || cart.length === 0) {
        alert("Please complete the form and add items to the cart.");
        return;
    }

    let totalPrice = cart.reduce((sum, item) => sum + (item.menu_price * item.quantity), 0);

    // Insert customer
    let { data: customer, error: customerError } = await supabase
        .from("CUSTOMERS")
        .insert([{ customer_fname: firstName, customer_lname: lastName, customer_address: address }])
        .select("customer_id")
        .single();

    if (customerError) {
        console.error("Error adding customer:", customerError);
        return;
    }

    let customerId = customer.customer_id;

    // Insert order
    let { data: order, error: orderError } = await supabase
        .from("ORDERS")
        .insert([{ customer_id: customerId, order_method_id: orderMethod, total_price: totalPrice, payment_method_id: paymentMethod, order_date: new Date() }])
        .select("order_id")
        .single();

    if (orderError) {
        console.error("Error placing order:", orderError);
        return;
    }

    let orderId = order.order_id;

    // Insert order items
    for (let item of cart) {
        await supabase
            .from("ORDER_ITEMS")
            .insert([{ order_id: orderId, menu_id: item.menu_id, quantity: item.quantity, subtotal: item.menu_price * item.quantity }]);
    }

    alert("Order placed successfully!");
    cart.length = 0;
    updateCart();
}

document.getElementById("place-order-btn").addEventListener("click", placeOrder);
