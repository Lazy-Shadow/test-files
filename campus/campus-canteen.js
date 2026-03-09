const products = [
    {
        id: 1,
        title: "Coffee Maker",
        price: "₱1,890.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/ffc107/ffffff?text=Coffee",
        seller: "Alex J. (Junior)",
        description: "Drip coffee maker with reusable filter. Makes 12 cups. Perfect for dorm rooms or study groups. Minor wear but works perfectly."
    },
    {
        id: 2,
        title: "Stainless Steel Bottle",
        price: "₱648.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/dc3545/ffffff?text=Bottle",
        seller: "Sarah M. (Senior)",
        description: "24 oz stainless steel water bottle with double wall insulation. Keeps drinks cold for 24 hours or hot for 12 hours. BPA free."
    },
    {
        id: 3,
        title: "Insulated Lunch Box",
        price: "₱972.00",
        condition: "Used - Excellent",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/28a745/ffffff?text=Lunch",
        seller: "Mike T. (Grad Student)",
        description: "Insulated lunch box with two compartments. Keeps food cold for up to 6 hours. Perfect for bringing meals to campus."
    },
    {
        id: 4,
        title: "Snack Storage Containers",
        price: "₱810.00",
        condition: "Used - Good",
        conditionClass: "bg-warning",
        image: "https://via.placeholder.com/250/17a2b8/ffffff?text=Snacks",
        seller: "Emily R. (Freshman)",
        description: "Set of 5 stackable snack containers. BPA free, dishwasher safe. Great for storing cookies, nuts, or fruit for campus snacks."
    },
    {
        id: 5,
        title: "Travel Coffee Mug",
        price: "₱540.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/6f42c1/ffffff?text=Mug",
        seller: "Chris L. (Sophomore)",
        description: "16 oz travel mug with leak-proof lid. Double wall insulation keeps drinks hot for 6 hours. Fits most car cup holders."
    },
    {
        id: 6,
        title: "Thermos Flask",
        price: "₱1,080.00",
        condition: "Used - Like New",
        conditionClass: "bg-success",
        image: "https://via.placeholder.com/250/e83e8c/ffffff?text=Thermos",
        seller: "Jessica W. (Senior)",
        description: "Stainless steel thermos flask that keeps drinks hot or cold for 24 hours. Perfect for campus commutes or study sessions."
    },
    {
        id: 7,
        title: "Personal Blender",
        price: "₱1,350.00",
        condition: "Used - Fair",
        conditionClass: "bg-danger",
        image: "https://via.placeholder.com/250/dc3545/ffffff?text=Blender",
        seller: "David K. (Junior)",
        description: "Personal blender with 16 oz travel bottle. Great for making smoothies or protein shakes. Some wear but works well."
    },
    {
        id: 8,
        title: "Reusable Utensil Set",
        price: "₱432.00",
        condition: "New",
        conditionClass: "bg-info",
        image: "https://via.placeholder.com/250/ffc107/ffffff?text=Utensils",
        seller: "Lisa M. (Sophomore)",
        description: "5-piece reusable utensil set with travel case. Includes fork, knife, spoon, chopsticks, and straw. BPA free."
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