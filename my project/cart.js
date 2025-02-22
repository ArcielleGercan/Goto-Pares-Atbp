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

// Function to handle order submission
export async function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return;
    }

    // Get form values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;      
    const address = document.getElementById("address").value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    const orderMethod = document.querySelector('input[name="order-method"]:checked')?.value;

    if (!firstName || !lastName || !contact || !email || !paymentMethod || !orderMethod) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        // Insert into customers table
        const { data: customerData, error: customerError } = await supabase
            .from("customers")
            .insert([{ 
                customer_fname: firstName,
                customer_lname: lastName,
                customer_contact: contact,  
                customer_email: email,      
                customer_address: address
            }])
            .select("customer_id")
            .single();

        if (customerError) throw customerError;

        const customerId = customerData.customer_id;

        // Insert into orders table
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert([{ 
                customer_id: customerId,
                order_method_id: orderMethod === "pickup" ? 1 : 2, // Assuming 1 = Pickup, 2 = Delivery
                total_price: totalPrice,
                payment_method_id: paymentMethod === "cash" ? 1 : 2, // Assuming 1 = Cash, 2 = GCash
                order_date: new Date().toISOString()
            }])
            .select("order_id")
            .single();

        if (orderError) throw orderError;

        const orderId = orderData.order_id;

        // Insert into order_items table
        const orderItems = cart.map(item => ({
            order_id: orderId,
            menu_id: item.id,
            quantity: item.quantity,
            subtotal: item.price * item.quantity
        }));

        const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems);

        if (orderItemsError) throw orderItemsError;

        // Clear cart and show success message
        cart = [];
        updateCart();
        alert("Order placed successfully!");

    } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred while placing your order.");
    }
}

// Attach event listener to the form
document.querySelector("form").addEventListener("submit", placeOrder);
