// =============================
// BITEBOX FOOD ORDERING
// =============================

let cart = [];


// =============================
// ADD TO CART
// =============================

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Small visual feedback
    const cartButton = document.querySelector(".cart-button");

    cartButton.style.transform = "scale(1.08)";

    setTimeout(() => {
        cartButton.style.transform = "scale(1)";
    }, 180);
}


// =============================
// UPDATE CART
// =============================

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");


    // Total quantity
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div style="font-size:50px;">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something delicious!</p>
            </div>
        `;

        cartTotal.textContent = "0";

        return;
    }


    // Create cart items
    cartItems.innerHTML = cart.map((item, index) => {

        const itemTotal = item.price * item.quantity;

        return `
            <div class="cart-item">

                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                    <strong>₹${itemTotal}</strong>
                </div>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>
        `;

    }).join("");


    // Calculate total
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartTotal.textContent = total;
}


// =============================
// CHANGE QUANTITY
// =============================

function changeQuantity(index, change) {

    cart[index].quantity += change;


    // Remove item if quantity becomes zero
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }


    updateCart();
}


// =============================
// OPEN / CLOSE CART
// =============================

function toggleCart() {

    const cartOverlay =
        document.getElementById("cart-overlay");

    cartOverlay.classList.toggle("open");
}


// =============================
// CATEGORY FILTER
// =============================

function filterFood(category, button) {

    const cards =
        document.querySelectorAll(".food-card");

    const buttons =
        document.querySelectorAll(".category");


    // Remove active state
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    // Add active state
    button.classList.add("active");


    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });


    // Clear search when changing category
    document.getElementById("search").value = "";
}


// =============================
// SEARCH FOOD
// =============================

function searchFood() {

    const searchValue =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(".food-card");


    cards.forEach(card => {

        const foodName =
            card.dataset.name.toLowerCase();

        const foodCategory =
            card.dataset.category.toLowerCase();


        if (
            foodName.includes(searchValue) ||
            foodCategory.includes(searchValue)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });


    // Reset category buttons
    document
        .querySelectorAll(".category")
        .forEach(button => {
            button.classList.remove("active");
        });

    document
        .querySelector(".category")
        .classList.add("active");
}


// =============================
// CHECKOUT
// =============================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add some food first! 🍕"
        );

        return;
    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    alert(
        `🎉 Order placed successfully!\n\nTotal: ₹${total}\n\nThank you for ordering from BiteBox!`
    );


    // Clear cart
    cart = [];

    updateCart();

    toggleCart();
}


// =============================
// INITIALIZE
// =============================

updateCart();