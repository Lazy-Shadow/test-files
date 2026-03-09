const products = [
    {
        id: 1,
        title: "Organic Chemistry Textbook",
        price: "₱1,350.00",
        condition: "Used - Like New",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/28a745/ffffff?text=Textbook",
        seller: "Alex J. (Junior)",
        description: "Hardcover organic chemistry textbook, 3rd edition. Minor highlighting on a few pages, but overall excellent condition. Great for CHM101 students."
    },
    {
        id: 2,
        title: "Mountain Bike",
        price: "₱8,100.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/ffc107/ffffff?text=Bike",
        seller: "Sarah M. (Senior)",
        description: "26-inch mountain bike with front suspension. Recently tuned up, new brake pads. Perfect for commuting around campus."
    },
    {
        id: 3,
        title: "MacBook Pro 13\"",
        price: "₱43,200.00",
        condition: "Used - Fair",
        conditionClass: "bg-danger",
        image: "https://via.placeholder.com/250/dc3545/ffffff?text=Laptop",
        seller: "Mike T. (Grad Student)",
        description: "MacBook Pro 2020, M1 chip, 8GB RAM, 256GB SSD. Battery health 85%. Comes with charger. Small scratch on lid."
    },
    {
        id: 4,
        title: "Graphing Calculator",
        price: "₱4,590.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/17a2b8/ffffff?text=Calculator",
        seller: "Emily R. (Freshman)",
        description: "Brand new in box TI-84 Plus CE. Never opened. Required for MATH101 but dropped the class. Receipt available."
    },
    {
        id: 5,
        title: "Dorm Mini Fridge",
        price: "₱3,240.00",
        condition: "Used - Excellent",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/6f42c1/ffffff?text=Dorm",
        seller: "Chris L. (Sophomore)",
        description: "Compact 3.2 cu ft refrigerator. Cleaned and sanitized. Perfect for dorm rooms. Energy star rated."
    },
    {
        id: 6,
        title: "Wireless Printer",
        price: "₱2,430.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/e83e8c/ffffff?text=Printer",
        seller: "Jessica W. (Senior)",
        description: "HP DeskJet wireless printer. Works perfectly, ink recently replaced. Supports WiFi and USB printing."
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