import { supabase } from "./supabaseClient.js";
import { addToCart } from "./cart.js";

async function fetchMenu() {
    const { data, error } = await supabase.from("MENU").select("*");

    if (error) {
        console.error("Error fetching menu:", error);
        return;
    }

    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";

    const categories = {};
    for (const item of data) {
        if (!categories[item.category_id]) {
            categories[item.category_id] = [];
        }
        categories[item.category_id].push(item);
    }

    for (const categoryId in categories) {
        const { data: categoryData } = await supabase
            .from("CATEGORIES")
            .select("category_name")
            .eq("category_id", categoryId)
            .single();

        const categorySection = document.createElement("div");
        categorySection.innerHTML = `<h3>${categoryData?.category_name || "Category"}</h3>`;

        categories[categoryId].forEach(item => {
            categorySection.innerHTML += `
                <div class="menu-item">
                    <img src="${item.menu_image}" alt="${item.menu_name}" width="100">
                    <h4>${item.menu_name}</h4>
                    <p>${item.menu_description}</p>
                    <p><strong>₱${item.menu_price}</strong></p>
                    <button onclick="addToCart(${item.menu_id}, '${item.menu_name}', ${item.menu_price})">Add to Cart</button>
                </div>
            `;
        });

        menuContainer.appendChild(categorySection);
    }
}

document.addEventListener("DOMContentLoaded", fetchMenu);
