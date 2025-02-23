import { supabase } from "./supabaseClient.js";
import { addToCart, updateCart } from "./cart.js";

export async function fetchMenu() {
    try {
        const { data, error } = await supabase.from("menu").select("*");

        if (error) throw error;

        console.log("Fetched menu:", data);

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
            const { data: categoryData, error: categoryError } = await supabase
                .from("categories")
                .select("category_name")
                .eq("category_id", categoryId)
                .single();

            if (categoryError) {
                console.warn(`Error fetching category for ID ${categoryId}:`, categoryError);
            }

            const categorySection = document.createElement("div");
            categorySection.id = `category-${categoryId}`;
            categorySection.innerHTML = `<h3 id="${categoryData?.category_name.replace(/\s+/g, '-').toLowerCase()}">${categoryData?.category_name || "Category"}</h3>`;

            categories[categoryId].forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.classList.add("menu-item");
                menuItem.innerHTML = `
                    <img src="${item.menu_image}" alt="${item.menu_name}" width="100">
                    <h4>${item.menu_name}</h4>
                    <p>${item.menu_description}</p>
                    <p><strong>₱${item.menu_price}</strong></p>
                    <button type="button" class="submit-button add-to-cart" data-id="${item.menu_id}" data-name="${item.menu_name}" data-price="${item.menu_price}">Add to Cart</button>
                `;
                categorySection.appendChild(menuItem);
            });

            menuContainer.appendChild(categorySection);
        }

        // Add event listeners to Submit buttons
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const id = event.target.dataset.id;
                const name = event.target.dataset.name;
                const price = parseFloat(event.target.dataset.price);
                addToCart(id, name, price);
            });
        });
    } catch (err) {
        console.error("Error fetching menu:", err);
    }
}

document.addEventListener("DOMContentLoaded", fetchMenu);
