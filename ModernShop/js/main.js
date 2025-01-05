// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cart Management
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({...product, quantity: 1});
        }

        this.saveCart();
        this.updateCartCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.saveCart();
        this.updateCartCount();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Initialize cart
const cart = new Cart();

// Product display functions
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => {
        cart.addItem(product);
        showNotification('Product added to cart!');
    });

    return card;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Load featured products
async function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    try {
        // In a real application, this would be an API call
        const products = [
            {
                id: 1,
                name: "Wireless Headphones",
                price: 99.99,
                description: "High-quality wireless headphones with noise cancellation",
                image: "/api/placeholder/300/300"
            },
            {
                id: 2,
                name: "Smart Watch",
                price: 199.99,
                description: "Feature-rich smartwatch with health tracking",
                image: "/api/placeholder/300/300"
            },
            {
                id: 3,
                name: "Laptop Bag",
                price: 49.99,
                description: "Stylish and durable laptop bag",
                image: "/api/placeholder/300/300"
            }
        ];

        products.forEach(product => {
            featuredContainer.appendChild(createProductCard(product));
        });
    } catch (error) {
        console.error('Error loading featured products:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
});