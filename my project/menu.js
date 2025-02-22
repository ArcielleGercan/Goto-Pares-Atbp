import supabase from "./supabase.js";
import { addToCart } from "./cart.js";

async function fetchMenu() {
    const { data, error } = await supabase
        .from("MENU")
        .select("*")
        .order("category_id", { ascending: true });

    if (error) {
        console.error("Error fetching menu:", error);
        return;
    }

    let menuSection = document.getElementById("menu-options");
    menuSection.innerHTML = "<h2>Menu Options</h2>";

    data.forEach((item) => {
        let menuItem = `
            <div>
                <img src="${item.menu_image}" alt="${item.menu_name}" width="100">
                <h3>${item.menu_name}</h3>
                <p>${item.menu_description}</p>
                <p>₱${item.menu_price.toFixed(2)}</p>
                <button onclick="addToCart(${item.menu_id}, '${item.menu_name}', ${item.menu_price})">Add to Cart</button>
            </div>
        `;
        menuSection.innerHTML += menuItem;
    });
}

document.addEventListener("DOMContentLoaded", fetchMenu);
