const products = [
    {
        id: 1,
        title: "MacBook Pro 13\"",
        price: "₱43,200.00",
        condition: "Used - Fair",
        conditionClass: "bg-danger",
        image: "https://via.placeholder.com/250/dc3545/ffffff?text=Laptop",
        seller: "Alex J. (Junior)",
        description: "MacBook Pro 2020, M1 chip, 8GB RAM, 256GB SSD. Battery health 85%. Comes with charger. Small scratch on lid."
    },
    {
        id: 2,
        title: "Wireless Mouse",
        price: "₱1,350.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/17a2b8/ffffff?text=Mouse",
        seller: "Sarah M. (Senior)",
        description: "Wireless ergonomic mouse with 1600 DPI. 5 customizable buttons. Works with Windows and macOS. Requires 2 AA batteries (included)."
    },
    {
        id: 3,
        title: "Mechanical Keyboard",
        price: "₱3,240.00",
        condition: "Used - Excellent",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/28a745/ffffff?text=Keyboard",
        seller: "Mike T. (Grad Student)",
        description: "Mechanical keyboard with Cherry MX Brown switches. RGB backlighting. USB wired. Perfect for typing and gaming."
    },
    {
        id: 4,
        title: "32GB USB Drive",
        price: "₱810.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/ffc107/ffffff?text=USB",
        seller: "Emily R. (Freshman)",
        description: "32GB USB 3.0 flash drive. Read speed up to 100MB/s. Durable metal casing. Great for storing and transferring files."
    },
    {
        id: 5,
        title: "Wireless Headphones",
        price: "₱4,050.00",
        condition: "Used - Like New",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/6f42c1/ffffff?text=Headphones",
        seller: "Chris L. (Sophomore)",
        description: "Wireless over-ear headphones with 40-hour battery life. Active noise cancellation. Bluetooth 5.0. Includes carrying case."
    },
    {
        id: 6,
        title: "HDMI Cable 6ft",
        price: "₱648.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/e83e8c/ffffff?text=HDMI",
        seller: "Jessica W. (Senior)",
        description: "6ft HDMI 2.0 cable. Supports 4K@60Hz. Compatible with TVs, monitors, laptops, and gaming consoles. Gold-plated connectors."
    },
    {
        id: 7,
        title: "HD Webcam",
        price: "₱2,430.00",
        condition: "Used - Fair",
        conditionClass: "bg-danger",
        image: "https://via.placeholder.com/250/dc3545/ffffff?text=Webcam",
        seller: "David K. (Junior)",
        description: "1080p HD webcam with built-in microphone. Auto-focus. Plug-and-play. Great for online classes and video calls."
    },
    {
        id: 8,
        title: "Laptop Charger",
        price: "₱1,620.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/ffc107/ffffff?text=Charger",
        seller: "Lisa M. (Sophomore)",
        description: "65W laptop charger. Compatible with most Dell, HP, and Lenovo laptops. Includes AC power cord. Tested and working."
    }
];

let currentProduct = null;

document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        currentProduct = products[index];
        showProductModal(currentProduct);
    });
});

function showProductModal(product) {
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductTitle').textContent = product.title;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalProductSeller').textContent = product.seller;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('cartPrice').textContent = '- ' + product.price;
    document.getElementById('buyPrice').textContent = '- ' + product.price;
    
    const conditionBadge = document.getElementById('modalProductCondition');
    conditionBadge.textContent = product.condition;
    conditionBadge.className = 'badge mb-2 ' + product.conditionClass + ' bg-opacity-10 text-' + product.conditionClass.replace('bg-', '');
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

function resetReviewForm() {
    selectedRating = 0;
    updateStars(0);
    document.querySelector('.rating-text').textContent = 'Click to rate';
}

let selectedRating = 0;

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-rating');
        updateStars(selectedRating);
    });
    
    star.addEventListener('mouseenter', function() {
        const rating = this.getAttribute('data-rating');
        updateStars(rating);
    });
});

document.querySelector('.star-rating').addEventListener('mouseleave', function() {
    updateStars(selectedRating);
});

function updateStars(rating) {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.style.color = '#ffc107';
        } else {
            star.classList.remove('active');
            star.style.color = '#dee2e6';
        }
    });
    const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    document.querySelector('.rating-text').textContent = ratingTexts[rating] || 'Click to rate';
}

function openMyOrdersModal() {
    const modal = new bootstrap.Modal(document.getElementById('myOrdersModal'));
    modal.show();
}

function showReceivedModalForOrder(title, price, image) {
    document.getElementById('receivedProductImage').src = image;
    document.getElementById('receivedProductTitle').textContent = title;
    document.getElementById('receivedProductPrice').textContent = price;
    resetReceivedReview();
    
    // Hide the orders modal first to ensure rating modal appears on top
    const ordersModal = bootstrap.Modal.getInstance(document.getElementById('myOrdersModal'));
    if (ordersModal) {
        ordersModal.hide();
    }
    
    // Show the rating modal after a short delay to ensure proper stacking
    setTimeout(() => {
        const modal = new bootstrap.Modal(document.getElementById('receivedModal'));
        modal.show();
    }, 300);
}

function showReceivedModal() {
    if (currentProduct) {
        document.getElementById('receivedProductImage').src = currentProduct.image;
        document.getElementById('receivedProductTitle').textContent = currentProduct.title;
        document.getElementById('receivedProductPrice').textContent = currentProduct.price;
    } else {
        document.getElementById('receivedProductImage').src = "https://via.placeholder.com/250/28a745/ffffff?text=Product";
        document.getElementById('receivedProductTitle').textContent = "Organic Chemistry Textbook";
        document.getElementById('receivedProductPrice').textContent = "₱1,350.00";
    }
    resetReceivedReview();
    const modal = new bootstrap.Modal(document.getElementById('receivedModal'));
    modal.show();
}

function previewReceivedImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('receivedPreviewImage');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function submitReceivedReview() {
    const feedback = document.getElementById('receivedFeedback').value;
    const reviewImage = document.getElementById('receivedPreviewImage');
    
    if (selectedRating === 0) {
        alert('Please select a star rating!');
        return;
    }
    if (!feedback.trim()) {
        alert('Please write your feedback!');
        return;
    }
    
    alert('Thank you for your review!\nRating: ' + selectedRating + ' star(s)\nFeedback: ' + feedback);
    const modal = bootstrap.Modal.getInstance(document.getElementById('receivedModal'));
    modal.hide();
}

function resetReceivedReview() {
    selectedRating = 0;
    updateStars(0);
    document.getElementById('receivedFeedback').value = '';
    document.getElementById('receivedPreviewImage').style.display = 'none';
    document.getElementById('receivedPreviewImage').src = '';
    document.getElementById('receivedReviewImage').value = '';
    document.querySelector('.rating-text').textContent = 'Click to rate';
}

function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    chatPopup.classList.toggle('show');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        const sentMessage = document.createElement('div');
        sentMessage.className = 'message sent';
        sentMessage.innerHTML = '<div class="message-content">' + message + '</div>';
        chatMessages.appendChild(sentMessage);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            const reply = document.createElement('div');
            reply.className = 'message received';
            reply.innerHTML = '<div class="message-content">Thanks for your message! Yes, the item is still available. Would you like to meet at the library for pickup?</div>';
            chatMessages.appendChild(reply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function addToCart() {
    alert('Item added to cart!');
}

function buyNow() {
    alert('Proceeding to checkout!');
}