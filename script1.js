let cart = [];

// Add to Cart
function addToCart(product, price) {
    let item = cart.find(item => item.product === product);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    updateCart();
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Remove from Cart
function removeFromCart(product) {
    let itemIndex = cart.findIndex(item => item.product === product);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCart();
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.product} - ₹${item.price.toFixed(2)} x ${item.quantity}
            <button class="cart-btn add" onclick="addToCart('${item.product}', ${item.price})">+</button>
            <button class="cart-btn remove" onclick="removeFromCart('${item.product}')">-</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    // Ensure total amount is updated
    cartTotal.textContent = total.toFixed(2);
}

// Generate UPI QR Code
function generateQRCode() {
    const totalAmount = parseFloat(document.getElementById("cart-total").textContent);

    if (isNaN(totalAmount) || totalAmount === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Replace 'yourupi@upi' with your actual UPI ID
    const upiId = "abbaskhanjarvis79@okaxis"; // Example: "merchant@upi"
    const upiName = "Craft RAW material 🌸"; // Business or individual name
    const transactionNote = "Shopping Payment"; // Description for payment
    const currency = "INR"; // Indian Rupees

    // UPI Payment URL
    const upiQRData = `upi://pay?pa=${upiId}&pn=${upiName}&tn=${transactionNote}&am=${totalAmount}&cu=${currency}`;

    // Generate QR Code
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiQRData)}`;

    // Update QR Code Image
    const qrImage = document.getElementById("qrcode");
    qrImage.src = qrCodeURL;
    qrImage.style.display = "block";

    document.getElementById("qrcode-container").style.display = "block";
}

// Clear Cart after Checkout
function clearCart() {
    cart = [];  // Reset cart array
    updateCart();  // Refresh cart UI
    document.getElementById("qrcode-container").style.display = "none"; // Hide QR code
    document.getElementById("qrcode").src = ""; // Remove QR code image
    alert("Thank you for shopping! Your cart is now empty.");
}

function scrollInsta(amount) {
    document.querySelector('.insta-feed').scrollBy({
        left: amount,
        behavior: 'smooth'
    });
}



