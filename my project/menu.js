const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchMenu() {
    const { data, error } = await supabase
        .from('MENU')
        .select('*');

    if (error) {
        console.error("Error fetching menu:", error);
        return;
    }

    const categories = {};
    
    // Organizing menu items by category
    data.forEach(item => {
        if (!categories[item.category_id]) {
            categories[item.category_id] = [];
        }
        categories[item.category_id].push(item);
    });

    displayMenu(categories);
}

function displayMenu(categories) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';

    for (const categoryId in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h3>${getCategoryName(categoryId)}</h3>`;

        categories[categoryId].forEach(item => {
            categoryDiv.innerHTML += `
                <div class="menu-item">
                    <img src="${item.menu_image}" alt="${item.menu_name}" width="100">
                    <p>${item.menu_name}</p>
                    <p>${item.menu_description}</p>
                    <p>₱${item.menu_price}</p>
                    <button onclick="addToCart(${item.menu_id}, '${item.menu_name}', ${item.menu_price})">Add to Cart</button>
                </div>
            `;
        });

        menuContainer.appendChild(categoryDiv);
    }
}

function getCategoryName(categoryId) {
    const categories = {
        1: "Silog Meals",
        2: "A La Carte",
        3: "Extras",
        4: "Beverages"
    };
    return categories[categoryId] || "Unknown Category";
}

fetchMenu();
