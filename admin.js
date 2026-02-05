// Admin configuration - Load from localStorage or use default
let ADMIN_PASSWORD = localStorage.getItem('adminPassword') || 'admin123';
let ADMIN_CONTACT = JSON.parse(localStorage.getItem('adminContact')) || {
    phone: '0768691361',
    email: 'alexwanjohi@gmail.com'
};

let isLoggedIn = false;
let editingProductId = null;

// Load products from localStorage or use default products
let adminProducts = JSON.parse(localStorage.getItem('lexyShoeProducts')) || [
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

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin.js loaded successfully'); // Debug log
    checkLoginStatus();
});

// Test function to verify JavaScript is working
function testJS() {
    alert('JavaScript is working!');
}

// Login function
function login(event) {
    event.preventDefault();
    console.log('Login function called');
    
    const passwordInput = document.getElementById('adminPassword');
    if (!passwordInput) {
        console.error('Password input not found');
        alert('Error: Password input not found');
        return;
    }
    
    const password = passwordInput.value;
    console.log('Entered password:', password);
    console.log('Expected password:', ADMIN_PASSWORD);
    
    if (password === ADMIN_PASSWORD) {
        console.log('Password correct, logging in...');
        isLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        loadAdminProducts();
    } else {
        console.log('Password incorrect');
        alert('Incorrect password! Please try again.');
    }
}

// Check login status
function checkLoginStatus() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isLoggedIn = true;
        showAdminPanel();
        loadAdminProducts();
    }
}

// Show admin panel
function showAdminPanel() {
    console.log('Showing admin panel...');
    
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('adminPanel');
    
    if (!loginForm) {
        console.error('Login form element not found');
        return;
    }
    
    if (!adminPanel) {
        console.error('Admin panel element not found');
        return;
    }
    
    loginForm.classList.add('hidden');
    adminPanel.classList.remove('hidden');
    console.log('Admin panel displayed successfully');
}

// Logout function
function logout() {
    isLoggedIn = false;
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('adminPassword').value = '';
}

// Switch tabs
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    if (tabName === 'products') {
        loadAdminProducts();
    } else if (tabName === 'settings') {
        loadSettings();
    }
}

// Save products to localStorage and update main website
function saveProducts() {
    localStorage.setItem('lexyShoeProducts', JSON.stringify(adminProducts));
    
    // Update the main website's products array
    updateMainWebsiteProducts();
}

// Update main website products (this will be called from the main site)
function updateMainWebsiteProducts() {
    // This function will be called by the main website to get updated products
    return adminProducts;
}

// Load and display products in admin panel
function loadAdminProducts() {
    const grid = document.getElementById('adminProductsGrid');
    grid.innerHTML = '';
    
    adminProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'admin-product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="admin-product-image" onerror="this.src='https://via.placeholder.com/300x150?text=No+Image'">
            <h4>${product.name}</h4>
            <p><strong>Price:</strong> KShs ${product.price.toLocaleString()}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Sizes:</strong> ${product.sizes.join(', ')}</p>
            <div class="admin-product-actions">
                <button class="btn btn-secondary" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        grid.appendChild(productCard);
    });
}

// Add new product
function addProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const sizesText = document.getElementById('productSizes').value;
    const sizes = sizesText.split(',').map(size => parseInt(size.trim())).filter(size => !isNaN(size));
    
    // Generate new ID
    const newId = Math.max(...adminProducts.map(p => p.id)) + 1;
    
    const newProduct = {
        id: newId,
        name: name,
        price: price,
        category: category,
        image: image,
        sizes: sizes
    };
    
    adminProducts.push(newProduct);
    saveProducts();
    
    // Clear form
    event.target.reset();
    
    // Switch to products tab and reload
    switchTabProgrammatically('products');
    loadAdminProducts();
    
    alert('Product added successfully!');
}

// Edit product
function editProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (!product) return;
    
    editingProductId = productId;
    
    // Fill edit form
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductSizes').value = product.sizes.join(', ');
    
    // Show edit modal
    document.getElementById('editModal').classList.add('active');
}

// Update product
function updateProduct(event) {
    event.preventDefault();
    
    const productId = parseInt(document.getElementById('editProductId').value);
    const productIndex = adminProducts.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return;
    
    const name = document.getElementById('editProductName').value;
    const price = parseInt(document.getElementById('editProductPrice').value);
    const category = document.getElementById('editProductCategory').value;
    const image = document.getElementById('editProductImage').value;
    const sizesText = document.getElementById('editProductSizes').value;
    const sizes = sizesText.split(',').map(size => parseInt(size.trim())).filter(size => !isNaN(size));
    
    // Update product
    adminProducts[productIndex] = {
        id: productId,
        name: name,
        price: price,
        category: category,
        image: image,
        sizes: sizes
    };
    
    saveProducts();
    closeEditModal();
    loadAdminProducts();
    
    alert('Product updated successfully!');
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        adminProducts = adminProducts.filter(p => p.id !== productId);
        saveProducts();
        loadAdminProducts();
        alert('Product deleted successfully!');
    }
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    editingProductId = null;
}

// Switch tab programmatically
function switchTabProgrammatically(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const editModal = document.getElementById('editModal');
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Export products for main website
window.getAdminProducts = function() {
    return JSON.parse(localStorage.getItem('lexyShoeProducts')) || adminProducts;
};

// Load settings
function loadSettings() {
    // Update contact information in form
    document.getElementById('adminPhone').value = ADMIN_CONTACT.phone;
    document.getElementById('adminEmail').value = ADMIN_CONTACT.email;
    
    // Update statistics
    document.getElementById('totalProducts').textContent = adminProducts.length;
}

// Change password function
function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Verify current password
    if (currentPassword !== ADMIN_PASSWORD) {
        alert('Current password is incorrect!');
        return;
    }
    
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    // Check password strength
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Update password
    ADMIN_PASSWORD = newPassword;
    localStorage.setItem('adminPassword', ADMIN_PASSWORD);
    
    // Clear form
    event.target.reset();
    
    alert('Password changed successfully!');
}

// Update contact information
function updateContact(event) {
    event.preventDefault();
    
    const phone = document.getElementById('adminPhone').value;
    const email = document.getElementById('adminEmail').value;
    
    // Update contact info
    ADMIN_CONTACT = { phone, email };
    localStorage.setItem('adminContact', JSON.stringify(ADMIN_CONTACT));
    
    alert('Contact information updated successfully!');
}

// Update WhatsApp function to use stored contact info
function sendOrderToWhatsApp(orderData) {
    // Use stored phone number or fallback to default
    const adminPhone = ADMIN_CONTACT.phone.replace(/^0/, '254'); // Convert to international format
    
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
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
}

// Export contact info for main website
window.getAdminContact = function() {
    return JSON.parse(localStorage.getItem('adminContact')) || {
        phone: '0768691361',
        email: 'alexwanjohi@gmail.com'
    };
};