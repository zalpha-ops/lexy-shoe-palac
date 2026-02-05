// Product data
// Load products from admin panel or use default
let products = JSON.parse(localStorage.getItem('lexyShoeProducts')) || [
    {
        id: 1,
        name: "Classic White Sneakers",
        price: 8999,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop&crop=center",
        sizes: [7, 8, 9, 10, 11, 12]
    },
    {
        id: 2,
        name: "Black Formal Shoes",
        price: 12999,
        category: "formal",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
        sizes: [7, 8, 9, 10, 11, 12]
    },
    {
        id: 3,
        name: "Canvas Sneakers",
        price: 5999,
        category: "casual",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop&crop=center",
        sizes: [6, 7, 8, 9, 10, 11]
    },
    {
        id: 4,
        name: "Sports Running Shoes",
        price: 11999,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center",
        sizes: [7, 8, 9, 10, 11, 12, 13]
    },
    {
        id: 5,
        name: "Brown Leather Shoes",
        price: 14999,
        category: "formal",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=300&fit=crop&crop=center",
        sizes: [7, 8, 9, 10, 11, 12]
    },
    {
        id: 6,
        name: "Casual Slip-ons",
        price: 7999,
        category: "casual",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop&crop=center",
        sizes: [6, 7, 8, 9, 10, 11]
    },
    {
        id: 7,
        name: "School Shoes (Black)",
        price: 6999,
        category: "formal",
        image: "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=400&h=300&fit=crop&crop=center",
        sizes: [5, 6, 7, 8, 9, 10, 11]
    },
    {
        id: 8,
        name: "Colorful Sneakers",
        price: 9999,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&crop=center",
        sizes: [6, 7, 8, 9, 10, 11, 12]
    }
];

// Shopping cart
let cart = [];
let currentFilter = 'all';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Load latest products from admin panel
    refreshProducts();
    displayProducts(products);
    updateCartCount();
});

// Refresh products from localStorage
function refreshProducts() {
    const savedProducts = JSON.parse(localStorage.getItem('lexyShoeProducts'));
    if (savedProducts && savedProducts.length > 0) {
        products = savedProducts;
    }
}

// Display products
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">KShs ${product.price.toLocaleString()}</div>
            <div class="product-sizes">
                ${product.sizes.map(size => 
                    `<button class="size-btn" onclick="selectSize(this, ${size})">${size}</button>`
                ).join('')}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;

    return card;
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Select size
function selectSize(button, size) {
    // Remove selection from other size buttons in the same product
    const productCard = button.closest('.product-card');
    productCard.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select current size
    button.classList.add('selected');
    button.setAttribute('data-selected-size', size);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const productCard = document.querySelector(`[onclick="addToCart(${productId})"]`).closest('.product-card');
    const selectedSizeBtn = productCard.querySelector('.size-btn.selected');
    
    if (!selectedSizeBtn) {
        alert('Please select a size first!');
        return;
    }
    
    const selectedSize = selectedSizeBtn.getAttribute('data-selected-size');
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => 
        item.id === productId && item.size === parseInt(selectedSize)
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size: parseInt(selectedSize),
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    
    // Show success message
    showNotification('Item added to cart!');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Toggle cart sidebar
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    
    cartOverlay.classList.toggle('active');
    cartSidebar.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">Size: ${item.size} | KShs ${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span style="margin: 0 0.5rem;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="qty-btn" onclick="removeFromCart(${index})" style="margin-left: 1rem; color: #e74c3c;">×</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toLocaleString();
}

// Update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCartCount();
    updateCartDisplay();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Close cart and open checkout modal
    toggleCart();
    
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.add('active');
    
    // Update order summary
    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    orderItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <span>${item.name} (Size: ${item.size}) x${item.quantity}</span>
            <span>KShs ${(item.price * item.quantity).toLocaleString()}</span>
        `;
        
        orderItems.appendChild(orderItem);
        total += item.price * item.quantity;
    });
    
    orderTotal.textContent = total.toLocaleString();
}

// Close checkout modal
function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('active');
}

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Send order to Alex via WhatsApp
    sendOrderToWhatsApp(formData);
    
    // Show success message
    showNotification('Order placed successfully! Alex will contact you shortly to confirm your order.');
    
    // Clear cart and close modal
    cart = [];
    updateCartCount();
    closeCheckout();
    
    // Reset form
    this.reset();
    
    console.log('Order placed:', formData);
});

// Send order details to Alex via WhatsApp
function sendOrderToWhatsApp(orderData) {
    // Get admin contact info from localStorage or use default
    const adminContact = JSON.parse(localStorage.getItem('adminContact')) || {
        phone: '0768691361',
        email: 'alexwanjohi@gmail.com'
    };
    
    // Convert phone to international format (remove leading 0, add 254)
    const alexWhatsApp = adminContact.phone.replace(/^0/, '254');
    
    // Create order summary message
    let message = `🛍️ *NEW ORDER - LEXY SHOE PALACE*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${orderData.name}\n`;
    message += `Phone: ${orderData.phone}\n`;
    message += `Email: ${orderData.email}\n`;
    message += `Address: ${orderData.address}\n\n`;
    
    message += `👟 *Order Items:*\n`;
    orderData.items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Size: ${item.size}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: KShs ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    message += `💰 *Total Amount: KShs ${orderData.total.toLocaleString()}*\n\n`;
    message += `📅 Order Date: ${new Date().toLocaleDateString()}\n`;
    message += `⏰ Order Time: ${new Date().toLocaleTimeString()}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${alexWhatsApp}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 4000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    const checkoutModal = document.getElementById('checkoutModal');
    if (e.target === checkoutModal) {
        closeCheckout();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});